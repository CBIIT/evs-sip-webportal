import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './PageSizeComponent.module.css'

/**
 * PageSizeComponent - A reusable Pagination select size component.
 * @component
 *
 * @param {Object} props - The properties of the component.
 * @param {string} props.type - The type value, prop or node.
 * @param {object} props.pageSize - The properties of the pageSize
 * @param {number} props.pageCount.values - values
 * @param {number} props.pageCount.props - props
 * @param {number} props.pageCount.nodes - nodes
 * @param {function} props.pageSizeChange - The click event handler.
 *
 * @returns {JSX.Element} The rendered React component.
 */

const PageSizeComponent = ({ type, pageSize, pageSizeChange }) => {
  return (
    <div>
      <Form.Label className={styles.label}>Page Size:</Form.Label>
      <Form.Control
        className={styles.control}
        as="select"
        value={pageSize[type]}
        onChange={pageSizeChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Control>
    </div>
  )
}

// PropTypes for PageSizeComponent
PageSizeComponent.propTypes = {
  type: PropTypes.string.isRequired,
  pageSize: PropTypes.object.isRequired,
  pageSizeChange: PropTypes.func.isRequired,
}

export default PageSizeComponent
