import React, { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, renew } from '../modules/auth';
import { useState } from 'react';
import AuthForm from '../components/auth/AuthForm';
import { useEffect } from 'react';
import { getUser } from '../modules/user';

const AccountContainer = () => {
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(state => ({
    form: state.auth.renew,
    auth: state.auth.auth,
    authError: state.auth.authError,
  }));
  const email = useSelector(state => state.user.user?.email);
  const nickName = useSelector(state => state.user.user?.nickName);
  const provider = useSelector(state => state.user.user?.provider);
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    dispatch(initializeForm('renew'));
  }, [dispatch]);

  useEffect(() => {
    dispatch(changeField({ form: 'renew', key: 'email', value: email }));
    dispatch(changeField({ form: 'renew', key: 'nickName', value: nickName }));
    dispatch(changeField({ form: 'renew', key: 'provider', value: provider }));
  }, [dispatch, email, nickName, provider]);

  useEffect(() => {
    if (authError) {
      if (authError.response.status === 409) {
        setError('이미 존재하는 닉네임입니다.');
        return;
      }
      console.log('authError', authError);
      setError('정보 수정 실패');
      return;
    }
    if (auth) {
      // dispatch(changeField({ form: 'renew', key: 'message', value: auth.message }));
      dispatch(getUser(token));
    }
  }, [auth, authError, dispatch, token]);

  const onChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'renew', key: name, value }));
    dispatch(changeField({ form: 'renew', key: 'message', value: null }));
  };

  const onSubmit = e => {
    e.preventDefault();
    const { password, passwordConfirm, nickName } = form;

    if (form.password.length < 6 && form.password !== '') {
      // 빈칸으로 보내면 업데이트 안함
      setError('비밀번호는 6글자 이상 설정하세요');
    } else {
      setError('');
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'renew', key: 'password', value: '' }));
      dispatch(changeField({ form: 'renew', key: 'passwordConfirm', value: '' }));
      return;
    }
    dispatch(renew({ password, nickName, image, token }));
  };

  const handleImageSelected = file => {
    setImage(file);
  };

  return (
    <AuthForm
      type="renew"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      onImageSelected={handleImageSelected}
    />
  );
};

export default AccountContainer;
