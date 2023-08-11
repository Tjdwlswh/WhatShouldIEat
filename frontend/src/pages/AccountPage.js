import AuthTemplate from '../components/auth/AuthTemplate';
import AccountContainer from '../container/AccountContainer';
import { Helmet } from 'react-helmet-async';

const AccountPage = () => {
  return (
    <>
      <Helmet>
        <title>나의 계정 - 뭐해먹지?</title>
      </Helmet>
      <AuthTemplate>
        <AccountContainer />
      </AuthTemplate>
    </>
  );
};

export default AccountPage;
