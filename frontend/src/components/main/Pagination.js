import styled from 'styled-components';
import qs from 'qs';
import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
const PageNumber = styled.div``;

const buildLink = ({ email, tag, page }) => {
  const query = qs.stringify({ tag, page });
  return email ? `/${email}?${query}` : `/recipes/?${query}`;
};

const Pagination = ({ page, lastPage, email, tag }) => {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={page === 1 ? undefined : buildLink({ email, tag, page: page - 1 })}
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={page === lastPage ? undefined : buildLink({ email, tag, page: page + 1 })}
      >
        다음
      </Button>
    </PaginationBlock>
  );
};

export default Pagination;
