import RecommendForm from '../components/main/recommend/RecommendForm';
import RecommendTemp from '../components/main/recommend/RecommendTemp';
import PaginationContainer2 from '../container/PaginationContainer2';
import RecommendContainer from '../container/recommend/RecommendContainer';

const RecommendRecipe = () => {
  return (
    <div>
      <RecommendTemp>
        <RecommendContainer />
      </RecommendTemp>
      <PaginationContainer2 />
    </div>
  );
};

export default RecommendRecipe;
