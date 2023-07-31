import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout, getUser, setToken } from '../../modules/user';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = () => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector(state => state.user.token);

  const token = cookies.get('token');

  useEffect(() => {
    if (token) dispatch(setToken(token));
  }, [dispatch, token]);

  useEffect(() => {
    if (accessToken) dispatch(getUser(accessToken));
  }, [accessToken, dispatch]);

  const { user } = useSelector(state => ({
    user: state.user.user,
  }));

  const onLogout = () => {
    dispatch(logout(accessToken));
  };

  const handleEmailClick = e => {
    e.preventDefault();
    navigate('/myaccount');
  };

  return <Header user={user} onLogout={onLogout} handleEmailClick={handleEmailClick} />;
};

export default HeaderContainer;
