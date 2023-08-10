import AuthTemplate from '../components/auth/AuthTemplate';
import RegisterForm from '../container/RegisterForm';
import { Helmet } from 'react-helmet-async';

const RegisterPage = () => {
  return (
    <>
      <Helmet>
        <title>회원가입 - 뭐해먹지?</title>
      </Helmet>
      <AuthTemplate>
        <RegisterForm />
      </AuthTemplate>
    </>
  );
};

export default RegisterPage;
