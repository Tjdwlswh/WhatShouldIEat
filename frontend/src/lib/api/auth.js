import client from './client';

export const login = ({ email, password}) =>
    client.post('/api/auth/login', {email,password})

export const register = ({email, password, nickname, birthDate, gender}) =>
    client.post('/api/auth/register', {email, password,nickname, birthDate, gender});

export const check = () => client.get('/api/auth/check')

export const logout = () => client.post('/api/auth/logout')
