import React from 'react';
import styled from 'styled-components';
import { Tab, Row, Col, Nav, Container } from 'react-bootstrap';
import TabsController from './TabsController';
import ValuesTable from './ValuesTable';


const Result = styled.div`
  display: 'none';
  border: 1px solid #dce4ec;
  border-radius: 5px;
  background-color: #fff;
  padding: 2rem 0;
`;

const TabNavsCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabNavTextCol= styled(Col)`
  margin: 3rem 0;
`;

const TabNavText = styled.h3`
  font-family: 'Raleway-Medium', sans-serif;
  font-size: 1.875rem;
  color: #042A68;
  max-width: 100%;
  text-align: center;
`;

const TabNavSpan = styled.span`
  font-family: 'Raleway-ExtraBold', sans-serif;
  border-bottom: 0.375rem solid #397DED;
  line-height: 0.85;
`;

const TabContentStyled = styled(Tab.Content)`
  background-color: #DDEAFF;
  border: 2px solid #397DED;
  border-radius: 2rem;
  padding: 1rem;
`;

const NavItemStyled = styled(Nav.Item)`
  position: relative;
  display: block;
  float: left;
`;

const NavLinkStyled = styled(Nav.Link)`
  font-family: 'Raleway-Medium', sans-serif;
  font-size: 1.125rem;
  color: #042A68;
  width: 18rem;
  text-transform: uppercase;
  background-color: #EBEBEB;
  padding: .7rem 1rem;
  text-align: center;
  margin: 0 0.0625rem;

  &&.active {
    font-family: 'Raleway-Bold',sans-serif;
    font-size: 1.3125rem;
    background-color: #DDEAFF;
    color: #042A68;
    padding: 1rem 1.5rem;
  }
`;

const NavStyled = styled(Nav)`
border-bottom: none;

&& ${NavLinkStyled} {
  border: 0.5rem solid var(--white);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

&& ${NavLinkStyled}.active {
  border-top: 2px solid #397DED;
  border-left: 2px solid #397DED;
  border-right: 2px solid #397DED;
  border-bottom: 0;
  position: relative;
  bottom: -1px;
  z-index: 10;
  padding-bottom: 1.1rem;
}
`;

const MainTabsController = (props) => {
  return (
    <Result style={props.source.length !== 0 ? { display: 'block' } : { display: 'none' }}>
      <Tab.Container id="tabs-controller" defaultActiveKey="cross">
        <Container>
          <Row className="clearfix">
            <TabNavTextCol sm={12}>
              <TabNavText>Search Results for <TabNavSpan>{props.keyword}</TabNavSpan> in:</TabNavText>
            </TabNavTextCol>
            <TabNavsCol sm={12}>
              <NavStyled variant="tabs">
                <NavItemStyled>
                  <NavLinkStyled eventKey="cross">Cross Source View</NavLinkStyled>
                </NavItemStyled>
                <NavItemStyled>
                  <NavLinkStyled eventKey="single">Single Source View</NavLinkStyled>
                </NavItemStyled>
                <NavItemStyled>
                  <NavLinkStyled eventKey="graph">Graphical View</NavLinkStyled>
                </NavItemStyled>
              </NavStyled>
            </TabNavsCol>
            <Col sm={12}>
              <TabContentStyled transition="false">
                <Tab.Pane unmountOnExit={true} eventKey="cross">
                  <TabsController source={props.source}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="single">
                  <ValuesTable values={props.source}/>
                </Tab.Pane>
                <Tab.Pane unmountOnExit={true} eventKey="graph">
                  Graph
                </Tab.Pane>
              </TabContentStyled>

            </Col>
          </Row>
        </Container>
      </Tab.Container>
    </Result>
  );
};

export default MainTabsController;
