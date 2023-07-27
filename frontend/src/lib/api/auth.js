import client from './client';

export const login = async ({ email, password }) => {
  return await client.post('http://localhost:5000/auth/login', { email, password });
};

// ### token 만료 에러시 시동하도록
const refreshAccessToken = refreshToken => {
  client
    .post('http://localhost:5000/auth/refresh', { refreshToken })
    .then(response => {
      // ###
      // const expiresIn = JWT_EXPIRY_TIME - 60000;
      // setRefreshTimer(expiresIn);
    })
    .catch(error => {
      console.log(error);
    });
};

export const register = async ({ email, password, nickName }) =>
  client.post('http://localhost:5000/auth/register', { email, password, nickName });

export const logout = async () => {
  client.post('http://localhost:5000/auth/logout');
};
