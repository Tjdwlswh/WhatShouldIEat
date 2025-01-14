import React from 'react';
import Pagination from '../components/main/Pagination';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const PaginationContainer = () => {
  const { posts, loading, totalItemsCount } = useSelector(({ posts, loading }) => ({
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
    totalItemsCount: posts.totalItemsCount,
  }));
  const [searchParams] = useSearchParams();

  const { email } = useParams();
  const tag = searchParams.get('tag');

  const page = parseInt(searchParams.get('page'), 10) || 1;

  if (!posts || loading) return null;

  const lastPage = Math.ceil(totalItemsCount / 8);

  console.log(posts);
  console.log(lastPage);
  console.log(totalItemsCount);

  return <Pagination tag={tag} email={email} page={parseInt(page, 10)} lastPage={lastPage} />;
};

export default PaginationContainer;
