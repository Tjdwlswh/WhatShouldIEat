import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import ProfileCard from '../../components/common/ProfileCard';

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

const ProfileCardContainer = ({ email }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAccount, setIsAccount] = useState(false);
  const handleIconClick = () => {
    navigate('/myaccount');
  };

  useEffect(() => {
    const { pathname } = location;
    setIsAccount(pathname === '/myaccount');
  }, [location]);

  const userEmail = useSelector(state => state.user.user?.email);
  const props = {
    profileImg: `${process.env.PUBLIC_URL}/logo.png`,
    email,
    nickName: 'test',
    provider: 'local',
    follower: '80K',
    like: '803K',
    recipe: '1.4K',
    isMine: userEmail === email,
  };
  return (
    <OuterContainer isAccount={isAccount}>
      <ProfileCard props={props} handleIconClick={handleIconClick} />
    </OuterContainer>
  );
};

export default ProfileCardContainer;
