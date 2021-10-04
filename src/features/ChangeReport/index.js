import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Nav, NavDropdown, Row, Button, Col, Table, Pagination, InputGroup, FormControl, Tabs, Tab} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

import bkgd from '../../assets/img/dash-bkgd.jpg';

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

// const ListGroupItemStyled = styled(ListGroup.Item)`
//   border-top: 1px solid rgba(0,0,0,.125) !important;
//   border-right: solid #176bd3 5px !important;
//   margin-bottom: 3px;
// `;

const SectionHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const SectionContainer =  styled.div`
  padding: 1rem;
  background-color: #f7fbff;
  border: solid #e4e8ed 1px;
`;

const TableContainer = styled.div`
  background-color: #fff;
  padding: 1rem;
  border: solid #e4e8ed 1px;
`;

// const TableStyled = styled(Table)`
//   background-color: #fff;
// `;

const SectionTitle =  styled.h2`
  font-family: 'Raleway-Medium',sans-serif;
  font-weight: 500;
  color: #042a68;
  width: fit-content;
`;

const PaginationContainer =  styled.div`
  width: 100%;
  display: flex;
  justify-content: right;

  && > .pagination {
    margin-bottom: 0; 
  }
`;

const ButtonStyled = styled(Button)`
  font-size: 0.87rem;
  border-radius: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;

  &&:hover,
  &&:focus {
    background-color: #6fc0d9;
    border-color: #34859d;
  }
`;

const ButtonGreen = styled(ButtonStyled)`
  background-color: #00e097;
  border-color: #0a8867;

  &&:hover,
  &&:focus {
    background-color: #00a770;
  }
`;

const InputGroupStyled = styled(InputGroup)`
  margin-bottom: 1rem;
  max-width: 20rem;
`;

const InputGroupTextStyled = styled(InputGroup.Text)`
    position: relative;
    left: -2.5rem;
    z-index: 3;
    background-color: transparent;
    border: none;

    &&>.form-control {
      border-radius: .25rem;
    }
`;

const FormControlStyled = styled(FormControl)`
  border-radius: 1rem !important;
  padding-right: 2rem;
`;

const NavLinkStyled = styled(Nav.Link)`
  padding: .75rem 1.25rem;
  border: 1px solid rgba(0,0,0,.125);
  border-right: solid #176bd3 5px;
  margin-bottom: 3px;
  color: var(--black);
`;

const NavDropdownStyled = styled(NavDropdown)`
  margin-bottom: 3px;

  && > .dropdown-toggle {
    padding: .75rem 1.25rem;
    border: 1px solid rgba(0,0,0,.125);
    border-right: solid #176bd3 5px;
    color: var(--black);
  }

  && > .dropdown-menu {
    padding: 0;
    border: none;
    width: 100%;
    border: 1px solid rgba(0,0,0,.125);
    border-top: 1px solid transparent;
    transition: max-height 1s ease-in-out;
  }
  

  && > .dropdown-menu.show {
    position: static !important;
    transform: none !important;
  }
`;

const NavDropdownItemStyled = styled(NavDropdown.Item)`
  padding: .75rem 1.25rem;
  text-align: center;
  background-color: #eaf1f8;
  color: #484a4c;

  &&::after {
    content: "";
    border: 1px solid #d1d1d1;
    display: block;
    width: 9rem;
    position: relative;
    top: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
  }

  &&:last-child:after{
    border: 1px solid transparent;
  }
`;

const InputGroupIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
  vertical-align: 0;
`;


const TableUl = styled.ul`
  padding-left: 15px;
  list-style: none;
`;

const TableLi = styled.li`
  position: relative;
  word-wrap: break-word;
`;

const SpanIcon = styled.span`
  left: -0.9rem;
  top: 0.2rem;
  position: absolute;
  width: 1rem;
  line-height: inherit;
  color: var(--checkbox-green);
  transform: rotate(45deg);
`;

const TabsStyles = styled(Tabs)`
  && > a {
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
  }
