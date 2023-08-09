import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/common/Header';
import { logout } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const HeaderContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(state => state.user.token);
  const { user } = useSelector(state => state.user);

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
