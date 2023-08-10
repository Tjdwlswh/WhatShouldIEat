import React from 'react';
import Pagination from '../components/main/Pagination';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const PaginationContainer = () => {
  const [searchParams] = useSearchParams();

  const { email } = useParams();
  const tag = searchParams.get('tag');

  const page = parseInt(searchParams.get('page'), 10) || 1;

  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading['posts/LIST_POSTS'],
  }));

  console.log(posts);

  if (!posts || loading) return null;

  return <Pagination tag={tag} email={email} page={parseInt(page, 10)} lastPage={lastPage} />;
};

export default PaginationContainer;
