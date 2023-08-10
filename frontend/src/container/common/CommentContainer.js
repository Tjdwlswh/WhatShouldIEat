import { useDispatch, useSelector } from 'react-redux';
import CommentInput from '../../components/common/comment/CommentInput';
import CommentList from '../../components/common/comment/CommentList';
import { changeComment, deleteReview, writeReview } from '../../modules/review';

const CommentContatiner = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector(state => state.user);
  const { comments } = useSelector(({ post }) => ({ comments: post.post.comment }));
  const { id, userId } = useSelector(state => state.post.post.recipe);
  const { comment } = useSelector(state => state.review);

  const handleChange = e => {
    const { value } = e.target;
    dispatch(changeComment(value));
  };

  const handleClick = () => {
    dispatch(writeReview({ token, recipeId: id, recipeUserId: userId, comment }));
    dispatch(changeComment(''));
  };

  const handleDelete = commentId => {
    dispatch(deleteReview({ token, recipeId: id, commentId }));
  };

  return (
    <>
      <CommentList comments={comments} userId={user?.id} onClickDelete={handleDelete} />
      {!!user && <CommentInput onChange={handleChange} onClick={handleClick} comment={comment} />}
    </>
  );
};

export default CommentContatiner;
