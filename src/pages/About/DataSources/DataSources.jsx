import { Table } from 'react-bootstrap'
import styles from './DataSources.module.css'

const DataSources = () => {
  return (
    <div className={styles.box}>
      <h2 className={styles.title}>Integrated Data Sources</h2>
      <div className={styles.content}>
        <Table className={styles.table} striped>
          <thead>
            <tr>
              <th>Data source</th>
              <th>URL</th>
              <th>Inception Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h3 className={styles['table-th-title']}>
                  Integrated Canine
                  <br />
                  Data Commons
                </h3>
              </td>
              <td>
                <a
                  title="Integrated Canine Data Commons"
                  href="https://caninecommons.cancer.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://caninecommons.cancer.gov
                </a>
              </td>
              <td>November 2020</td>
            </tr>
            <tr>
              <td>
                <h3 className={styles['table-th-title']}>Genomic Data Commons</h3>
              </td>
              <td>
                <a
                  title="Genomic Data Commons"
                  href="https://gdc.cancer.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://gdc.cancer.gov/
                </a>
              </td>
              <td>November 2020</td>
            </tr>
            <tr>
              <td>
                <h3 className={styles['table-th-title']}>
                  Clinical Trials
                  <br />
                  Data Commons
                </h3>
              </td>
              <td>
                <a
                  title="Clinical Trials Data Commons"
                  href="https://trialcommons.cancer.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://trialcommons.cancer.gov
                </a>
                <span className={styles.asterisk}>*</span>
              </td>
              <td>November 2020</td>
            </tr>
            <tr>
              <td>
                <h3 className={styles['table-th-title']}>
                  Pediatric Cancer
                  <br />
                  Data Commons
                </h3>
              </td>
              <td>
                <a
                  title="Clinical Trials Data Commons"
                  href="https://commons.cri.uchicago.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://commons.cri.uchicago.edu/
                </a>
              </td>
              <td>November 2020</td>
            </tr>
          </tbody>
        </Table>
        <div className={styles.indicator}>
          <span className={styles.asterisk}>*</span>
          <span>Accessible within NIH Firewall</span>
        </div>
      </div>
    </div>
  )
}

export default DataSources
