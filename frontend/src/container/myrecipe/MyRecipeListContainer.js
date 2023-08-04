import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyRecipeList from '../../components/main/myrecipe/MyRecipeList';
import { listPosts } from '../../modules/myrecipelist';
import { useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user,
  }));
  const { token } = useSelector(state => state.user);

  console.log(token);
  console.log(user);

  useEffect(() => {
    dispatch(listPosts(token));
  }, [dispatch, token]);

  return <MyRecipeList loading={loading} error={error} posts={posts} showWriteButton={user} />;
};

export default PostListContainer;
