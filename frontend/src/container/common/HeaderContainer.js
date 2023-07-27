import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout, getUser, setToken } from '../../modules/user';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';

const HeaderContainer = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.token);
  const { user } = useSelector(state => ({
    user: state.user.user,
  }));

  //user 에서 accessToken 을 가져오고

  const token = cookies.get('token');
  //cookies 에서 token을 받아오고

  useEffect(() => {
    if (token) dispatch(setToken(token));
    console.log('setToken', token);
  }, [dispatch, token]);

  useEffect(() => {
    if (accessToken) dispatch(getUser(accessToken));
    console.log('accessToken', accessToken);
  }, [accessToken, dispatch]);

  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
