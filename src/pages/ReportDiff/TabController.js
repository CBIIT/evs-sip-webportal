import React from 'react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap';
import TableDiff from './TableDiff';

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
  padding: 0.7rem 2rem;
  margin: auto;
  width: 10rem;
  inline-size: 10rem; 

  &&.active {
    color: #fff;
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

const TabsController = (props) => {
  return (
    <div>
      <Tab.Container 
        id="tabs-controller" 
        defaultActiveKey="all"
        activeKey={props.type}
        onSelect={props.selectTab}>
        <Container>
          <Row className="clearfix">
            <TabNavsCol sm={12}>
              <NavStyled variant="tabs">
                <Nav.Item>
                  <NavLinkStyled eventKey="all">All</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="unmapped">Unmapped</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="mapped">Mapped</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="conflict">Conflict</NavLinkStyled>
                </Nav.Item>
              </NavStyled>
            </TabNavsCol>
            <Col sm={12}>
              <Tab.Content transition="false" style={{"fontSize": "1rem"}}>
                <Tab.Pane unmountOnExit={true} eventKey="all">
                  <TableDiff result={props.result}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="unmapped">
                  <TableDiff result={props.result}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="mapped">
                  <TableDiff result={props.result}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="conflict">
                  <TableDiff result={props.result}/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </div>
  );
};

export default TabsController;
