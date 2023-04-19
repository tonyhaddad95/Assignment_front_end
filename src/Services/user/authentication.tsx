import api from '../../util/api';

export const register = async (body: { email: string; password: string; role: string, name: string }) => {
  const { role, email, password, name } = body
  const bodyObj = { email, password, name }
  try {
    const response = await api.post(`/auth/${role}/register`, bodyObj); // use the api object to make the API call
    return response; // return the response from the API call
  } catch (error) {
    throw error; // rethrow the error to be caught by the calling function
  }
};
