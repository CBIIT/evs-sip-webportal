import styled from 'styled-components';
import { Button, Table, Pagination, InputGroup, FormControl, Tabs, Tab} from 'react-bootstrap';
import { SearchIcon, AngleDownIcon } from '../../components/ui/icons/Icons';

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
  return (
    <DashboardContainer>
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
                    <SearchIcon/>
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
                          <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'read_group'}
                            <TableUl>
                              <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'chipseq_antibody'}</TableLi>
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
                          <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'follow_up'}
                            <TableUl>
                              <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'history_of_tumor'}</TableLi>
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
                          <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'read_group'}
                            <TableUl>
                              <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'comorbidity'}</TableLi>
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
                          <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'sample'}
                            <TableUl>
                              <TableLi><SpanIcon><AngleDownIcon/></SpanIcon>{'is_ffpe'}</TableLi>
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
    </DashboardContainer>
  );
}

export default ChangeReport;
