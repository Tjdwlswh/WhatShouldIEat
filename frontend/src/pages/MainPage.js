import MainTemplate from '../components/main/MainTemplate';
import MainForm from '../components/main/MainForm';
import RecommendForm from '../components/main/recommend/RecommendForm';
import RecommendTemp from '../components/main/recommend/RecommendTemp';
import RecommendContainer from '../container/recommend/RecommendContainer';
import { Helmet } from 'react-helmet-async';
import { Link } from '../../node_modules/react-router-dom/dist/index';
import styled from 'styled-components';

const DivLink = styled.div`
  padding: 0.5rem;
  h3 {
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
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

// background-position: center 70%
//color : rgba(255,255,255,0.9)
//background-size : cover
//color : white
//background : gold
//display: flex

export default MainPage;
