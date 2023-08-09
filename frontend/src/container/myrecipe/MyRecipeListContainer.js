import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyRecipeList from '../../components/main/myrecipe/MyRecipeList';
import { listPosts } from '../../modules/myrecipelist';
import { useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { email } = useParams();
  const [searchParams] = useSearchParams();

  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading['posts/LIST_POSTS'],
    user: user.user,
  }));
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(listPosts(token, email, tag, page));
  }, [dispatch, token, email, searchParams]);

  return <MyRecipeList loading={loading} error={error} posts={posts} user={user} />;
};

export default PostListContainer;
