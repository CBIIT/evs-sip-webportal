import ReactPaginate from 'react-paginate'
import PropTypes from 'prop-types'

/**
 * PaginationController - A reusable Pagination component.
 * @component
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.type - The type value, prop or node.
 * @param {object} props.pageCount - The properties of the pageCount
 * @param {number} props.pageCount.values - values
 * @param {number} props.pageCount.props - props
 * @param {number} props.pageCount.nodes - nodes
 * @param {object} props.currentPage - The properties of the currentPage
 * @param {number} props.currentPage.values - values
 * @param {number} props.currentPage.props - props
 * @param {number} props.currentPage.nodes - nodes
 * @param {function} props.pageClick - The click event handler.
 *
 * @returns {JSX.Element} The rendered React component.
 */

const PaginationController = ({ type, pageCount, currentPage, pageClick }) => {
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
      pageCount={pageCount[type]}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={pageClick}
      containerClassName={'pagination'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
      forcePage={currentPage[type] - 1}
    />
  )
}

// PropTypes for PaginationController
PaginationController.propTypes = {
  type: PropTypes.string.isRequired,
  pageCount: PropTypes.shape({
    values: PropTypes.number.isRequired,
    props: PropTypes.number.isRequired,
    nodes: PropTypes.number.isRequired,
  }).isRequired,
  currentPage: PropTypes.shape({
    values: PropTypes.number.isRequired,
    props: PropTypes.number.isRequired,
    nodes: PropTypes.number.isRequired,
  }).isRequired,
  pageClick: PropTypes.func.isRequired,
}

export default PaginationController
