import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import MiniProfileCard from '../../components/common/MiniProfileCard';
import authAPI from '../../lib/api/auth';
import ProfileCardContainer from './ProfileCardContainer';
import styled from 'styled-components';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  animation: modal-bg-show 0.3s;
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MiniProfileCardContainer = ({ userId }) => {
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
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

  const handleClickCard = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <MiniProfileCard
        nickName={userData.nickName}
        profileImg={userData.profileImg}
        onClickCard={handleClickCard}
      />
      {showModal && (
        <ModalWrapper onClick={handleClose}>
          <ProfileCardContainer userId={userId} onClickClose={handleClose} />
        </ModalWrapper>
      )}
    </>
  );
};

export default MiniProfileCardContainer;
