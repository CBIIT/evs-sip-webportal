import styles from './TermValue.module.css'
import { Row, Col } from 'react-bootstrap'
import TableSynonyms from '../TableSynonyms/TableSynonyms'

const TermValue = ({ type, term }) => {
  if (term?.length !== 0) {
    let code
    let synonyms
    if (type === 'ncit') {
      code = term.n_c
      synonyms = term.s
    }
    if (type === 'icdo3') {
      code = term.c
      synonyms = term.syns
    }

    return (
      <div data-tag="ncit-value-container">
        <Row>
          <Col className={styles['table-col']} xs={12}>
            <div className={styles['term-title']}>
              {type === 'ncit' && (
                <>
                  <b>NCI Thesaurus Code: </b>
                  <a
                    href={
                      'https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=' +
                      term.n_c.replace(/<b>/g, '').replace(/<\/b>/g, '')
                    }
                    rel="noopener noreferrer"
                    target="_blank"
                    dangerouslySetInnerHTML={{ __html: code }}
                  ></a>
                </>
              )}
              {type === 'icdo3' && (
                <>
                  <b>ICD-O-3 Code: </b>
                  <span dangerouslySetInnerHTML={{ __html: code }}></span>
                </>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col className={styles['table-col']} xs={12}>
            <TableSynonyms type={type} synonyms={synonyms} />
          </Col>
        </Row>
      </div>
    )
  }
  return null
}

export default TermValue
