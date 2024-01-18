import styles from '../Icons.module.css'

const CircleIcon = (props) => {
  return (
    <svg
      className={`${styles.icon} ${props.className}`}
      aria-hidden="true"
      focusable="false"
      data-icon="circle"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"></path>
    </svg>
  )
}

export default CircleIcon
