import styled from 'styled-components';
import { Link } from 'react-router-dom';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import KakaoLoginButton from '../button/KakaoLogin';
import GoogleLoginButton from '../button/GoogleLogin';
import ImgUploadContainer from '../../container/common/ImgUploadContainer';

//회원가입 로그인 폼 웹디자인 컴포넌트

const AuthFormBlock = styled.div`
  h3 {
    margin: 0;
    color: ${palette.gray[8]};
    text-align: center;
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const StyleInput = styled.input`
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid ${palette.gray[5]};
  padding-bottom: 0.5rem;
  outline: none;
  width: 100%;
  &:focus {
    color: $oc-teal-7;
    border-bottom: 1px solid ${palette.gray[7]};
  }
  & + & {
    margin-top: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: right;
  a {
    color: ${palette.gray[6]};
    text-decoration: underline;
    &:hover {
      color: ${palette.gray[9]};
    }
  }
`;
const ButtonWithMarginTop = styled(Button)`
  margin-top: 1rem;
`;
const textMap = {
  login: '로그인',
  register: '회원가입',
  renew: '회원 정보 수정',
};

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const SuccessMessage = styled.div`
  color: blue;
  text-align: center;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

const AuthForm = ({ type, form, onChange, onSubmit, error, onImageSelected, imgSrc }) => {
  const text = textMap[type];
  const { provider, email, password, passwordConfirm, nickName, message } = form;

  const isRegister = type === 'register';
  const isLogin = type === 'login';
  const isRenew = type === 'renew';
  const isOAuth = ['google', 'kakao'].includes(provider);

  return (
    <AuthFormBlock>
      <h3>{text}</h3>
      <form onSubmit={onSubmit}>
        {isRenew ? (
          <>
            <ImgUploadContainer onImageSelected={onImageSelected} imgSrc={imgSrc} />
            <StyleInput defaultValue={email} disabled />
          </>
        ) : (
          <StyleInput
            autoComplete="email"
            name="email"
            placeholder="이메일"
            onChange={onChange}
            value={email}
          />
        )}
        {!isOAuth && (
          <>
            <StyleInput
              autoComplete="new-password"
              name="password"
              placeholder={isRenew ? '비밀번호를 변경하려면 입력하세요' : '비밀번호'}
              type="password"
              onChange={onChange}
              value={password}
            />
            {(isRegister || isRenew) && (
              <StyleInput
                autoComplete="new-password"
                name="passwordConfirm"
                placeholder="비밀번호 확인"
                type="password"
                onChange={onChange}
                value={passwordConfirm}
              />
            )}
          </>
        )}
        {(isRegister || isRenew) && (
          <StyleInput name="nickName" placeholder="닉네임" onChange={onChange} value={nickName} />
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {message && <SuccessMessage>{message}</SuccessMessage>}
        <ButtonWithMarginTop cyan={true} fullWidth={true} style={{ marginTop: '1rem' }}>
          {text}
        </ButtonWithMarginTop>
        {isLogin && (
          <>
            <KakaoLoginButton />
            <GoogleLoginButton />
          </>
        )}
      </form>
      <Footer>
        {isLogin && <Link to="/register">회원가입</Link>}
        {isRegister && <Link to="/login">로그인</Link>}
        {isRenew && <Link to="/leave">회원탈퇴</Link>}
      </Footer>
    </AuthFormBlock>
  );
};

export default AuthForm;
