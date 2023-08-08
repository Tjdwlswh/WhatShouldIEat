import React, { useState } from 'react';
import styled from 'styled-components';
import Pagination from 'react-js-pagination';
import palette from '../../lib/styles/palette';
/*
  호출하는 곳에서 
  const [page, setPage] = useState(1);
  매개변수로 호출
 */
const PaginationWrapper = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      width: 30px;
      height: 30px;
      border: 1px solid ${palette.gray[4]};
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1rem;

      &:first-child {
        border-radius: 5px 0 0 5px;
      }

      &:last-child {
        border-radius: 0 5px 5px 0;
      }

      a {
        text-decoration: none;
        color: #337ab7;
        font-size: 1rem;

        &:hover,
        &.active {
          color: ${palette.accent};
        }
      }

      &.active {
        background-color: ${palette.accent};
        a {
          color: white;
        }
      }
    }
  }

  .page-selection {
    width: 48px;
    height: 30px;
    color: #337ab7;
  }
`;

const PaginationBox = ({ page, setPage, totalItemsCount }) => {
  const handlePageChange = page => {
    setPage(page);
  };

  return (
    <PaginationWrapper>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={totalItemsCount}
        hideDisabled={true}
        onChange={handlePageChange}
      />
    </PaginationWrapper>
  );
};
export default PaginationBox;
