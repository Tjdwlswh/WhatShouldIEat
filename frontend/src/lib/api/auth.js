import client from './client';
import { useNavigate}  from 'react-router-dom';
import React from 'react'



const JWT_EXPIRY_TIME = 24 * 3600 * 1000;
let refreshTimer = null;

export const Login = ({ email, password }) =>{

  const navigate = useNavigate();
  navigate('/')
  
  
  client.post('http://localhost:5000/auth/login', { email, password }).then(onLoginSuccess)
  .catch(error => {
    console.log(error)
  })

}

const refreshAccessToken = (refreshToken) => {
  client
    .post('http://localhost:5000/auth/refresh', { refreshToken })
    .then((response) => {
      const { accessToken } = response.data;
      client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // 새로 발급받은 액세스 토큰의 만료 시간까지 남은 시간에 따라 리프레시 타이머 설정
      const expiresIn = JWT_EXPIRY_TIME - 60000;
      setRefreshTimer(expiresIn);
    })
    .catch((error) => {
      console.log(error);
      // 에러 처리 (예: 로그아웃 등)
    });
};


const setRefreshTimer = (expiresIn) => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    refreshAccessToken(refreshToken);
  }, expiresIn);
};

const onLoginSuccess = response => {


  // const { accessToken, refreshToken } = response.data;

  // client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

  // // 액세스 토큰을 Local Storage에 저장
  // localStorage.setItem('accessToken', accessToken);

  // // 리프레시 토큰을 Local Storage에 저장
  // localStorage.setItem('refreshToken', refreshToken);

  // // 액세스 토큰의 만료 시간까지 남은 시간에 따라 리프레시 타이머 설정
  // const expiresIn = JWT_EXPIRY_TIME - 60000;
  // setRefreshTimer(expiresIn);

}

export const register = ({ email, password, nickName }) =>
  client.post('http://localhost:5000/auth/register', { email, password, nickName });

// export const check = () => client.get('http://localhost:5000/auth/check');

export const logout = () => {client.post('http://localhost:5000/auth/logout')
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');

// 리프레시 타이머 초기화
clearTimeout(refreshTimer);
}
