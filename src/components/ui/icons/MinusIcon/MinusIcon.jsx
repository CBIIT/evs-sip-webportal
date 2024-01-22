import styles from '../Icons.module.css'

const MinusIcon = () => {
  return (
    <svg
      className={styles.icon}
      aria-hidden="true"
      focusable="false"
      data-icon="minus"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path
        fill="currentColor"
        d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      ></path>
    </svg>
  )
}

export default MinusIcon
