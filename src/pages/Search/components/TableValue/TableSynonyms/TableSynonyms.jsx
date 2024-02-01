import styles from './TableSynonyms.module.css'
import { Table } from 'react-bootstrap'

const TableNCItSynonyms = ({ type, synonyms }) => {
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
        {synonyms?.length !== 0 &&
          type == 'ncit' &&
          synonyms.map((item, index) => (
            <tr key={index}>
              <td dangerouslySetInnerHTML={{ __html: item.termName }}></td>
              <td>{item.termSource}</td>
              <td>{item.termGroup}</td>
            </tr>
          ))}
        {synonyms?.length !== 0 &&
          type == 'icdo3' &&
          synonyms.map((item, index) => (
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

export default TableNCItSynonyms
