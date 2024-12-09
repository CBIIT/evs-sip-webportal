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
              <td dangerouslySetInnerHTML={{ __html: item.name }}></td>
              <td>{item.source}</td>
              <td>{item.termType}</td>
            </tr>
          ))}
        {synonyms?.length !== 0 &&
          type == 'icdo3' &&
          synonyms.map((item, index) => (
            <tr key={index}>
              <td>{item.icdo3_synonym}</td>
              <td>(ICD-O-3)</td>
              <td>{item.term_type}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default TableNCItSynonyms
