import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Form, Nav, NavDropdown, Row, Button, Col, InputGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select'

import bkgd from '../../assets/img/dash-bkgd.jpg';


const optionsOrganizations = [
  { value: 'nci', label: 'National Cancer Institute (NCI)' },
  { value: 'nih', label: 'National  Institutes of Health (NIH)' }
]


const optionsProjects = [
  { value: 'gdc', label: 'GDC' },
  { value: 'ctdc', label: 'CTDC' },
  { value: 'icdc', label: 'ICDC' },
  { value: 'pcdc', label: 'PCDC' }
]

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
  margin-bottom: 3rem;
`;

const TitleContanier = styled.h1`
  padding: 3rem 2rem 0.5rem 2rem;
`;

const PageTitle = styled.h1`
  font-family: 'Raleway-Medium',sans-serif;
  font-size: 1.625rem;
  color: #35393a;
  font-weight: 500;
  text-transform: uppercase;
  border-bottom: 0.2rem solid #35393a;;
  width: fit-content;
`;

const ContainerStyled = styled(Container)`
  padding: 2rem;
`;


const ButtonStyled = styled(Button)`
  font-size: 0.87rem;
  border-radius: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;

  &&:hover,
  &&:focus {
    background-color: #6fc0d9;
    border-color: #34859d;
  }
`;

const ButtonBlue = styled(ButtonStyled)`
  background-color: #176bd3;
  border-color: #176bd3;
  margin: 1.5rem 0;
  border: 0.375rem double white;

  &&:hover,
  &&:focus {
    background-color: #0b376d;
  }
`;

const FormGroupStyled = styled(Form.Group)`

  ${props => props.required &&`
    && > .form-label:after {
      content:"*";
      color:red;
      padding: 0 0.2rem;
    }
  `}

`;

const FormControlStyled = styled(FormControl)`
  border-radius: 1rem !important;
`;

const FormLabel = styled(Form.Label)`
  font-size: 14px;
  color: #597f8b;
  font-weight: 600;
  padding-left: 0.2rem;
`;



const Dashboard = (props) => {

  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  return <Page>
    <PageContainer>
      <TitleContanier>
        <PageTitle>My Profile</PageTitle>
      </TitleContanier>
      <ContainerStyled>
        <Row>
        <Col sm={6}>
          <p>The EVS-SIP Member Log-in is available only for NIH and ERE Commons team members only</p>
          <Form>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>First Name</FormLabel>
              <FormControlStyled type="text" placeholder="Enter first name" />
            </FormGroupStyled>
            <FormGroupStyled  required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Last Name</FormLabel>
              <FormControlStyled type="text" placeholder="Enter last name" />
            </FormGroupStyled>
            <FormGroupStyled  required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Email Address</FormLabel>
              <FormControlStyled type="email" placeholder="Enter email" />
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Organization(s)</FormLabel>
              <Select 
                defaultValue={[optionsOrganizations[0]]}
                name="organizations"
                isMulti
                options={optionsOrganizations}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Project(s)</FormLabel>
              <Select 
                defaultValue={[optionsProjects[0], optionsProjects[1]]}
                name="organizations"
                isMulti
                options={optionsProjects}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormGroupStyled>
            <ButtonBlue type="submit">
              Update
            </ButtonBlue>
          </Form>
        </Col>
        <Col sm={6}></Col>
        </Row>
      </ContainerStyled>
    </PageContainer>
  </Page>
}

export default Dashboard;
