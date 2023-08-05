import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../modules/auth';
import AuthForm from '../components/auth/AuthForm';
import { useNavigate, useSearchParams } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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
    if ([email, password].includes('')) {
      setError('빈칸을 모두 입력하세요');
      return;
    }
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    dispatch(initializeForm('login')); //아무것도 담겨있지 않은 login, 초기화
  }, [dispatch]);

  useEffect(() => {
    if (searchParams.get('status')) {
      setError('탈퇴한 계정입니다.');
    }
  }, [searchParams]);
  useEffect(() => {
    if (authError) {
      setError(authError.response.data.error);
      return;
    }
    if (auth) {
      console.log(auth.message);
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
