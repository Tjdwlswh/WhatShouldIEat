import styled, { css } from 'styled-components';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 1.125rem;
  color: #000000 85%;
  outline: none;
  cursor: pointer;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;
  margin-top: 0.2rem;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.2);
  display: block;

  &:hover {
    filter: brightness(90%);
  }
`;

const Image = styled.img`
  width: 1.6rem;
  height: 1.4rem;
  margin-right: 0.5rem;
  position: relative;
  display: inline;
`;

const GoogleLoginButton = () => {
  const GoogleButton = styled.button`
    ${buttonStyle}
  `;

  const onClick = () => {
    window.location.href = 'http://localhost:5000/auth/google/login';
  };

  return (
    <GoogleButton onClick={onClick}>
      <Image src={process.env.PUBLIC_URL + '/assets/img/icons/google.png'} alt="구글 로그인 버튼" />
      <span>Google 계정으로 로그인</span>
    </GoogleButton>
  );
};

export default GoogleLoginButton;
