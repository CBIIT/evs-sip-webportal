import { Button as BsButton } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './Button.module.css'

/**
 * Button component with customizable styling.
 *
 * @component
 * @example
 * Example usage:
 * import Button from './Button';
 * ...
 * <Button className="custom-class" variant="secondary" onClick={() => console.log('Button clicked')}>Click me</Button>
 *
 * @param {Object} props - React component props.
 * @param {string} [props.className] - Additional class names for the button.
 * @param {string} [props.variant='primary'] - Bootstrap variant for the button.
 * @param {Function} [props.onClick] - Click event handler for the button.
 * @param {ReactNode} props.children - Content to be rendered inside the button.
 * @returns {JSX.Element} Rendered Button component.
 */

const Button = ({ className, variant = 'primary', children, onClick }) => {
  // Combining class names
  const classNames = [styles.button, className || ''].join(' ')

  return (
    <BsButton className={classNames} variant={variant} onClick={onClick}>
      {children}
    </BsButton>
  )
}

// PropTypes for Button
Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
}

export default Button
