import styles from './ICDO3Value.module.css'
import { Row, Col } from 'react-bootstrap'
import TableICDO3Synonyms from '../TableICDO3Synonyms/TableICDO3Synonyms'

const ICDO3Value = ({ icdo3Code, icdo3Synonyms }) => {
  if (icdo3Synonyms !== undefined) {
    return (
      <div className="icdo3-value-container">
        <Row>
          <Col className={styles['table-col']} xs={12}>
            <b>ICD-O-3 Code: </b>
            <span dangerouslySetInnerHTML={{ __html: icdo3Code.c }}></span>
          </Col>
        </Row>
        <Row>
          <Col className={styles['table-col']} xs={12}>
            <TableICDO3Synonyms icdo3Synonyms={icdo3Synonyms} />
          </Col>
        </Row>
      </div>
    )
  }
  return null
}

export default ICDO3Value
