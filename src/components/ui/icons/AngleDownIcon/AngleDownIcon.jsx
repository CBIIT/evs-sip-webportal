import styles from '../Icons.module.css'
import PropTypes from 'prop-types'

/**
 * AngleDownIcon component with customizable styling.
 *
 * @component
 * @example
 * Example usage:
 * import { AngleDownIcon } from './Icons';
 * ...
 * <AngleDownIcon className="custom-class" />
 *
 * @param {string} [props.className] - Additional class names for the svg icon.
 * @returns {JSX.Element} Rendered AngleDownIcon component.
 */

const AngleDownIcon = ({ className }) => {
  // Combining class names
  const classNames = [styles.icon, className || ''].join(' ')

  return (
    <svg
      className={classNames}
      aria-hidden="true"
      focusable="false"
      data-icon="angle-down"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z"
      ></path>
    </svg>
  )
}

// PropTypes for AngleDownIcon
AngleDownIcon.propTypes = {
  className: PropTypes.string,
}

export default AngleDownIcon
