import styles from './NCItValue.module.css'
import { Row, Col } from 'react-bootstrap'
import TableNCItSynonyms from '../TableNCItSynonyms/TableNCItSynonyms'

const NCItValue = ({ nciTerm }) => {
  if (nciTerm?.length !== 0) {
    return (
      <div data-tag="ncit-value-container">
        <Row>
          <Col className={styles['table-col']} xs={12}>
            <div className={styles['term-title']}>
              <b>NCI Thesaurus Code: </b>
              <a
                href={
                  'https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=' +
                  nciTerm.n_c.replace(/<b>/g, '').replace(/<\/b>/g, '')
                }
                rel="noopener noreferrer"
                target="_blank"
                dangerouslySetInnerHTML={{ __html: nciTerm.n_c }}
              ></a>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles['table-col']} xs={12}>
            <TableNCItSynonyms ncitSynonyms={nciTerm.s} />
          </Col>
        </Row>
      </div>
    )
  }
  return null
}

export default NCItValue
