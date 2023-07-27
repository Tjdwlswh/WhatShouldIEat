import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout, setUser, setToken } from '../../modules/user';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const token = cookies.get('token');
  useEffect(() => {
    dispatch(setToken(token));
    console.log(token);
  }, [dispatch, token]);

  const { user } = useSelector(state => ({
    user: state.user.user,
  }));
  const accessToken = useSelector(state => state.user.token);
  const onLogout = () => {
    dispatch(logout());
  };

  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
