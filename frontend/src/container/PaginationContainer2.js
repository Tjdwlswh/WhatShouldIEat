import React from 'react';
import Pagination from '../components/main/Pagination';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const PaginationContainer2 = () => {
  const [searchParams] = useSearchParams();

  const { email } = useParams();
  const tag = searchParams.get('tag');

  const page = parseInt(searchParams.get('page'), 10) || 1;

  const { lastPage, recommend, loading } = useSelector(({ recommend, loading }) => ({
    lastPage: recommend.lastPage,
    recommend: recommend.posts,
    loading: loading['posts/LIST_RECOMMEND'],
  }));

  console.log(recommend);

  if (!recommend || loading) return null;

  return <Pagination tag={tag} email={email} page={parseInt(page, 10)} lastPage={lastPage} />;
};

export default PaginationContainer2;
