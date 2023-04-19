import axios from 'axios';
import { ADMIN_PATHS, API_RESPONSE_TYPE, INVALID_TOKEN, LOGIN_PATHS, USER_PATHS } from './constants';
import history from './history';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

api.interceptors.request.use(config => {
  const userToken = Cookies.get('user_token');
  const adminToken = Cookies.get('admin_token'); 
  if (userToken) {
    config.headers.Authorization = `Bearer ${userToken}`;
  } else if (adminToken) {
    config.headers.Authorization = `Bearer ${adminToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const dataErrorMsg = error.response.data.message
    const errorObject = {
      type: API_RESPONSE_TYPE.ERROR,
      status: error.response.status,
      statusText: error.response.statusText,
      message: error.response.data.message,
    }

    if (dataErrorMsg === INVALID_TOKEN) {
      const pathName = document.location.pathname
      const isUser = USER_PATHS.includes(pathName)
      const isAdmin = ADMIN_PATHS.includes(pathName)

      const {
        user: userAuthPath,
        admin: adminAuthPath,
      } = LOGIN_PATHS

      if (isUser) {
        history.push(userAuthPath)
        document.location.reload()
      } else if (isAdmin) {
        history.push(adminAuthPath)
        document.location.reload()
      }
      const cookies = Cookies.get();

      for (const cookieName in cookies) {
        Cookies.remove(cookieName);
      }
      errorObject.message = dataErrorMsg
    }

    return errorObject
  }
);

export default api;