import React from 'react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap';
import CrossValuesTable from './CrossValuesTable';
import PropsTable from './PropsTable';

const TabNavsCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
`;

const StyledNav = styled(Nav)`
margin: 0 0 0 2em;
padding: 0;

& > li {
  position: relative;
  display: block;
  float: left;
}

& > li > a {
  padding: .15em 1em;
  min-width: 12.2em;
  box-shadow: none;
  border: 1px solid #2079bb;
  font-size: 1em;
  position: relative;
  float: left;
  margin: 0 0 0 -1px;
  text-align: center;
  border-radius: 4px;
  margin: 0 0 0 -1px;
  line-height: 2.4rem;
}

& > li.active > a {
  border: 1px solid #2079bb;
  background-color: #2079bb;
  color: #fff;
}

& > li > a:hover {
  border: 1px solid #2079bb;
  background-color: #fff;
}

& > li.active > a:hover {
  border: 1px solid #2079bb;
  background-color: #2079bb;
  color: #fff;
}

& > li > a:focus,
& > li.active > a:focus {
  outline: none;
  border: 1px solid #19659e;
  background-color: #19659e;
  color: #fff;
}

& > li:first-child:not(:last-child) a{
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

& > li:not(:first-child):not(:last-child) a{
  border-radius: 0;
}

& > li:last-child:not(:first-child) a{
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
`;


const NavLinkStyled = styled(Nav.Link)`
  font-family: 'Lato-Regular', sans-serif;
  font-size: 1.125rem;
  text-align: center;
  color: #042A68;
  padding: .2rem 2rem;
  margin: 0.5rem auto;
  inline-size: 14rem;

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

const TabsController = (props) => {
  return (
    <div>
      <Tab.Container id="tabs-controller" defaultActiveKey="values">
        <Container>
          <Row className="clearfix">
            <TabNavsCol sm={12}>
              <NavStyled variant="tabs">
                <Nav.Item>
                  <NavLinkStyled eventKey="values">Values</NavLinkStyled>
                </Nav.Item>
                <Nav.Item>
                  <NavLinkStyled eventKey="properties">Node/Properties</NavLinkStyled>
                </Nav.Item>
              </NavStyled>
            </TabNavsCol>
            <Col sm={12}>
              <Tab.Content transition="false">
                <Tab.Pane unmountOnExit={true} eventKey="values">
                  <CrossValuesTable values={props.source} dataOptions={props.dataOptions}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="properties">
                  <PropsTable properties={props.source}/>
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
