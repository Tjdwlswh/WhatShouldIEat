import MainTemplate from '../components/main/MainTemplate';
import MainForm from '../components/main/MainForm';
import RecommendForm from '../components/main/recommend/RecommendForm';
import RecommendTemp from '../components/main/recommend/RecommendTemp';
// import RecommendContainer from '../container/recommend/RecommendContainer';
import { Helmet } from 'react-helmet-async';

const MainPage = () => {
  return (
    <div>
      <Helmet>
        <title>뭐해먹지?</title>
      </Helmet>
      <MainTemplate>
        <MainForm />
      </MainTemplate>
      {/* <RecommendTemp>
        <RecommendContainer />
      </RecommendTemp> */}
    </div>
  );
};

export default MainPage;
