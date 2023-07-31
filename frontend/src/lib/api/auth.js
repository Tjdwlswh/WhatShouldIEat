import client from './client';

const authAPI = {
  login: async ({ email, password }) => {
    return await client.post('/auth/login', { email, password });
  },

  register: async ({ email, password, nickName }) => {
    return await client.post('/auth/register', { email, password, nickName });
  },

  getUser: async token => {
    return await client.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  logout: async token => {
    return await client.get('/auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  refresh: async () => {
    return await client.get('/auth/refresh');
  },
};

export default authAPI;
