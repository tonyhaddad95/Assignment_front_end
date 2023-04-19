import { Avatar, Button, Card, CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import 'chart.js/auto';
import { useState, useEffect, ReactNode, useCallback, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from 'react'
import LoggedInLayout from 'Components/AuthLayout/loggedIn'
import Cookies from 'js-cookie';
import SimpleDialog from 'Components/Dialog/CommentDialog';
import { createComment, createPost, deleteComment, deletePost, getAllPosts } from 'Services/user/actions';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import LockIcon from '@mui/icons-material/Lock';
import CloseIcon from '@mui/icons-material/Close'
import ConfirmationDialog from 'Components/Dialog/ConfirmationDialog';
import { useLoading } from 'Components/Loading/Loading';

const useStyles = makeStyles(() => ({
  ChartsWrapper: { padding: '20px 0 20px 30px', width: '100%', display: 'grid', ['@media (max-width: 850px)']: {
    padding: 0,
}, },
  postInput: { width: '70%', padding: 10, borderRadius: 15, borderWidth: 1, cursor: 'pointer' },
  contentWrapper: {
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '99%',
    gap: 10
  },
  textArea: {
    width: '100%',
    margin: '10px auto',
    minHeight: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10
  },
  loadmoreComment: { cursor: 'pointer', textDecoration: 'underline' },
  postContent: { display: 'flex', flexDirection: 'column', gap: 15 },
  commentsWrapper: { display: 'grid', gap: 10, width: '100%', height: 130, overflowY: 'scroll' },
  commentDeleteIcon: { position: 'absolute', right: 5, top: 5, cursor: 'pointer' },
  commentElement: { backgroundColor: 'lightgray', padding: 5, position: 'relative' },
  postYouWrapper: { display: "flex", alignItems: 'center' },
  postUserName: { display: 'flex', alignItems: 'center' },
  postNbOfComments: { display: 'flex', alignItems: 'center', gap: 5 },
  postInner: { display: 'flex', flexDirection: 'column', gap: 25, width: '100%' },
  deleteIcon: { position: 'absolute', right: 15, top: 15, cursor: 'pointer' },
  postCard: { display: "flex", gap: 20, alignItems: 'center', padding: 20, justifyContent: 'flex-start', position: 'relative' },
  postsWrapper: { padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '99%', ['@media (max-width: 850px)']: {
    gridTemplateColumns: '1fr'
  }}
}));

interface PaginatedPosts {
  id?: any; title: string; description: string; isPublic: boolean; userId: number; userName: string; comments: any
}

interface PostData {
  subject: string;
  description: string;
}

interface UserData {
  name: string;
  id: string
}

const UserDashboard = () => {
  const classes = useStyles();
  const { setOpen } = useLoading();
  const [userName, setUserName] = useState<UserData>({
    name: '',
    id: '',
  })
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<boolean>(false);
  const [openDeleteCommentConfirmationDialog, setOpenDeleteCommentConfirmationDialog] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('public');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [comments, setComments] = useState<{ [key: number]: string }>({});
  const [paginatedPosts, setPaginatedPosts] = useState<PaginatedPosts[]>([]);
  const [postToDelete, setPostToDelete] = useState<any>('')
  const [commentToDelete, setCommentToDelete] = useState<any>('')
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostData>({
    subject: '',
    description: '',
  })

  const handleClickOpenConfirmationDialog = (postId: any) => {
    setPostToDelete(postId)
    setOpenConfirmationDialog(true);
  };

  const handleClickOpenDeleteCommentConfirmationDialog = (commentId: any) => {
    setCommentToDelete(commentId)
    setOpenDeleteCommentConfirmationDialog(true);
  };
  const handleConfirm = async () => {
    setOpen(true)
    await deletePost(postToDelete)
    const filteredPosts = paginatedPosts.filter((value) => value.id !== postToDelete)
    setPaginatedPosts(filteredPosts)
    setOpenConfirmationDialog(false);
    setOpen(false)
  }

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
  };

  const handleCloseDeleteCommentConfirmationDialog = () => {
    setOpenDeleteCommentConfirmationDialog(false);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleChange = (value: string) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    const name = Cookies.get('logged_in_user_name')
    const id = Cookies.get('logged_in_user_id')
    if (name && id) {
      setUserName({
        name,
        id
      })
    }
  }, [])

  const fetchPosts = useCallback(async() => {
    if (isLoading || !hasMore) {
      return;
    }
    setIsLoading(true);
    const { data } = await getAllPosts(currentPage);
    if (data) {
      setPaginatedPosts([...paginatedPosts, ...data.data]);
      // If there are fewer items than the limit, we've reached the end
      if (data.data.length < 4) {
        setHasMore(false);
      }
      // Otherwise, we can increment the current page for the next fetch
      setCurrentPage(currentPage + 1);
    }
    setIsLoading(false);
  }, [paginatedPosts, currentPage, hasMore, isLoading]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight
      ) {
        fetchPosts();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchPosts]);

  const handleConfirmDeleteComment = async () => {
    setOpen(true)
    await deleteComment(commentToDelete)
    const updatedPosts = paginatedPosts.map((post) => {
      return {
        ...post,
        comments: {
          data: post.comments.data.filter((comment: { id: any; }) => comment.id !== commentToDelete)
        }
      };
    });
    setPaginatedPosts(updatedPosts)
    setOpenDeleteCommentConfirmationDialog(false);
    setOpen(false)
  }

  const handleSendPost = async () => {
    setOpen(true)
    try {
      const body = {
        title: postData.subject,
        description: postData.description,
        isPublic: selectedValue === 'public',
        userId: parseInt(userName.id),
      };

      await createPost(body)
      setOpenDialog(false)
      const newPost = {
        title: postData.subject,
        description: postData.description,
        isPublic: selectedValue === 'public',
        userId: parseInt(userName.id),
        userName: userName.name,
        comments: []
      }
      const newPaginatedPosts = [...paginatedPosts, newPost];
      setPaginatedPosts(newPaginatedPosts);
      setPostData({
        subject: '',
        description: '',
      })
      setOpen(false)
    } catch (err) {
      console.log(err)
    }
  }
  const handleClearComment = () => {
    setComments([])
  }

  const handlePostComment = async (postId: number) => {
    const comment = comments[postId];
    const body = {
      comment,
      userId: parseInt(userName.id),
      postId
    }
    await createComment(body)
    const newComment = {
      text: comment,
      userId: parseInt(userName.id),
      userName: userName.name
    };
    const paginatedPostIndex = paginatedPosts.findIndex((post) => post.id === postId);
    const paginatedPost = paginatedPosts[paginatedPostIndex];
    const paginatedPostComments = paginatedPost.comments.data;
    const newPaginatedPostComments = [...paginatedPostComments, newComment];
    const newPaginatedPost = { ...paginatedPost, comments: { ...paginatedPost.comments, data: newPaginatedPostComments } };

    const newPaginatedPosts = [...paginatedPosts];
    newPaginatedPosts[paginatedPostIndex] = newPaginatedPost;
    setPaginatedPosts(newPaginatedPosts);
    handleClearComment();
    const element = document.getElementById(`comments-element-${postId}`);
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const postId = parseInt(e.target.name.split('-')[1]);
    const newComments = { ...comments };
    newComments[postId] = e.target.value;
    setComments(newComments);
  }

  const handleChangePotData = (e: any) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <LoggedInLayout role={'user'}>
        <Grid className={classes.ChartsWrapper}>
          <Typography fontSize={30} fontWeight={'bold'}>Hello {userName.name},</Typography>
          <Card className={classes.contentWrapper}>
            <Avatar src="/broken-image.jpg" />
            <input className={classes.postInput} placeholder={`What's on your mind, ${userName.name}?`} onClick={handleClickOpen} />
          </Card>
          <Typography marginTop={5} fontWeight={'bold'} fontSize={30}>All Feeds</Typography>
          <div className={classes.postsWrapper}>
            {paginatedPosts?.map((post: PaginatedPosts, key: number) => {
              const comment = comments[post.id] || '';
              if (post.isPublic || (parseInt(userName.id) === post.userId)) {
                return (
                  <Card className={classes.postCard} key={key}>
                    {(parseInt(userName.id) === post.userId) && <CloseIcon onClick={() => handleClickOpenConfirmationDialog(post.id)} className={classes.deleteIcon} />}
                    <div className={classes.postInner}>
                      <div className={classes.postUserName}>{post?.userName?.toUpperCase()}{(parseInt(userName.id) === post.userId) ? post.isPublic ? " (YOU)" : <Grid className={classes.postYouWrapper}>&nbsp;(YOU)<LockIcon /></Grid> : ""}</div>
                      <div><Avatar src="/broken-image.jpg" /></div>
                      <div className={classes.postContent}>
                        <h2>{post.title}</h2>
                        <div>{post.description}</div>
                      </div>
                      <Divider />
                      <Grid display={'flex'} flexDirection={'column'} gap={1}>
                        <Grid className={classes.postNbOfComments}><Typography>{post?.comments?.data?.length}</Typography> <ModeCommentIcon /></Grid>
                        <Grid>
                         <Grid id={`comments-element-${post.id}`} className={classes.commentsWrapper}>{post?.comments && post?.comments?.data?.map((comment: {
                            id: number;
                            userId: number;
                            userName: ReactNode; text: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined;
                          }) => {
                            return <Grid className={classes.commentElement} style={(parseInt(userName.id) === comment.userId) ? { borderRadius: 15, borderTopLeftRadius: 1, backgroundColor: 'lightgreen' } : { borderRadius: 15, borderTopRightRadius: 1, backgroundColor: 'lightgray' }}>
                              <Typography fontSize={12} fontWeight={'bold'}>{comment.userName}</Typography>
                              <Typography marginLeft={1} fontSize={12}>{comment.text}</Typography>
                              {(parseInt(userName.id) === comment.userId) && <Typography onClick={() => handleClickOpenDeleteCommentConfirmationDialog(comment.id)} className={classes.commentDeleteIcon}><CloseIcon fontSize='small' /></Typography>}
                            </Grid>
                          })}</Grid>
                        </Grid>
                        {false && <center className={classes.loadmoreComment}><Typography fontSize={12}>Load more</Typography></center>}
                      </Grid>
                      <textarea name={`comment-${post.id}`} value={comment} onChange={handleCommentChange} placeholder='Leave a comment here...' className={classes.textArea} rows={5} />
                      <Button variant="contained" onClick={() => handlePostComment(post.id)}>Send Comment</Button>
                    </div>
                  </Card>
                );
              }
            })}
          </div>
          {isLoading && <Grid textAlign={'center'} padding={5}><CircularProgress /></Grid>}
        </Grid>
        <ConfirmationDialog
          open={openConfirmationDialog}
          title="Are you sure?"
          message="Are you sure you want to delete this post?"
          handleClose={handleCloseConfirmationDialog}
          handleConfirm={handleConfirm}
        />
        <ConfirmationDialog
          open={openDeleteCommentConfirmationDialog}
          title="Are you sure?"
          message="Are you sure you want to delete this comment?"
          handleClose={handleCloseDeleteCommentConfirmationDialog}
          handleConfirm={handleConfirmDeleteComment}
        />
        <SimpleDialog
          open={openDialog}
          handleChange={handleChange}
          handleChangePotData={handleChangePotData}
          onCloseSubmit={handleSendPost}
          onClose={handleClose}
        />
      </LoggedInLayout>
    </div>
  )
}

export default UserDashboard