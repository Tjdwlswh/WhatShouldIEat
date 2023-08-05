import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ProfileCard from '../../components/common/ProfileCard';
import authAPI from '../../lib/api/auth';

const OuterContainer = styled.div`
  ${props =>
    !props.isAccount &&
    css`
      position: fixed;
      top: 6rem;
      left: 2rem;

      @media (max-width: 1740px) {
        display: none;
      }
    `}
  height: 400px;
  width: 300px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

// const ProfileCardContainer = ({ email }) => {
const ProfileCardContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAccount, setIsAccount] = useState(false);
  const [userData, setUserData] = useState({});
  const { token } = useSelector(state => state.user);
  const myEmail = useSelector(state => state.user.user?.email);

  useEffect(() => {
    const { pathname } = location;
    setIsAccount(pathname === '/myaccount');
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await authAPI.getUserCard(token);
        setUserData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token]);

  const handleIconClick = () => {
    navigate('/myaccount');
  };

  return (
    <OuterContainer isAccount={isAccount}>
      <ProfileCard props={userData} onClickIcon={handleIconClick} />
    </OuterContainer>
  );
};

export default ProfileCardContainer;
