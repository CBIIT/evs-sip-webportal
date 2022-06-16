import { Link } from 'react-router-dom'
import styles from './NotFound.module.css'

const NotResult = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <h2 className={styles.subtitle}>Page not found</h2>
          <Link to="/" aria-label="back to home">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotResult
