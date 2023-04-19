import api from '../../../util/api';

interface LoginApi {
  email: string;
  password: string;
  role: string
}
export const login = async (body: LoginApi) => {
  const { role, email, password } = body
  const bodyObj = { email, password}
  try {
    const response = await api.post(`/auth/${role}/login`, bodyObj); // use the api object to make the API call
    return response; // return the response from the API call
  } catch (error) {
    throw error; // rethrow the error to be caught by the calling function
  }
};
