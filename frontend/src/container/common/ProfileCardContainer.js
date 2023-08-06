import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { MiniProfileCard, ProfileCard } from '../../components/common/ProfileCard';
import authAPI from '../../lib/api/auth';

const OuterContainer = styled.div`
  position: fixed;
  top: 6rem;
  left: 2rem;

  @media (max-width: 1740px) {
    display: none;
  }
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
const ProfileCardContainer = ({ userId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    const { pathname } = location;
    setShow(pathname !== '/myaccount' && userData);
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const { data } = await authAPI.getUserCard({ token, userId });
          data.isMine = !userId;
          setUserData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token, userId]);

  const handleIconClick = () => {
    navigate('/myaccount');
  };

  return (
    show && (
      <OuterContainer>
        <ProfileCard props={userData} onClickIcon={handleIconClick} />
      </OuterContainer>
    )
  );
};

const MiniProfileCardContainer = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const { data } = await authAPI.getUserCard({ token, userId });
          setUserData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token, userId]);

  return <MiniProfileCard nickName={userData.nickName} profileImg={userData.profileImg} />;
};

export { ProfileCardContainer, MiniProfileCardContainer };