`;


const ChangeReport = (props) => {

  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  return <Page>
    <PageContainer>
      <TitleContanier>
        <PageTitle>My Dashboard</PageTitle>
      </TitleContanier>
      <ContainerStyled>
        <Row>
        <Col sm={3}>
        <Nav className="flex-column">
          <Nav.Item>
            <NavLinkStyled>Model Builder</NavLinkStyled>
          </Nav.Item>
          <Nav.Item>
            <NavLinkStyled>Link</NavLinkStyled>
          </Nav.Item>
          <NavDropdownStyled title="Published Data Sources" id="nav-dropdown">
            <NavDropdownItemStyled>GDC</NavDropdownItemStyled>
            <NavDropdownItemStyled>CTDC</NavDropdownItemStyled>
            <NavDropdownItemStyled>ICDC</NavDropdownItemStyled>
            <NavDropdownItemStyled>PCDC</NavDropdownItemStyled>
          </NavDropdownStyled>
          <NavDropdownStyled title="Unpublished Data Sources" id="nav-dropdown">
            <NavDropdownItemStyled>PDC</NavDropdownItemStyled>
            <NavDropdownItemStyled>IDC</NavDropdownItemStyled>
          </NavDropdownStyled>
          <Nav.Item>
            <NavLinkStyled>User Management</NavLinkStyled>
          </Nav.Item>
          <Nav.Item>
            <NavLinkStyled>Sign Out</NavLinkStyled>
          </Nav.Item>
        </Nav>

        </Col>
        <Col sm={9}>
        <SectionContainer>
          <SectionHeader>
            <SectionTitle>Change Report</SectionTitle>
            <div>
              <ButtonGreen>Dowload Report</ButtonGreen>{' '}
            </div>
          </SectionHeader>
          
          <TabsStyles defaultActiveKey="all" id="uncontrolled-tab-example">
            <Tab eventKey="all" title="All">
              <TableContainer>
                <InputGroupStyled>
                  <FormControlStyled
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="btnGroupAddon"
                  />
                  <InputGroupTextStyled id="btnGroupAddon">
                    <InputGroupIcon icon={faSearch}/>
                  </InputGroupTextStyled>
                </InputGroupStyled>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Category/Node/Property</th>
                      <th>Type</th>
                      <th>Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {'biospecimen'}
                        <TableUl>
                          <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'read_group'}
                            <TableUl>
                              <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'chipseq_antibody'}</TableLi>
                            </TableUl>
                          </TableLi>
                        </TableUl>
                      </td>
                      <td>Property</td>
                      <td>Eye color</td>
                      <td>New property</td>
                    </tr>
                    <tr style={{backgroundColor: "#fff496"}}>
                      <td>
                        {'clinical'}
                        <TableUl>
                          <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'follow_up'}
                            <TableUl>
                              <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'history_of_tumor'}</TableLi>
                            </TableUl>
                          </TableLi>
                        </TableUl>
                      </td>
                      <td>Property</td>
                      <td>History of Tumor</td>
                      <td>New property</td>
                    </tr>
                    <tr>
                      <td>
                        {'clinical'}
                        <TableUl>
                          <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'read_group'}
                            <TableUl>
                              <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'comorbidity'}</TableLi>
                            </TableUl>
                          </TableLi>
                        </TableUl>
                      </td>
                      <td>Value</td>
                      <td>Dermatomyosis</td>
                      <td>New value</td>
                    </tr>
                    <tr>
                      <td>
                        {'biospecimen'}
                        <TableUl>
                          <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'sample'}
                            <TableUl>
                              <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'is_ffpe'}</TableLi>
                            </TableUl>
                          </TableLi>
                        </TableUl>
                      </td>
                      <td>Property</td>
                      <td>is_ffpe</td>
                      <td>Deprecated</td>
                    </tr>
                  </tbody>
                </Table>
                <PaginationContainer>
                  <Pagination>
                    <Pagination.First />
                    <Pagination.Item active>{1}</Pagination.Item>
                    <Pagination.Item>{2}</Pagination.Item>
                    <Pagination.Item>{3}</Pagination.Item>
                    <Pagination.Item>{4}</Pagination.Item>
                    <Pagination.Item>{5}</Pagination.Item>
                    <Pagination.Last />
                  </Pagination>
                </PaginationContainer>
              </TableContainer>
            </Tab>
            <Tab eventKey="unmapped" title="Unmapped">
              <p>test 2</p>
            </Tab>
            <Tab eventKey="mapped" title="Mapped">
              <p>test 3</p>
            </Tab>
            <Tab eventKey="conflict" title="Conflict">
              <p>test 4</p>
            </Tab>
          </TabsStyles>
        </SectionContainer>
        </Col>
        </Row>
      </ContainerStyled>
    </PageContainer>
  </Page>
}

export default ChangeReport;
