import styles from './TabsController.module.css'
import PropTypes from 'prop-types'
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap'
import GDCModel from '../GDCModel/GDCModel'
import CTDCModel from '../CTDCModel/CTDCModel'
import ICDCModel from '../ICDCModel/ICDCModel'
import PCDCModel from '../PCDCModel/PCDCModel'

const TabsController = (props) => {
  const selectHandler = (k) => {
    props.setDataModel(k)
  }

  return (
    <>
      <Tab.Container
        id="tabs-controller"
        defaultActiveKey="gdc"
        activeKey={props.dataModel}
        onSelect={selectHandler}
      >
        <Container>
          <Row className="clearfix">
            <Col sm={12}>
              <div className={styles['nav-container']}>
                <Nav className={styles['nav-tabs']} variant="tabs">
                  <Nav.Item className={styles['nav-item']}>
                    <Nav.Link
                      as="button"
                      className={styles['nav-link']}
                      eventKey="pcdc"
                    >
                      <span className={styles['nav-span']}>
                        Pediatric Cancer <br />
                        Data Commons
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles['nav-item']}>
                    <Nav.Link
                      as="button"
                      className={styles['nav-link']}
                      eventKey="icdc"
                    >
                      <span className={styles['nav-span']}>
                        Integrated Canine <br />
                        Data Commons
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles['nav-item']}>
                    <Nav.Link
                      as="button"
                      className={styles['nav-link']}
                      eventKey="ctdc"
                    >
                      <span className={styles['nav-span']}>
                        Clinical Trial <br />
                        Data Commons
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles['nav-item']}>
                    <Nav.Link
                      as="button"
                      className={styles['nav-link']}
                      eventKey="gdc"
                    >
                      <span className={styles['nav-span']}>
                        Genomic <br />
                        Data Commons
                      </span>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Col>
            <Col sm={12}>
              <div className={styles['tab-container']}>
                <Tab.Content transition="false">
                  <Tab.Pane unmountOnExit={true} eventKey="gdc">
                    <GDCModel />
                  </Tab.Pane>
                  <Tab.Pane unmountOnExit={true} eventKey="ctdc">
                    <CTDCModel />
                  </Tab.Pane>
                  <Tab.Pane unmountOnExit={true} eventKey="icdc">
                    <ICDCModel />
                  </Tab.Pane>
                  <Tab.Pane unmountOnExit={true} eventKey="pcdc">
                    <PCDCModel />
                  </Tab.Pane>
                </Tab.Content>
              </div>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </>
  )
}

TabsController.propTypes = {
  dataModel: PropTypes.string,
  setDataModel: PropTypes.func.isRequired,
}

export default TabsController
