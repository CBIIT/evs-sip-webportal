import React from 'react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap';
import GDC_Graph from './GraphicalView_D3';

const TabNavsCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const NavLinkStyled = styled(Nav.Link)`
  font-family: 'Lato-Regular', sans-serif;
  font-size: 1.125rem;
  text-align: center;
  color: #042A68;
  padding: .2rem 2rem;
  margin: 0.5rem auto;
  inline-size: 10rem;

  &&.active {
    color: #fff;
    text-transform: uppercase;
    background-color: #535F74;
    padding: 0.7rem 2rem;
    margin: auto;
  }
`;

const NavStyled = styled(Nav)`
  border-bottom: none;

  && ${NavLinkStyled} {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-right: 1px solid #042A68;
  }

  && ${NavLinkStyled}.active {
    border: none;
  }
`;

const GraphTabsController = (props) => {
  return (
    <div>
      <Tab.Container id="graph-tabs-controller" defaultActiveKey="gdc">
        <Container style={{"minWidth": "100%"}}>
          <Row className="clearfix">
            <TabNavsCol sm={12}>
              <NavStyled variant="tabs">
                <Nav.Item>
                  <NavLinkStyled eventKey="gdc">GDC</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="pdc">PDC</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="icdc">ICDC</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="ctcd">CTDC</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="idc">IDC</NavLinkStyled>
                </Nav.Item>
              </NavStyled>
            </TabNavsCol>
            <Col sm={12}>
              <Tab.Content transition="false" style={{"fontSize": "1rem","backgroundColor": "var(--white)","borderRadius": "1rem","border": "2px solid #535F74"}}>
                <Tab.Pane unmountOnExit={true} eventKey="gdc">
                  <GDC_Graph />
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="pdc">
                  PDC content
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="icdc">
                  ICDC content
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="ctcd">
                  CTDC content
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="idc">
                  IDC content
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </div>
  );
};

export default GraphTabsController;
