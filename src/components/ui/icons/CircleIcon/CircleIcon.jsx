import styles from '../Icons.module.css'
import PropTypes from 'prop-types'

/**
 * CircleIcon component with customizable styling.
 *
 * @component
 * @example
 * Example usage:
 * import { CircleIcon } from './Icons';
 * ...
 * <CircleIcon className="custom-class" />
 *
 * @param {string} [props.className] - Additional class names for the svg icon.
 * @returns {JSX.Element} Rendered CircleIcon component.
 */

const CircleIcon = ({ className }) => {
  // Combining class names
  const classNames = [styles.icon, className || ''].join(' ')

  return (
    <svg
      className={classNames}
      aria-hidden="true"
      focusable="false"
      data-icon="circle"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
      ></path>
    </svg>
  )
}

// PropTypes for CircleIcon
CircleIcon.propTypes = {
  className: PropTypes.string,
}

export default CircleIcon
