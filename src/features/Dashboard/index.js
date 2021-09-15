import React, { useEffect } from 'react';
import styled from 'styled-components';

import bkgd from '../../assets/img/dash-bkgd.jpg';

import { Container, Row, ListGroup, Col,  Table } from 'react-bootstrap';


const Page = styled.div`
  background-color: #e7edf4;
  overflow: auto;
  padding-bottom: 18rem;
`;

const PageContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  background: #fff url(${bkgd}) no-repeat top right;
  background-size: 680px 125px;
  margin-top: 3rem;
`;

const PageTitle = styled.h1`
  font-family: 'Raleway-Medium',sans-serif;
  font-size: 1.625rem;
  color: #35393a;
  padding: 3rem 0 1rem 2rem;
  font-weight: 500;
  margin-bottom: 0;
  text-transform: uppercase;
  /*border-bottom: 0.1rem solid #09a58a;*/
`;

const ContainerStyled = styled(Container)`
  padding: 2rem;
`;

const ListGroupItemStyled = styled(ListGroup.Item)`
  border-top: 1px solid rgba(0,0,0,.125) !important;
  border-right: solid #176bd3 5px !important;
  margin-bottom: 3px;
`

const SectionContainer =  styled.div`
  padding: 1rem;
  background-color: #f7fbff;
  border: solid #e4e8ed 1px;
`;




const TableStyled = styled(Table)`
  background-color: #fff;
`


const Dashboard = (props) => {

  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  return <Page>
    <PageContainer>
      <PageTitle>My Dashboard</PageTitle>
      <ContainerStyled>
        <Row>
        <Col sm={3}>
        <ListGroup>
          <ListGroupItemStyled>Model Builder</ListGroupItemStyled>
          <ListGroupItemStyled>Publish Data Sources</ListGroupItemStyled>
          <ListGroupItemStyled>Unpublish Data Sources</ListGroupItemStyled>
          <ListGroupItemStyled>Admin</ListGroupItemStyled>
          <ListGroupItemStyled>Sign Out</ListGroupItemStyled>
        </ListGroup>
        </Col>
        <Col sm={9}>
        <SectionContainer>
          <TableStyled bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </TableStyled>
        </SectionContainer>
        </Col>
        </Row>
      </ContainerStyled>
    </PageContainer>
  </Page>
}

export default Dashboard;
