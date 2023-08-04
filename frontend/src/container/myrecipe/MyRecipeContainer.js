import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { readPost, unloadPost } from '../../modules/myrecipe';
import MyRecipeForm from '../../components/main/myrecipe/MyRecipeForm';
import MyRecipeList from '../../components/main/myrecipe/MyRecipeList';
import { ItemList } from '../../components/main/myrecipe/MyRecipeList';

const MyRecipeContainer = () => {
  const { postId } = useParams();

  const dispatch = useDispatch();
  const { post, error, loading, token } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    token: user.token,
  }));
  const recipeId = postId;

  useEffect(() => {
    dispatch(readPost({ recipeId, token }));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, recipeId, token]);

  return (
    <div>
      <MyRecipeForm post={post} loading={loading} error={error} />;
    </div>
  );
};

export default MyRecipeContainer;
