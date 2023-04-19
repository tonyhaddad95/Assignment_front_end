import api from '../../util/api';

interface postBody {
  title: string;
  description: string; 
  userId: number; 
  isPublic: boolean;
}

interface commentBody {
  comment: string; 
  userId: number; 
  postId: number;
}
export const createPost = async (body: postBody) => {
  try {
    const response = await api.post(`/posts`, body); // use the api object to make the API call
    return response; // return the response from the API call
  } catch (error) {
    throw error; // rethrow the error to be caught by the calling function
  }
};

export const deletePost = async (postId: any) => {
  try {
    const response = await api.delete(`/posts/${postId}`); // use the api object to make the API call
    return response; // return the response from the API call
  } catch (error) {
    throw error; // rethrow the error to be caught by the calling function
  }
};

export const createComment = async (body: commentBody) => {
  try {
    const response = await api.post(`/comment`, body); // use the api object to make the API call
    return response; // return the response from the API call
  } catch (error) {
    throw error; // rethrow the error to be caught by the calling function
  }
};

export const deleteComment = async (commentId: any) => {
  try {
    const response = await api.delete(`/comment/${commentId}`); // use the api object to make the API call
    return response; // return the response from the API call
  } catch (error) {
    throw error; // rethrow the error to be caught by the calling function
  }
};

export const getAllPosts = async (page: number) => {
  try {
    const response = await api.get(`/posts?page=${page}&limit=4`)
    return response
  } catch (error){
    throw error;
  }
}
