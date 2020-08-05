import React from 'react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap';
import ValuesTable from './ValuesTable';
import PropsTable from './PropsTable';
import DictTable from './DictTable';

const Result = styled.div`
  display: 'none'
  border: 1px solid #dce4ec;
  border-radius: 5px;
  background-color: #fff;
`;

const TabNavsCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0;
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

const TabsController = (props) => {
  return (
    <Result>
      <Tab.Container id="tabs-controller" defaultActiveKey="values">
        <Container>
          <Row className="clearfix">
            <TabNavsCol sm={12}>
              <StyledNav variant="tabs">
                <Nav.Item>
                  <Nav.Link eventKey="values">Values</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="properties">Properties</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="dictionary">Dictionary</Nav.Link>
                </Nav.Item>
              </StyledNav>
            </TabNavsCol>
            <Col sm={12}>
              <Tab.Content transition="false">
                <Tab.Pane unmountOnExit={true} eventKey="values">
                  <ValuesTable values={props.source}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="properties">
                  <PropsTable properties={props.source}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="dictionary">
                  <DictTable dictionary={props.source}/>
                </Tab.Pane>
              </Tab.Content>

            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </Result>
  );
};

export default TabsController;
