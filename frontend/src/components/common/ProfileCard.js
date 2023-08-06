import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Container = styled.div`
  width: 90%;
  height: 93%;
  border-radius: 20px;
  border: 5px solid ${palette.main};
  overflow: hidden;
  padding: 0 20px;
`;

const Card = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${palette.text};
  justify-content: flex-end;
`;

const Avatar = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 4px solid ${palette.main};
`;

const NickName = styled.h1`
  color: ${palette.accent};
  font-weight: bold;
  margin-top: 1.25rem;
  margin-bottom: 0.25rem;
`;

const ProviderImg = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  display: inline;
  margin: 0.5rem;
  cursor: pointer;
`;

const Email = styled.h2`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const StatsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${palette.accent};
  color: ${palette.main};
`;

const Stat = styled(Link)`
  text-align: center;
`;

const StatNumber = styled.h3`
  font-weight: bold;
`;

const StatLabel = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${palette.text};
`;

const MiniCard = styled.div`
  height: 100%;
  width: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${palette.text};
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

const ProfileCard = ({ props, onClickIcon }) => {
  const [imageError, setImageError] = useState(false);
  const {
    isMine,
    provider,
    nickName,
    profileImg,
    recipeCount,
    followerCount,
    followingCount,
    followingIdList,
  } = props;

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <Container>
      <Card>
        <Avatar
          src={
            imageError
              ? `${process.env.REACT_APP_BACK_URL}/uploads/${profileImg}`
              : `${process.env.PUBLIC_URL}/logo.png`
          }
          alt="Profile Picture"
          onError={handleImageError}
        />
        <NickName>
          {nickName}
          {isMine && (
            <ProviderImg
              src={`${process.env.PUBLIC_URL}/assets/img/icons/${provider}.png`}
              alt="provider"
              onClick={onClickIcon}
            />
          )}
        </NickName>
        {/* <Email>{email}</Email> */}
        <StatsContainer>
          <Stat>
            <StatNumber>{followerCount}</StatNumber>
            <StatLabel>Followers</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{followingCount}</StatNumber>
            <StatLabel>Followings</StatLabel>
          </Stat>
          <Stat to="/myrecipe">
            <StatNumber>{recipeCount}</StatNumber>
            <StatLabel>Recipes</StatLabel>
          </Stat>
        </StatsContainer>
      </Card>
    </Container>
  );
};

const MiniProfileCard = ({ nickName, profileImg }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <MiniCard>
      <MiniAvatar
        src={
          imageError
            ? `${process.env.REACT_APP_BACK_URL}/uploads/${profileImg}`
            : `${process.env.PUBLIC_URL}/logo.png`
        }
        alt="Profile Picture"
        onError={handleImageError}
      />
      <MiniNickName>{nickName}</MiniNickName>
    </MiniCard>
  );
};

export { ProfileCard, MiniProfileCard };
