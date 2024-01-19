import styles from './GDCModel.module.css'
import GraphicalView from '../../../components/GraphicalView'

const GDCModel = () => {
  return (
    <div className={styles.content}>
      <div className={styles.textbox}>
        <h2>Graph Representation of the GDC Data Model</h2>
        <p>
          The GDC data model is represented as a graph with nodes and edges, and
          this graph is the store of record for the GDC. It maintains the
          critical relationship between projects, cases, clinical data and
          molecular data and insures that this data is linked correctly to the
          actual data file objects themselves, by means of unique identifiers.
          The graph is designed in terms of the &quot;property graph&quot;
          model, in which nodes represent entities, edges between nodes
          represent relationships between entities, and properties on both nodes
          and edges represent additional data which describe entities and their
          relationships. Relationships are encoded as edges of a given type
          which associate exactly two nodes. Properties of nodes or
          relationships are sets of key-value pairs.
        </p>
        <p>
          Original metadata as submitted by external users is extracted and
          loaded first into the graph. Representations of the data provided by
          the other GDC components are derived from the authoritative graph
          model. Note that file and archive objects are not stored in the graph,
          but rather in an external object store. The node/edge structure of the
          graph is depicted below.
        </p>
      </div>
      <hr className={styles.hr} />
      <h2 className={styles.title}>The GDC Data Model</h2>
      <div className={styles['graph-content']}>
        <GraphicalView type="gdc_readonly" />
      </div>
    </div>
  )
}

export default GDCModel
