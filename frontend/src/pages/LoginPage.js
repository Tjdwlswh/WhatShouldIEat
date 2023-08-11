import AuthTemplate from '../components/auth/AuthTemplate';
import LoginForm from '../container/LoginForm';
import { Helmet } from 'react-helmet-async';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>로그인 - 뭐해먹지?</title>
      </Helmet>
      <AuthTemplate>
        <LoginForm />
      </AuthTemplate>
    </>
  );
};

export default LoginPage;
