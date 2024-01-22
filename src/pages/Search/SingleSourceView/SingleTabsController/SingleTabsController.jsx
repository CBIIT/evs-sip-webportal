import styles from './SingleTabsController.module.css';
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap';
import GDCValuesTable from '../SingleValuesTable/GDCValuesTable';
import CTDCValuesTable from '../SingleValuesTable/CTDCValuesTable';
import ICDCValuesTable from '../SingleValuesTable/ICDCValuesTable';
import PCDCValuesTable from '../SingleValuesTable/PCDCValuesTable';

const SingleTabsController = (props) => {
  return (
    <div>
      <Tab.Container id="graph-tabs-controller" defaultActiveKey="gdc">
        <Container>
          <Row className="clearfix">
            <Col sm={12}>
              <div className={styles['nav-container']}>
                <Nav className={styles['nav-tabs']} variant="tabs">
                  <Nav.Item>
                    <Nav.Link as="button" className={styles['nav-link']} eventKey="gdc">GDC</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as="button" className={styles['nav-link']} eventKey="ctdc">CTDC</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as="button" className={styles['nav-link']} eventKey="icdc">ICDC</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as="button" className={styles['nav-link']} eventKey="pcdc">PCDC</Nav.Link>
                  </Nav.Item>
                </Nav>
            </div>
            </Col>
            <Col sm={12}>
              <Tab.Content transition="false">
                <Tab.Pane unmountOnExit={true} eventKey="gdc">
                  <GDCValuesTable values={props.source}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="ctdc">
                  <CTDCValuesTable values={props.source}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="icdc">
                  <ICDCValuesTable values={props.source}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="pcdc">
                  <PCDCValuesTable values={props.source} info={props.info}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </div>
  );
};

export default SingleTabsController;
