import React, { useState } from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import imgSrcConverter from '../../lib/utils/imgSrcConverter';
import ProfileCardContainer from '../../container/common/ProfileCardContainer';

const MiniCard = styled.div`
  height: 100%;
  width: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${palette.text};
  cursor: pointer;
`;

const MiniAvatar = styled.img`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  border: 4px solid ${palette.main};
`;

const MiniNickName = styled.div`
  width: 100%;
  color: ${palette.accent};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;

  &:hover {
    overflow: visible;
  }
`;

const MiniProfileCard = ({ nickName, profileImg, onClickCard }) => {
  const [imageError, setImageError] = useState(false);
  const imgAttribute = imgSrcConverter(profileImg, imageError, setImageError);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <MiniCard onClick={onClickCard}>
      <MiniAvatar {...imgAttribute} alt="Profile Picture" onError={handleImageError} />
      <MiniNickName>{nickName}</MiniNickName>
    </MiniCard>
  );
};

export default MiniProfileCard;
