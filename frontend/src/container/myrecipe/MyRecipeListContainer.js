import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyRecipeList from '../../components/main/myrecipe/MyRecipeList';
import { listPosts } from '../../modules/myrecipelist';
import { useParams, useSearchParams } from 'react-router-dom';

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { email } = useParams();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const { totalItemsCount, posts, error, loading, user, lastPost } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      totalItemsCount: posts.totalItemsCount,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
      lastPost: posts.lastPost,
    }),
  );
  const { token } = useSelector(state => state.user);

  console.log(totalItemsCount);

  useEffect(
    page => {
      const tag = searchParams.get('tag');

      dispatch(listPosts({ token, email, tag, page }));
    },
    [dispatch, token, email, searchParams, page],
  );

  return (
    <MyRecipeList
      totalItemsCount={totalItemsCount}
      page={page}
      setPage={setPage}
      loading={loading}
      error={error}
      posts={posts}
      user={user}
    />
  );
};

export default PostListContainer;
