import styles from './Unauthorized.module.css'

export default function Unauthorized() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className="welcome pg-title">Unauthorized</h1>
        <p className="welcome">You are not authorized to access this resource. Please log in as an authorized user.</p>
      </div>
    </div>
  )
}
