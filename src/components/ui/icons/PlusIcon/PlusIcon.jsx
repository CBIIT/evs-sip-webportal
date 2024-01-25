import styles from '../Icons.module.css'
import PropTypes from 'prop-types'

/**
 * PlusIcon component with customizable styling.
 *
 * @component
 * @example
 * Example usage:
 * import { PlusIcon } from './Icons';
 * ...
 * <PlusIcon className="custom-class" />
 *
 * @param {string} [props.className] - Additional class names for the svg icon.
 * @returns {JSX.Element} Rendered PlusIcon component.
 */

const PlusIcon = ({ className }) => {
  // Combining class names
  const classNames = [styles.icon, className || ''].join(' ')

  return (
    <svg
      className={classNames}
      aria-hidden="true"
      focusable="false"
      data-icon="plus"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      ></path>
    </svg>
  )
}

// PropTypes for PlusIcon
PlusIcon.propTypes = {
  className: PropTypes.string,
}

export default PlusIcon
