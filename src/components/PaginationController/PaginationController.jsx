import ReactPaginate from 'react-paginate';

const PaginationController = (props) => {
  return (
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
      pageCount={props.pageCount[props.type]}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={props.pageClick}
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      forcePage={props.currentPage[props.type] - 1}
    />
    );
}

export default PaginationController;
