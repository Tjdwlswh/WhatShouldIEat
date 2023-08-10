import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecommendForm from '../../components/main/recommend/RecommendForm';
import { recommendPosts } from '../../modules/recommend';
import { useParams, useSearchParams } from 'react-router-dom';

const RecommendContainer = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');

  const { recommend, error, loading, user } = useSelector(({ recommend, loading, user }) => ({
    recommend: recommend.posts,
    error: recommend.error,
    loading: loading['posts/LIST_RECOMMEND'],
    user: user.user,
  }));
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    const tag = searchParams.get('tag');
    const page = parseInt(searchParams.get('page'), 10) || 1;
    dispatch(recommendPosts(token, userId, tag, page));
  }, [dispatch, token, userId, searchParams]);

  return <RecommendForm loading={loading} error={error} recommend={recommend} user={user} />;
};

export default RecommendContainer;
