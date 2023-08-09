import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, renew } from '../modules/auth';
import AuthForm from '../components/auth/AuthForm';

const AccountContainer = () => {
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const form = useSelector(state => state.auth.renew);
  const { authError } = useSelector(state => state.auth);
  const { email, nickName, provider, profileImg } = useSelector(state => state.user.user) || {};

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
      if (authError.response?.status === 409) {
        setError('이미 존재하는 닉네임입니다.');
        return;
      }
      console.log('authError', authError);
      setError('정보 수정 실패');
      return;
    }
  }, [authError, dispatch, token]);

  const handleChange = e => {
    const { value, name } = e.target;
    dispatch(changeField({ form: 'renew', key: name, value }));
    dispatch(changeField({ form: 'renew', key: 'message', value: null }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { password, passwordConfirm, nickName } = form;

    if (password.length < 6 && password !== '') {
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
    setImage(null);
  };

  const handleImageSelected = file => {
    setImage(file);
  };

  return (
    <AuthForm
      type="renew"
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      error={error}
      onImageSelected={handleImageSelected}
      imgSrc={profileImg}
    />
  );
};

export default AccountContainer;
