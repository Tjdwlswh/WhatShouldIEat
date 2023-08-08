import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewForm from '../../components/main/review/ReviewForm';
import { readReview, readMyRecipeReview } from '../../modules/review';

const ReviewContainer = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [myComment, setMyComment] = useState(true);
  const { token } = useSelector(state => state.user);
  const { myReviews, myRecipeReviews } = useSelector(state => state.review);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (myComment) {
      dispatch(readReview({ token, page }));
    } else {
      dispatch(readMyRecipeReview({ token, page }));
    }
  }, [dispatch, myComment, page, token]);

  useEffect(() => {
    setReviews(myComment ? myReviews : myRecipeReviews);
  }, [myComment, myReviews, myRecipeReviews]);

  return (
    <ReviewForm
      page={page}
      setPage={setPage}
      reviews={reviews}
      myComment={myComment}
      setMyComment={setMyComment}
    />
  );
};

export default ReviewContainer;
