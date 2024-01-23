import styles from './ReportDiff.module.css'
import ContentDiff from './ContentDiff/ContentDiff'

const ReportDiff = () => {
  return (
    <div className={styles.page}>
      <div className={styles['page-container']}>
        <ContentDiff />
      </div>
    </div>
  )
}

export default ReportDiff
