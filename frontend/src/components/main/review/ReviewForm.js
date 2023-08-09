import styled from 'styled-components';
import ThumbnailCard from '../../common/ThumbnailCard';
import palette from '../../../lib/styles/palette';
import MiniProfileCardContainer from '../../../container/common/MiniProfileCardContainer';
import ToggleButton from './ToggleButton';
import PaginationBox from '../../common/PaginationBox';

const ReviewContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 10rem;
  gap: 1rem;
  justify-content: start;
  align-items: center;
`;

const ReviewBox = styled.div`
  position: relative;
  width: 80%;
  height: 8.5rem;
  display: flex;
  border: 1px solid ${palette.text};
  border-radius: 10px;
  justify-content: space-between;
  color: ${palette.text};
  padding: 5px;
`;

const ReviewTextBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
  font-size: 1.5rem;
  padding: 0 0.5rem;
`;

const ReviewCreateDate = styled.p`
  position: relative;
  top: 1px;
  padding: 5px;
  font-size: 1.2rem;
  color: ${palette.text};
`;

const ReviewForm = ({ page, setPage, reviews, myComment, setMyComment }) => {
  if (!reviews?.comments) {
    return null;
  }

  return (
    <>
      <ToggleButton myComment={myComment} setMyComment={setMyComment} setPage={setPage} />
      {reviews.comments.map(review => (
        <ReviewContainer key={review.id}>
          <ThumbnailCard
            imgSrc={review.Recipe.foodImg}
            tags={review.Recipe.tags}
            foodname={review.Recipe.foodname}
            recipeId={review.Recipe.id}
          />
          <ReviewBox>
            {review.commenterId !== review.recipeUserId ? (
              myComment ? (
                <MiniProfileCardContainer userId={review.recipeUserId} />
              ) : (
                <MiniProfileCardContainer userId={review.commenterId} />
              )
            ) : (
              <div />
            )}
            <ReviewTextBox>{review.comment}</ReviewTextBox>
            <ReviewCreateDate>{new Date(review.createdAt).toLocaleDateString()}</ReviewCreateDate>
          </ReviewBox>
        </ReviewContainer>
      ))}
      <PaginationBox page={page} setPage={setPage} totalItemsCount={reviews.totalItemsCount} />
    </>
  );
};

export default ReviewForm;
