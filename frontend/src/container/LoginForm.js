// redux 와 components 연결
//로그인, 회원가입후 뒤로가기 했을때 input값 초기화
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../modules/auth';
import AuthForm from '../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';
// import { check } from '../modules/user';

const LoginForm = () => {
  console.log('process.env.REACT_APP_DEV_BACK_URL', process.env.REACT_APP_DEV_BACK_URL);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, auth, authError } = useSelector(state => ({
    form: state.auth.login,
    auth: state.auth.auth,
    authError: state.auth.authError,
  }));

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password } = form;
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login')); //아무것도 담겨있지 않은 login, 초기화
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setError('로그인 실패');
      console.log(authError);
      return;
    }
    if (auth) {
      console.log('로그인성공');
      navigate('/');
      // dispatch(check()); //쿠키로
    }
  }, [auth, authError, navigate]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    ></AuthForm>
  );
};

export default LoginForm;
