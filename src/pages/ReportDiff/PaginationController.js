import React from 'react';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TableDiff = (props) => {

  return (<PaginationContainer>
    <ReactPaginate
      previousLabel={'«'}
      prevClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextLabel={'»'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakLabel={'...'}
      breakClassName={'page-item break-me'}
      breakLinkClassName={'page-link'}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.pageClick}
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  </PaginationContainer>);
}

export default TableDiff;
