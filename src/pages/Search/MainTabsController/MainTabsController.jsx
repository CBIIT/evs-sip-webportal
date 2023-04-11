import React from 'react'
import styled from 'styled-components'
import styles from './MainTabsController.module.css'
import { Tab, Row, Col, Nav, Container, Alert } from 'react-bootstrap'
import TabsController from '../TabsController/TabsController'
import GraphTabsController from '../GraphTabsController/GraphTabsController'
import SingleTabsController from '../SingleTabsController/SingleTabsController'

const Result = styled.div`
  border-radius: 5px;
  background-color: var(--white);
  padding: 2rem 0;
`

const TabNavsCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const TabNavTextCol = styled(Col)`
  margin: 2rem 0;
`

const TabNavText = styled.h2`
  font-family: 'Raleway-Medium', sans-serif;
  font-size: 1.875rem;
  color: #042a68;
  max-width: 100%;
  text-align: center;
`

const TabNavSpan = styled.span`
  font-family: 'Raleway-ExtraBold', sans-serif;
  border-bottom: 0.375rem solid #397ded;
`

const TabContentStyled = styled(Tab.Content)`
  background-color: #ddeaff;
  border: 2px solid #397ded;
  border-radius: 2rem;
  padding: 1rem;
`

const AlertContainer = styled.div`
  margin-top: 2rem;
`

const Indicator = styled.div`
  && > h2 {
    font-family: 'Raleway-Medium', sans-serif;
    font-size: 1.563rem;
    background-color: #fff;
    padding: 3em 0;
    color: ${(props) => (props.variant === 'error' ? '#bf063b' : '#042A68')};
    max-width: 100%;
    text-align: center;
  }

  && > h2 > span {
    font-family: 'Raleway-ExtraBold', sans-serif;
    border-bottom: 0.25rem solid #397ded;
  }
`

const MainTabsController = (props) => {
  if (
    Object.keys(props.result).length !== 0 &&
    props.result.returnList !== undefined &&
    props.result.returnList.length !== 0
  ) {
    return (
      <Result>
        <Tab.Container id="main-tabs-controller" defaultActiveKey="cross" transition={false}>
          <Container>
            <Row className="clearfix">
              <TabNavTextCol sm={12}>
                <TabNavText>
                  Search Results for <TabNavSpan>{props.searchTerm}</TabNavSpan> in:
                </TabNavText>
                {props.result.total !== undefined && props.result.total >= 50 && (
                  <AlertContainer>
                    <Alert variant="warning">
                      <Alert.Heading>Warning!</Alert.Heading>
                      <p>Your Search term was too general - not all results are displayed.</p>
                      <hr />
                      <p className="mb-0">Please modify your search to narrow the results.</p>
                    </Alert>
                  </AlertContainer>
                )}
              </TabNavTextCol>
              <TabNavsCol sm={12}>
                <Nav className={styles['nav-tabs']} variant="tabs">
                  <Nav.Item className={styles['nav-item']}>
                    <Nav.Link as="button" className={styles['nav-link']} eventKey="cross">
                      Cross Source View
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles['nav-item']}>
                    <Nav.Link as="button" className={styles['nav-link']} eventKey="single">
                      Single Source View
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className={styles['nav-item']}>
                    <Nav.Link as="button" className={styles['nav-link']} eventKey="graph">
                      Graphical View
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </TabNavsCol>
              <Col sm={12}>
                <TabContentStyled>
                  <Tab.Pane unmountOnExit={false} eventKey="cross">
                    <TabsController source={props.result.returnList} />
                  </Tab.Pane>
                  <Tab.Pane unmountOnExit={true} eventKey="single">
                    <SingleTabsController source={props.result.returnList} info={props.result.info} />
                  </Tab.Pane>
                  <Tab.Pane unmountOnExit={true} eventKey="graph">
                    <GraphTabsController keyword={props.searchTerm} source={props.result.returnList} />
                  </Tab.Pane>
                </TabContentStyled>
              </Col>
            </Row>
          </Container>
        </Tab.Container>
      </Result>
    )
  } else if (
    Object.keys(props.result).length !== 0 &&
    props.result.returnList !== undefined &&
    props.result.returnList.length === 0
  ) {
    return (
      <Result>
        <Container>
          <Row className="clearfix">
            <TabNavTextCol sm={12}>
              <Indicator>
                <h2>
                  Sorry, no results found for keyword: <span>{props.searchTerm}</span>
                </h2>
              </Indicator>
            </TabNavTextCol>
          </Row>
        </Container>
      </Result>
    )
  } else if (
    Object.keys(props.result).length !== 0 &&
    props.result.timedOut !== undefined &&
    props.result.timedOut === true
  ) {
    return (
      <Result>
        <Container>
          <Row className="clearfix">
            <TabNavTextCol sm={12}>
              <TabNavText>
                Search Results for <TabNavSpan>{props.searchTerm}</TabNavSpan> in:
              </TabNavText>
              <AlertContainer>
                <Alert variant="danger">
                  <Alert.Heading>Error!</Alert.Heading>
                  <p>
                    Your Search term was too general and has timed out. Please modify your search to narrow the results.
                  </p>
                </Alert>
              </AlertContainer>
            </TabNavTextCol>
          </Row>
        </Container>
      </Result>
    )
  } else if (Object.keys(props.result).length === 0 && props.error !== undefined && props.error === true) {
    return (
      <Result>
        <Container>
          <Row className="clearfix">
            <TabNavTextCol sm={12}>
              <Indicator variant="error">
                <h2>Please, enter a valid keyword!.</h2>
              </Indicator>
            </TabNavTextCol>
          </Row>
        </Container>
      </Result>
    )
  } else {
    return <div></div>
  }
}

export default MainTabsController
