import axios from 'axios';

const client = axios.create({
  baseURL: `${process.env.REACT_APP_DEV_BACK_URL}/auth`,
  withCredentials: true,
});

const authAPI = {
  login: async ({ email, password }) => {
    return await client.post('/login', { email, password });
  },

  register: async ({ email, password, nickName }) => {
    return await client.post('/register', { email, password, nickName });
  },

  getUser: async token => {
    console.log('getUser', token);
    return await client.get('/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  logout: async () => {
    return await client.post('/logout');
  },

  refresh: async () => {
    return await client.post('/refresh');
  },
};

export default authAPI;
