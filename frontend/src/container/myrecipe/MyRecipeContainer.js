import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { postLike, readPost, unloadPost } from '../../modules/myrecipe';
import MyRecipeForm from '../../components/main/myrecipe/MyRecipeForm';

const MyRecipeContainer = () => {
  const [like, setLike] = useState(false);
  const [searchParams] = useSearchParams();
  const postId = searchParams.get('postId');

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
    if (post && user) {
      setLike(post.recipe.Likers?.includes(user.id));
      console.log(post.recipe.Likers);
    }
  }, [post, user]);

  useEffect(() => {
    dispatch(postLike({ recipeId, token, like }));
  }, [dispatch, like, recipeId, token]);

  useEffect(() => {
    dispatch(readPost({ recipeId, token }));
    // return () => {
    //   dispatch(unloadPost());
    // };
  }, [dispatch, recipeId, token, commentInfo]);

  return (
    <div>
      <MyRecipeForm
        like={like}
        setLike={setLike}
        post={post}
        loading={loading}
        error={error}
        user={user}
        token={token}
        recipeId={recipeId}
      />
    </div>
  );
};

export default MyRecipeContainer;
