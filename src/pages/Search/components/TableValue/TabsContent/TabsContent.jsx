import styles from './TabsContent.module.css'
import { Row, Col, Tab, Nav } from 'react-bootstrap'
import TermValue from '../TermValue/TermValue'

const TabsContent = ({ nciTerms, icdo3Term }) => {
  if (nciTerms !== undefined || icdo3Term !== undefined) {
    return (
      <Tab.Container
        id="tabs-controller"
        defaultActiveKey={
          icdo3Term !== undefined ? icdo3Term.id : nciTerms[0].id
        }
      >
        <Row className="clearfix">
          <Col className={styles.col} sm={12}>
            <Nav variant="tabs">
              {icdo3Term !== undefined && (
                <Nav.Item>
                  <Nav.Link
                    eventKey={icdo3Term.id}
                    dangerouslySetInnerHTML={{
                      __html: icdo3Term.c + ' (ICD-O-3)',
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
              {icdo3Term !== undefined && (
                <Tab.Pane eventKey={icdo3Term.id}>
                  <TermValue type="icdo3" term={icdo3Term} />
                </Tab.Pane>
              )}
              {nciTerms?.length !== 0 &&
                nciTerms.map((nciTerm, index) => (
                  <Tab.Pane key={index} eventKey={nciTerm.id}>
                    <TermValue type="ncit" term={nciTerm} />
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
