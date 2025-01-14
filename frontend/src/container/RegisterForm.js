//회원가입 구현, redux와 componets 연결, props로 정보 전달
//로그인, 회원가입후 뒤로가기 했을때 input값 초기화
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../modules/auth';
import AuthForm from '../components/auth/AuthForm';
// import { check } from '../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, auth, authError } = useSelector(state => ({
    form: state.auth.register,
    auth: state.auth.auth,
    authError: state.auth.authError,
  }));
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
    if (form.password.length < 6) {
      setError('비밀번호는 6글자 이상 설정하세요');
    } else {
      setError('');
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    const { email, password, passwordConfirm, nickName } = form;
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if ([email, password, passwordConfirm, nickName].includes('')) {
      setError('빈칸을 모두 입력하세요');
      return;
    }

    if (!email.match(emailRegex)) {
      setError('이메일 형식이 아닙니다');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
      dispatch(changeField({ form: 'register', key: 'nickName', value: '' }));
      return;
    }
    dispatch(register({ email, password, nickName }));
  };

  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }

      setError('회원가입 실패');
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      navigate('/');
      // dispatch(check());
    }
  }, [auth, authError, navigate]);

  // useEffect(() => {
  //   if (auth) {
  //     console.log('check API 성공');
  //     console.log(auth);
  //   }
  // }, [auth]);

  return (
    <AuthForm type="register" form={form} onChange={onChange} onSubmit={onSubmit} error={error} />
  );
};

export default RegisterForm;
