import styles from './TableNCItSynonyms.module.css'
import { Table } from 'react-bootstrap'

const TableNCItSynonyms = ({ ncitSynonyms }) => {
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
        {ncitSynonyms?.length !== 0 &&
          ncitSynonyms.map((item, index) => (
            <tr key={index}>
              <td dangerouslySetInnerHTML={{ __html: item.termName }}></td>
              <td>{item.termSource}</td>
              <td>{item.termGroup}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default TableNCItSynonyms
