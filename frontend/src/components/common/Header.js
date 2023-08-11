import React from 'react';
import styled from 'styled-components';
import Responsive from './Responsive';
import Button from './Button';
import { Link } from 'react-router-dom';

const HeaderBlock = styled.div`
  position: fixed;
  width: 100%;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  z-index: 1000;
`;

const Wrapper = styled(Responsive)`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-right: 2rem;
  }

  .link {
    font-size: 1.125rem;
    font-weight: bold;
    margin-right: 2rem;
  }

  .right {
    display: flex;
    align-items: flex-end;
    flex-direction: row;
    justify-content: center;
    margin-left: 0.8rem;
  }

  .one {
    width: 70%;
  }

  .two {
    justify-self: flex-end;
    width: 30%;
  }

  .userone {
    margin-right: 2rem;
    margin-bottom: 0.25rem;
  }
  .usertwo {
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
  cursor: pointer;
`;

const Header = ({ user, onLogout, handleEmailClick }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div className="one">
            <Link to="/" className="logo">
              뭐해먹지?
            </Link>
            <Link to="/create" className="link">
              레시피 생성
            </Link>
            {user && (
              <Link to={`/myrecipes`} className="link">
                나의 레시피
              </Link>
            )}
            <Link to="/recipes" className="link">
              추천 레시피
            </Link>
            <Link to="/review" className="link">
              후기 모아보기
            </Link>
          </div>
          <div className="two">
            {user ? (
              <div className="right">
                <div className="userone">
                  <UserInfo onClick={handleEmailClick}>{user.nickName}</UserInfo>
                </div>
                <div className="usertwo">
                  <Button onClick={onLogout}>로그아웃</Button>
                </div>
              </div>
            ) : (
              <div className="right">
                <Button to="/login">로그인</Button>
              </div>
            )}
          </div>
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
