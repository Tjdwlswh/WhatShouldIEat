import React from 'react';
import Pagination from '../components/main/Pagination';
import { useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

const PaginationContainer2 = () => {
  const [searchParams] = useSearchParams();

  const { email } = useParams();
  const tag = searchParams.get('tag');

  const page = parseInt(searchParams.get('page'), 10) || 1;

  const { recommend, loading } = useSelector(({ recommend, loading }) => ({
    recommend: recommend.posts,
    loading: loading['posts/LIST_RECOMMEND'],
  }));

  if (!recommend || loading) return null;

  const lastPage = Math.ceil(recommend.length / 10);

  console.log(recommend);
  console.log(lastPage);

  return <Pagination tag={tag} email={email} page={parseInt(page, 10)} lastPage={lastPage} />;
};

export default PaginationContainer2;
