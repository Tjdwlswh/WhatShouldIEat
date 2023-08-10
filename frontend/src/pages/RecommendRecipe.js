import RecommendForm from '../components/main/recommend/RecommendForm';
import RecommendTemp from '../components/main/recommend/RecommendTemp';
import PaginationContainer from '../container/PaginationContainer';
import RecommendContainer from '../container/recommend/RecommendContainer';

const RecommendRecipe = () => {
  return (
    <div>
      <RecommendTemp>
        <RecommendContainer />
      </RecommendTemp>
      <PaginationContainer />
    </div>
  );
};

export default RecommendRecipe;
