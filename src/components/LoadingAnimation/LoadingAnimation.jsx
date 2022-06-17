import styles from './LoadingAnimation.module.css'

const LoadingAnimation = () => {
  return (
    <div className={styles.loading}>
      <div className={styles['spin-particle']}>
        <div className={`${styles.particle} ${styles.red}`} />
        <div className={`${styles.particle} ${styles.grey} ${styles['other-particle']}`} />
        <div className={`${styles.particle} ${styles.blue} ${styles['other-other-particle']}`} />
      </div>
      <div className={styles['loading-text']}>Loading Data...</div>
    </div>
  )
}

export default LoadingAnimation
