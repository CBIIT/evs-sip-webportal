import styles from './Unauthorized.module.css'

/**
 * Unauthorized - A Unauthorized View component after deny access.
 * @component
 *
 * @returns {JSX.Element} The rendered Unauthorized component.
 */

const Unauthorized = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>Unauthorized</h1>
        <p>
          You are not authorized to access this resource. Please log in as an
          authorized user.
        </p>
      </div>
    </div>
  )
}

export default Unauthorized
