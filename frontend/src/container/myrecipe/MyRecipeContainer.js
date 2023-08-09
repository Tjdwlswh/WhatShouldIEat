import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/myrecipe';
import MyRecipeForm from '../../components/main/myrecipe/MyRecipeForm';

const MyRecipeContainer = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, error, loading, token, user, commentInfo } = useSelector(
    ({ post, loading, user, review }) => ({
      post: post.post,
      error: post.error,
      loading: loading['post/READ_POST'],
      token: user.token,
      user: user.user,
      commentInfo: review.commentInfo,
    }),
  );
  const recipeId = postId;

  useEffect(() => {
    dispatch(readPost({ recipeId, token }));
    // return () => {
    //   dispatch(unloadPost());
    // };
  }, [dispatch, recipeId, token, commentInfo]);

  return (
    <div>
      <MyRecipeForm
        post={post}
        loading={loading}
        error={error}
        user={user}
        token={token}
        recipeId={recipeId}
      />
      ;
    </div>
  );
};

export default MyRecipeContainer;
