import { useDispatch, useSelector } from 'react-redux';
import ReviewForm from '../../components/main/review/ReviewForm';
import { useEffect, useLayoutEffect } from 'react';
import { readReview } from '../../modules/review';
import { useState } from 'react';

const ReviewContainer = () => {
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user);
  const { myReviews } = useSelector(state => state.review);
  const [page, setPage] = useState(1);

  useLayoutEffect(() => {
    dispatch(readReview({ token, page }));
  }, [dispatch, page, token]);

  return <ReviewForm page={page} setPage={setPage} reviews={myReviews} />;
};

export default ReviewContainer;
