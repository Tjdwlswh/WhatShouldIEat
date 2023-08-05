import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { readPost, unloadPost, setOriginalPost } from '../../modules/myrecipe';

import MyRecipeForm from '../../components/main/myrecipe/MyRecipeForm';
import MyRecipeList from '../../components/main/myrecipe/MyRecipeList';
import { ItemList } from '../../components/main/myrecipe/MyRecipeList';

const MyRecipeContainer = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post, error, loading, token, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading['post/READ_POST'],
    token: user.token,
    user: user.user,
  }));
  const recipeId = postId;

  useEffect(() => {
    dispatch(readPost({ recipeId, token }));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, recipeId, token]);

  const onEdit = () => {
    dispatch(readPost({ recipeId, token }));
    navigate('/CreateAi');
  };
  console.log(post);

  return (
    <div>
      <MyRecipeForm post={post} loading={loading} error={error} onEdit={onEdit} />;
    </div>
  );
};

export default MyRecipeContainer;
