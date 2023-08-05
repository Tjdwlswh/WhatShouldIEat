import createFormData from '../utils/createFormData';
import client from './client';

const authAPI = {
  login: async ({ email, password }) => {
    return await client.post('/auth/login', { email, password });
  },

  register: async ({ email, password, nickName }) => {
    return await client.post('/auth/register', { email, password, nickName });
  },

  renew: async ({ password, nickName, image, token }) => {
    const formData = createFormData({ password, nickName, image });
    return await client.put('/auth/user', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUser: async token => {
    return await client.get('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  getUserCard: async token => {
    return await client.get('/auth/usercard', {
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

  leave: async token => {
    return await client.delete('/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default authAPI;
