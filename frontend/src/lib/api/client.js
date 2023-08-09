import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACK_URL}`,
  withCredentials: true,
});

export default client;
