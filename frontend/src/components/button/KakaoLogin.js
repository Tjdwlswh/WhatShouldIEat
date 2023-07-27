import styled, { css } from 'styled-components';

const buttonStyle = css`
  border: none;
  border-radius: 4px;
  background-color: #fee500;
  font-size: 1.125rem;
  font-weight: bold;
  color: #000000 85%;
  outline: none;
  cursor: pointer;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  width: 100%;
  margin-top: 0.2rem;
  box-shadow: 0 4px 8px 1px rgba(0, 0, 0, 0.3);
  display: block;

  &:hover {
    filter: brightness(90%);
  }
`;

const Image = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  margin-right: 0.5rem;
  position: relative;
  top: -0.2rem;
  display: inline;
`;

const KakaoLoginButton = () => {
  const KakaoButton = styled.button`
    ${buttonStyle}
  `;

  const handleClick = e => {
    e.preventDefault();
    window.location.href = 'http://localhost:5000/auth/kakao/login';
  };

  return (
    <KakaoButton onClick={handleClick}>
      <Image
        src={process.env.PUBLIC_URL + '/assets/img/icons/kakao.png'}
        alt="카카오 로그인 버튼"
      />
      카카오 로그인
    </KakaoButton>
  );
};

export default KakaoLoginButton;
