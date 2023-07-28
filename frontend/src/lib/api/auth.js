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

  logout: async token => {
    return await client.get('/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  refresh: async () => {
    return await client.get('/refresh');
  },
};

export default authAPI;
