import api from "util/api";

export const getAllUsers = async () => {
    try {
      const response = await api.get(`/users`)
      return response
    } catch (error){
      throw error;
    }
  }

export const getUsersCount = async () => {
    try {
      const response = await api.get(`/users/count`)
      return response
    } catch (error){
      throw error;
    }
  }

  export const getpostsCount = async () => {
    try {
      const response = await api.get(`/posts/count`)
      return response
    } catch (error){
      throw error;
    }
  }

  export const getCommentsCount = async () => {
    try {
      const response = await api.get(`/comment/count`)
      return response
    } catch (error){
      throw error;
    }
  }

  export const updateUserLoginStatus = async (userId: number, value: boolean) => {
    try {
      const response = await api.post(`/users/${userId}/login-status`, {
        login_disabled: value
      }); // use the api object to make the API call
      return response; // return the response from the API call
    } catch (error) {
      throw error; // rethrow the error to be caught by the calling function
    }
  };

  export const getAllPosts = async () => {
    try {
      const response = await api.get(`/posts/all`)
      return response
    } catch (error){
      throw error;
    }
  }