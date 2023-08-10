import MainTemplate from '../components/main/MainTemplate';
import MainForm from '../components/main/MainForm';
import RecommendForm from '../components/main/recommend/RecommendForm';
import RecommendTemp from '../components/main/recommend/RecommendTemp';
// import RecommendContainer from '../container/recommend/RecommendContainer';

const MainPage = () => {
  return (
    <div>
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
