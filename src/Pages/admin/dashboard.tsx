import { Card, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import 'chart.js/auto';
import LoggedInLayout from 'Components/AuthLayout/loggedIn'
import { Pie, Doughnut, PolarArea } from 'react-chartjs-2';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useEffect, useState } from 'react';
import { getAllPosts, getAllUsers, getCommentsCount, getUsersCount, getpostsCount } from 'Services/admin/dashboard';

const useStyles = makeStyles(() => ({
  ChartsWrapper: {
    alignItems: 'center', display: 'flex', gap: 5, paddingLeft: 30, ['@media (max-width: 850px)']: {
      padding: 0,
    },
  },
  ChartsInnerWrapper: {
    display: 'grid', gap: 2, padding: 20, ['@media (max-width: 850px)']: {
      padding: 0,
   
    },
  },
  ChartsInnerElementOne: {
    display: 'flex', gap: 10, padding: '5px 20px', width: '100%', ['@media (max-width: 850px)']: {
      display: 'flex',
      padding: 0,
      flexDirection: 'column',
    },
  },
  ChartsInnerElementTwo: {
    width: "100%", padding: '5px 20px', gap: 15, ['@media (max-width: 850px)']: {
      display: 'flex',
      padding: 0,
      flexDirection: 'column',
    },
  },
  innerCard: {
    width: '100%', textAlign: 'center', padding: 20, ['@media (max-width: 850px)']: {
    },
  },
  smallCardTitle: { fontWeight: 'bold', fontSize: 18 },
  cardTotalNumber: { fontSize: 40, fontWeight: 'bold' },
  elementTwoCardsWrapper: {
    display: 'flex', justifyContent: 'space-around', gap: 10, ['@media (max-width: 850px)']: {
      display: 'grid',
    },
  },
  pieChartIcon: { fontSize: 30 }
}));

export type Comment = {
  id: number;
  comment: string;
  userId: number;
  postId: number;
}

export type Post = {
  comments: Comment[];
  id: any;
  isPublic: number;
  userId: number;
  title: string;
  description: boolean;
}

export type User = {
  posts: Post[];
  idusers: number;
  name: string;
  email: string;
  is_verified: boolean;
  login_disabled: boolean;
}
const AdminDashboard = () => {
  const classes = useStyles();
  const [usersCount, setUsersCount] = useState<number>(0)
  const [postsCount, setPostsCount] = useState<number>(0)
  const [commentsCount, setCommentsCount] = useState<number>(0)
  const [users, setUsers] = useState<User[]>([])
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
   const fetchData = async() => {
    const response = await Promise.all([getUsersCount(), getpostsCount(), getCommentsCount(), getAllUsers(), getAllPosts()])
    const [ usersCountResponse, postsCountResponse, commentsCountResponse, usersResponse, postsResponse ] = response
    if(usersCountResponse){
      setUsersCount(usersCountResponse.data.count)
    }
    if(postsCountResponse){
      setPostsCount(postsCountResponse.data.count)
    }
    if(commentsCountResponse){
      setCommentsCount(commentsCountResponse.data.count)
    }
    if(usersResponse){
      setUsers(usersResponse.data)
    }
    if(postsResponse){
      setPosts(postsResponse.data)
    }
   }
   fetchData()
  }, [])
  const unverifiedUsersCount = users.filter((user: { is_verified: boolean; }) => user.is_verified === false).length;
  const verifiedUsersCount = users.length - unverifiedUsersCount;

  // Process data for chart 2
  const usersWithPostCount = users.map((user) => ({ name: user.name, postCount: user.posts.length }));

  const userPostData = {
    labels: usersWithPostCount.map((user: { name: any; }) => user.name),
    datasets: [
      {
        label: 'Number of Posts',
        data: usersWithPostCount.map((user: { postCount: any; }) => user.postCount),
        backgroundColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const userVerificationData = {
    labels: ['Verified', 'Unverified'],
    datasets: [
      {
        label: 'Number of Users',
        data: [verifiedUsersCount, unverifiedUsersCount],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const postsWithComments = posts.reduce((count: number, post) => {
    if (post.comments && post.comments.length > 0) {
      return count + 1;
    }
    return count;
  }, 0);

  const postsWithoutComments = posts.length - postsWithComments;

  const postsData = {
    labels: ['With Comments', 'Without Comments'],
    datasets: [
      {
        label: 'Number of posts',
        data: [postsWithComments, postsWithoutComments],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const postsHasComments = posts.filter((post) => post.comments && post.comments.length > 0);

  const data = {
    labels: postsHasComments.map((post: { title: any; }) => post.title),
    datasets: [
      {
        label: 'Number of Comments',
        data: postsHasComments.length > 0 && postsHasComments.map((post) => post.comments.length),
        backgroundColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <LoggedInLayout role={'admin'}>
      <Grid className={classes.ChartsWrapper}><PieChartIcon className={classes.pieChartIcon} /> <Typography fontSize={28}>Management Dashboard</Typography></Grid>
      <Grid className={classes.ChartsInnerWrapper}>
        <Grid className={classes.ChartsInnerElementOne}>
          <Card className={classes.innerCard}>
            <Typography fontWeight={'bold'} className={classes.smallCardTitle}>Total number of users</Typography>
            <Typography fontWeight={'bold'} fontSize={50} className={classes.cardTotalNumber}>{usersCount}</Typography>
          </Card>
          <Card className={classes.innerCard}>
            <Typography fontWeight={'bold'} className={classes.smallCardTitle}>Total number of posts</Typography>
            <Typography fontWeight={'bold'} fontSize={50} className={classes.cardTotalNumber}>{postsCount}</Typography>

          </Card>
          <Card className={classes.innerCard}>
            <Typography fontWeight={'bold'} className={classes.smallCardTitle}>Total number of comments</Typography>
            <Typography fontWeight={'bold'} fontSize={50} className={classes.cardTotalNumber}>{commentsCount}</Typography>
          </Card>
        </Grid>
        <Grid className={classes.ChartsInnerElementTwo}>
          <Grid className={classes.elementTwoCardsWrapper}>
            <Card className={classes.innerCard}>
              <Typography fontWeight={'bold'}>Users by Verification Status</Typography>
              <Pie data={userVerificationData} />
            </Card>
            <Card className={classes.innerCard}>
              <Typography fontWeight={'bold'}>Number of Posts per User</Typography>
              <PolarArea data={userPostData} />
            </Card>
          </Grid>
        </Grid>
        <Grid className={classes.ChartsInnerElementTwo}>
          <Grid className={classes.elementTwoCardsWrapper}>
            <Card className={classes.innerCard}>
              <Typography fontWeight={'bold'}>Number Of Posts</Typography>
              <Doughnut data={postsData} />
            </Card>

            <Card className={classes.innerCard}>
              <Typography fontWeight={'bold'}>Number Of Comments per post</Typography>
              <PolarArea data={data} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </LoggedInLayout>
  )
}

export default AdminDashboard