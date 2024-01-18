import styles from './PCDCModel.module.css'
import GraphicalView from '../../../components/GraphicalView'

const PCDCModel = () => {
  return (
    <div className={styles.content}>
      <div className={styles.textbox}>
        <h2>Graph Representation of the PCDC Data Model</h2>

        <p>
          The Pediatric Cancer Data Commons (PCDC) works with leaders in pediatric cancers to develop and apply uniform
          clinical data standards and facilitate the collection and linkage of data from many different sources and
          types. Using technology to address inefficiencies in clinical research operations and data aggregation and
          analysis, PCDC works to ensure that patients, physicians, and researchers have the best clinical research
          tools at their disposal.
        </p>
      </div>
      <hr className={styles.hr} />
      <h2 className={styles.title}>The PCDC Data Model</h2>
      <div className={styles['graph-content']}>
        <GraphicalView type="pcdc_readonly" />
      </div>
    </div>
  )
}

export default PCDCModel
