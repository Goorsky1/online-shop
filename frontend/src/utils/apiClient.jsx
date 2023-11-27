
import axios from 'axios';
import { getUserData } from './userSession'

const initApiClient = () => {
  axios.defaults.baseURL = 'http://localhost:3000';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  const user = getUserData()
  if (user) {
    axios.defaults.headers.common['Authorization'] = user.token;
  }
  return axios.create()
};

export default initApiClient;