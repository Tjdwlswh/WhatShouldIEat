import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import imgSrcConverter from '../../lib/utils/imgSrcConverter';
import Button from './Button';

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

const Close = styled.div`
  position: absolute;
  top: 25px;
  right: 30px;
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
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

const Follow = styled(Button)`
  font-size: 0.875rem;
  line-height: 1rem;
  background-color: ${palette.main};
  color: ${palette.gray[7]};
`;

const StatsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${props => (props.isMine ? `margin-top: 1.5rem;` : `margin-top: 0.5rem;`)}
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

const ProfileCard = ({ props, onClickIcon, onClickFollow, onClickClose }) => {
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

  const imgAttribute = imgSrcConverter(profileImg, imageError, setImageError);

  const handleClickBubble = e => {
    e.stopPropagation();
  };

  return (
    <Container onClick={handleClickBubble}>
      <Card>
        {!isMine && <Close onClick={onClickClose}>X</Close>}
        <Avatar {...imgAttribute} alt="Profile Picture" />
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
        {!isMine && <Follow onClick={onClickFollow}>팔로우</Follow>}
        <StatsContainer isMine={isMine}>
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

export default ProfileCard;
