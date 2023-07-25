import HeaderContainer from '../container/common/HeaderContainer';
import MainTemplate from '../components/main/MainTemplate';
import MainForm from '../components/main/MainForm';

const MainPage = () => {
  return (
    <div>
      <HeaderContainer />
      <MainTemplate>
        <MainForm />
      </MainTemplate>
    </div>
  );
};

export default MainPage;
