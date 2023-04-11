import React from 'react';
import styles from './SingleTabsController.module.css';
// import styled from 'styled-components';
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap';
import GDCValuesTable from '../GDCValuesTable';
import CTDCValuesTable from '../CTDCValuesTable';
import ICDCValuesTable from '../ICDCValuesTable';
import PCDCValuesTable from '../PCDCValuesTable';

// const TabNavsCol = styled(Col)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 2rem;
// `;

// const NavLinkStyled = styled(Nav.Link)`
//   font-family: 'Lato-Regular', sans-serif;
//   font-size: 1.125rem;
//   text-align: center;
//   color: #042A68;
//   padding: 0.6rem 2rem;
//   width: 10rem;
//   inline-size: 10rem;
//   cursor: pointer;

//   &&.active {
//     color: #fff;
//     text-transform: uppercase;
//     background-color: #535F74;
//     padding: 0.7rem 2rem;
//     margin: auto;
//   }
// `;

// const NavStyled = styled(Nav)`
//   border-bottom: none;

//   && ${NavLinkStyled} {
//     border-top-left-radius: 0;
//     border-top-right-radius: 0;
//     border-right: 1px solid #042A68;
//   }

//   && ${NavLinkStyled}.active {
//     border: none;
//   }
// `;

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
