import ReviewTemp from '../components/main/review/ReviewTemp';
import ReviewContainer from '../container/review/ReviewContainer';
import { Helmet } from 'react-helmet-async';

const ReviewRecipe = () => {
  return (
    <div>
      <Helmet>
        <title>후기 모아보기 - 뭐해먹지?</title>
      </Helmet>
      <ReviewTemp>
        <ReviewContainer />
      </ReviewTemp>
    </div>
  );
};

export default ReviewRecipe;
