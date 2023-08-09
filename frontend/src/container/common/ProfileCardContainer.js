import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileCard from '../../components/common/ProfileCard';
import authAPI from '../../lib/api/auth';
import { addFollow, removeFollow } from '../../lib/api/follow';

/*
  ProfileCard Size
  height: 400px;
  width: 300px;

  MiniProfileCard Size
  96X96 6remX6rem
*/

const OuterContainer = styled.div`
  position: fixed;
  ${props =>
    !props.userId &&
    `
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

const ProfileCardContainer = ({ userId, onClickClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const { token, user } = useSelector(state => state.user);

  useEffect(() => {
    const { pathname } = location;
    setShow(pathname !== '/myaccount' && token);
  }, [location, token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const { data } = await authAPI.getUserCard({ token, userId });
          setIsFollowing(data.followerIdList.includes(user?.id));
          data.isMine = !userId;
          setUserData(current => {
            const newUserDate = {
              ...current,
              isFollowing,
              ...data,
            };
            return newUserDate;
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [token, userId, user?.id, isFollowing]);

  const handleIconClick = () => {
    navigate('/myaccount');
  };

  const handleClickFollow = async () => {
    if (isFollowing) {
      await removeFollow({ token, followingId: userId });
      setIsFollowing(false);
    } else {
      await addFollow({ token, followingId: userId });
      setIsFollowing(true);
    }
  };

  return (
    show && (
      <OuterContainer userId={userId}>
        <ProfileCard
          props={userData}
          onClickFollow={handleClickFollow}
          onClickClose={onClickClose}
          onClickIcon={handleIconClick}
        />
      </OuterContainer>
    )
  );
};

export default ProfileCardContainer;
