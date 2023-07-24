import client from './client';

export const login = ({ email, password }) =>
  client.post('http://localhost:5000/auth/google', { email, password });

export const register = ({ email, password, nickname }) =>
  client.post('/api/auth/register', { email, password, nickname });

export const check = () => client.get('/api/auth/check');

export const logout = () => client.post('/api/auth/logout');
