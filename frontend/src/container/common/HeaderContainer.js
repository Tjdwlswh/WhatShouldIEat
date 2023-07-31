import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout, getUser, setToken } from '../../modules/user';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';

const HeaderContainer = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.user.token);

  const token = cookies.get('token');

  useEffect(() => {
    if (token) dispatch(setToken(token));
    console.log('setToken', token);
  }, [dispatch, token]);

  useEffect(() => {
    if (accessToken) dispatch(getUser(accessToken));
    console.log('accessToken', accessToken);
  }, [accessToken, dispatch]);

  const { user } = useSelector(state => ({
    user: state.user.user,
  }));
  const onLogout = () => {
    dispatch(logout());
      try {
          localStorage.removeItem('auth');
       } catch (e) {
         console.log('localStorage is not working');
        }
  };

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
