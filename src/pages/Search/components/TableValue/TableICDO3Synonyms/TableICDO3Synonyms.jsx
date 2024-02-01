import styles from './TableICDO3Synonyms.module.css'
import { Table } from 'react-bootstrap'

const TableICDO3Synonyms = ({ icdo3Synonyms }) => {
  return (
    <Table className={styles.table} striped bordered condensed="true" hover>
      <thead>
        <tr>
          <th>Term</th>
          <th>Source</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {icdo3Synonyms?.length !== 0 &&
          icdo3Synonyms.map((item, index) => (
            <tr key={index}>
              <td>{item.n}</td>
              <td>(ICD-O-3)</td>
              <td>{item.t}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default TableICDO3Synonyms
