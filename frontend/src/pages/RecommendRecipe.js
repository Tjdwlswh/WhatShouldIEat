import RecommendForm from '../components/main/recommend/RecommendForm';
import RecommendTemp from '../components/main/recommend/RecommendTemp';
import PaginationContainer2 from '../container/PaginationContainer2';
import RecommendContainer from '../container/recommend/RecommendContainer';
import { Helmet } from 'react-helmet-async';

const RecommendRecipe = () => {
  return (
    <div>
      <Helmet>
        <title>추천레시피 - 뭐해먹지?</title>
      </Helmet>
      <RecommendTemp>
        <RecommendContainer />
      </RecommendTemp>
      <PaginationContainer2 />
    </div>
  );
};

export default RecommendRecipe;
