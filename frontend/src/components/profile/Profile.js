import React from 'react';
import styled from 'styled-components';
import { mainColor, accentColor, textColor } from '../../constants/config';
import { useSelector } from 'react-redux';
import { useNavigate } from '../../../node_modules/react-router-dom/dist/index';

const Container = styled.div`
  height: 400px;
  width: 300px;
  border-radius: 20px;
  border: 5px solid ${mainColor};
  overflow: hidden;
  padding: 30px;
`;

const Card = styled.div`
  text-align: center;
  width: 100%;
  color: ${textColor};
`;

const Avatar = styled.img`
  top: 10px;
  max-width: 120px;
  border-radius: 50%;
  border: 4px solid ${mainColor};
`;

const NickName = styled.h1`
  color: ${accentColor};
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
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid ${accentColor};
  color: ${mainColor};
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.h3`
  font-weight: bold;
`;

const StatLabel = styled.p`
  font-size: 0.75rem;
  line-height: 1rem;
  color: ${textColor};
`;

const ProfileCard = props => {
  const navigate = useNavigate();
  const handleIconClick = e => {
    e.preventDefault();
    navigate('/myaccount');
  };

  // const { email, nickName, profileImg, provider } = props;
  const profileImg = `${process.env.PUBLIC_URL}/logo.png`;
  const email = 'test@test.com';
  const nickName = 'test';
  const provider = 'local';
  const follower = '80K';
  const like = '803K';
  const recipe = '1.4K';

  const userEmail = useSelector(state => state.user.user.email);
  console.log(email, userEmail);
  return (
    <Container>
      <Card>
        <Avatar src={profileImg} alt="Profile Picture" />
        <NickName>
          {nickName}
          {email === userEmail && (
            <ProviderImg
              src={`${process.env.PUBLIC_URL}/assets/img/icons/${provider}.png`}
              alt="provider"
              onClick={handleIconClick}
            />
          )}
        </NickName>
        <Email>{email}</Email>
        <StatsContainer>
          <Stat>
            <StatNumber>{follower}</StatNumber>
            <StatLabel>Followers</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{like}</StatNumber>
            <StatLabel>Likes</StatLabel>
          </Stat>
          <Stat>
            <StatNumber>{recipe}</StatNumber>
            <StatLabel>Recipes</StatLabel>
          </Stat>
        </StatsContainer>
      </Card>
    </Container>
  );
};

export default ProfileCard;
