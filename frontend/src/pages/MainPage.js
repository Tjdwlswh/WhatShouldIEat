import MainTemplate from '../components/main/MainTemplate';
import MainForm from '../components/main/MainForm';
import RecommendForm from '../components/main/recommend/RecommendForm';
import RecommendTemp from '../components/main/recommend/RecommendTemp';
import RecommendContainer from '../container/recommend/RecommendContainer';
import { Helmet } from 'react-helmet-async';
import { Link } from '../../node_modules/react-router-dom/dist/index';
import styled from 'styled-components';

const DivLink = styled.div`
  h3 {
    text-align: center;
  }
`;

const MainPage = () => {
  return (
    <div>
      <Helmet>
        <title>뭐해먹지?</title>
      </Helmet>
      <MainTemplate>
        <MainForm />
      </MainTemplate>
      <DivLink>
        <Link to={'/recipes'}>
          <h3>Popular Items</h3>
        </Link>
      </DivLink>
      <RecommendTemp>
        <RecommendContainer />
      </RecommendTemp>
    </div>
  );
};

export default MainPage;
