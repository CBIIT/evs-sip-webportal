import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Table, Pagination, InputGroup, FormControl, Tabs, Tab} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

import BatchUpdateModal from '../../components/Modals/BatchUpdateModal';
import DashboardContainer from '../../components/DashboardContainer/DashboardContainer';


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

const ButtonBlue = styled(ButtonStyled)`
  background-color: #6fc0d9;
  border-color: #34859d;

  &&:hover,
  &&:focus {
    background-color: #5b9baf;
  }
`;

const ButtonGray = styled(ButtonStyled)`
  background-color: #858d8f;
  border-color: #424242;

  &&:hover,
  &&:focus {
    background-color: #63696b;
  }
`;

const ButtonDarkBlue = styled(ButtonStyled)`
  background-color: #34859d;
  border-color: #34859d;

  &&:hover,
  &&:focus {
    background-color: #245b6b;
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


const ActionLink = styled.a`
  margin-left: .5rem;
  font-size: 1.1rem;
`;


const DataSources = (props) => {

  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  return (
    <DashboardContainer>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Genomic Data Commons</SectionTitle>
          <div>
            <ButtonBlue>Graphic View</ButtonBlue>{' '}
            <ButtonGray>Model Update</ButtonGray>{' '}
            <br/>
            <BatchUpdateModal/>{' '}
            <ButtonDarkBlue>Change Report</ButtonDarkBlue>{' '}
          </div>
        </SectionHeader>
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
        <Tabs defaultActiveKey="values" id="uncontrolled-tab-example">
          <Tab eventKey="values" title="Values">
            <div>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Category/Node/Property</th>
                    <th>Values</th>
                    <th>NCItcode</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td rowSpan="3">
                      {'biospecimen'}
                      <TableUl>
                        <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'read_group'}
                          <TableUl>
                            <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'chipseq_antibody'}</TableLi>
                          </TableUl>
                        </TableLi>
                      </TableUl>
                    </td>
                    <td>Not allowed to collect</td>
                    <td>C141478</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr>
                    <td>Unknown</td>
                    <td>C17998</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr>
                    <td>Not Reported</td>
                    <td>C43234</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr>
                    <td rowSpan="6">
                      {'biospecimen'}
                      <TableUl>
                        <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'read_group'}
                          <TableUl>
                            <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{'chipseq_antibody'}</TableLi>
                          </TableUl>
                        </TableLi>
                      </TableUl>
                    </td>
                    <td>H3K4me1</td>
                    <td>C141478</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr style={{backgroundColor: "#fff496"}}>
                    <td>Input Control</td>
                    <td>C17998</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr>
                    <td>H3K27ac</td>
                    <td>C43234</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr style={{backgroundColor: "#fff496"}}>
                    <td>H3K27ac</td>
                    <td>C43234</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr>
                    <td>H3K27ac</td>
                    <td>C43234</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
                  </tr>
                  <tr>
                    <td>H3K27me3</td>
                    <td>C43234</td>
                    <td>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faEdit}/>
                      </ActionLink>
                      <ActionLink href="/#" aria-label="edit">
                        <FontAwesomeIcon icon={faTimes}/>
                      </ActionLink>
                    </td>
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
            </div>
          </Tab>
          <Tab eventKey="props" title="Properties">
            <p>test 2</p>
          </Tab>
          <Tab eventKey="nodes" title="Nodes">
            <p>test 3</p>
          </Tab>
        </Tabs>

        </TableContainer>
      </SectionContainer>
    </DashboardContainer>
)};

export default DataSources;
