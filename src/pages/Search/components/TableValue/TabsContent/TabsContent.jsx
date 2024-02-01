import styles from './TabsContent.module.css'
import { Row, Col, Tab, Nav } from 'react-bootstrap'
import NCItValue from '../NCItValue/NCItValue'
import ICDO3Value from '../ICDO3Value/ICDO3Value'

const TabsContent = ({ nciTerms, icdo3Code, icdo3Synonyms }) => {
  if (nciTerms !== undefined || icdo3Synonyms !== undefined) {
    return (
      <Tab.Container
        id="tabs-controller"
        defaultActiveKey={
          icdo3Synonyms !== undefined ? icdo3Code.id : nciTerms[0].id
        }
      >
        <Row className="clearfix">
          <Col className={styles.col} sm={12}>
            <Nav variant="tabs">
              {icdo3Synonyms !== undefined && (
                <Nav.Item>
                  <Nav.Link
                    eventKey={icdo3Code.id}
                    dangerouslySetInnerHTML={{
                      __html: icdo3Code.c + ' (ICD-O-3)',
                    }}
                  ></Nav.Link>
                </Nav.Item>
              )}
              {nciTerms?.length !== 0 &&
                nciTerms.map((syn, index) => (
                  <Nav.Item>
                    <Nav.Link
                      key={index}
                      eventKey={syn.id}
                      dangerouslySetInnerHTML={{
                        __html: syn.n_c + ' (NCIt)',
                      }}
                    ></Nav.Link>
                  </Nav.Item>
                ))}
            </Nav>
          </Col>
          <Col sm={12}>
            <Tab.Content transition="false">
              {icdo3Synonyms !== undefined && (
                <Tab.Pane eventKey={icdo3Code.id}>
                  <ICDO3Value
                    icdo3Code={icdo3Code}
                    icdo3Synonyms={icdo3Synonyms}
                  />
                </Tab.Pane>
              )}
              {nciTerms?.length !== 0 &&
                nciTerms.map((nciTerm, index) => (
                  <Tab.Pane key={index} eventKey={nciTerm.id}>
                    <NCItValue nciTerm={nciTerm} />
                  </Tab.Pane>
                ))}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    )
  }
  return null
}

export default TabsContent
