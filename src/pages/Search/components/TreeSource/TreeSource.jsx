import PropTypes from 'prop-types'
import styles from './TreeSource.module.css'
import { AngleDownIcon } from '@/components/ui/icons/Icons'

/**
 * TreeSource component.
 *
 * @component
 * @example
 * Example usage:
 * import TreeSource from './TreeSource';
 * ...
 * <TreeSource category={item.category} node={item.node} property={item.property} />
 *
 * @param {Object} props - React component props.
 * @param {string} [props.category] - category name for the tree.
 * @param {string} [props.node] - node name for the tree.
 * @param {string} [props.property] - property name for the tree.
 * @returns {JSX.Element} Rendered TreeSource component.
 */

const TreeSource = ({ category='category', node='node', property }) => {
  return (
    <>
      {category}
      <ul className={styles['table-ul']}>
        <li className={styles['table-li']}>
          <span className={styles['span-icon']}>
            <AngleDownIcon />
          </span>
          {node}
          {property !== undefined && (
            <ul className={styles['table-ul']}>
              <li className={styles['table-li']}>
                <span className={styles['span-icon']}>
                  <AngleDownIcon />
                </span>
                {property}
              </li>
            </ul>
          )}
        </li>
      </ul>
    </>
  )
}

// PropTypes for TreeSource
TreeSource.propTypes = {
  category: PropTypes.string,
  node: PropTypes.string,
  property: PropTypes.string,
}

export default TreeSource
