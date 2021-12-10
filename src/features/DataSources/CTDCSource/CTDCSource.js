import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../../api';
import styles from './CTDCSource.module.css';
import styled from 'styled-components';
import { Button, Table, InputGroup, Form, FormControl, Tabs, Tab} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAngleDown, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

import BatchUpdateModal from '../../../components/Modals/BatchUpdateModal';
import DashboardContainer from '../../../components/DashboardContainer/DashboardContainer';
import PaginationController from '../../../components/PaginationController/PaginationController';


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

// const PaginationContainer =  styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: right;

//   && > .pagination {
//     margin-bottom: 0; 
//   }
// `;

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

// const InputGroupTextStyled = styled(InputGroup.Text)`
//     position: relative;
//     left: -2.5rem;
//     z-index: 3;
//     background-color: transparent;
//     border: none;

//     &&>.form-control {
//       border-radius: .25rem;
//     }
// `;

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


const CTDCSource = () => {
  const [nodeState, setNodeState] = useState({
    type: "node",
    message: "No matched data in nodes."
  });
  const [propState, setPropState] = useState({
    type: "props",
    message: "No matched data in properties."
  });
  const [valueState, setValueState] = useState({
    type: "values",
    message: "No matched data in values"
  });
  const [tabState, setTabState] = useState('values');
  const [searchTerm, setSearchTerm] = useState('');
  const [pageCountState, setPageCountState] = useState({
    values: 0,
    props: 0,
    nodes: 0
  });
  const [currentPageState, setCurrentPageState] = useState({
    values: 1,
    props: 1,
    nodes: 1
  });
  const [pageSizeState, setPageSizeState] = useState({
    values: 10,
    props: 10,
    nodes: 10
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}/datamodel/search?model=CTDC&page=1&pageSize=10`);
      const data = await response.json();
      setNodeState(data[0]);
      setPropState(data[1]);
      setValueState(data[2]);
      setPageCountState({
        values: Math.ceil(data[2].total_values / pageSizeState['values']),
        props: Math.ceil(data[1].total_props / pageSizeState['props']),
        nodes: Math.ceil(data[0].total_nodes / pageSizeState['nodes']),
      })
    }

    fetchData();
  }, [pageSizeState]);

  const switchSetResponse = (type, data) => {
    switch(type) {
      case 'nodes':
        setNodeState(data[0]);
        break;
      case 'props':
        setPropState(data[0]);
        break;
      default:
        setValueState(data[0]);
        break;
    }
    setPageCountState({ ...pageCountState, [type]: data[0][`total_${type}`] / pageSizeState[type]});
  } 

  const selectTabHandle = async (type) => {
    setTabState(type);
    const response = await fetch(`${baseUrl}/datamodel/search?keyword=${searchTerm}&model=CTDC&type=${type}&page=${currentPageState[type]}&pageSize=${pageSizeState[type]}`);
    const data = await response.json();
    switchSetResponse(type, data);
  }

  const handlePageClick = async (x) => {
    const page = x.selected + 1;
    setCurrentPageState({ ...currentPageState, [tabState]: page });
    const response = await fetch(`${baseUrl}/datamodel/search?keyword=${searchTerm}&model=CTDC&type=${tabState}&page=${page}&pageSize=${pageSizeState[tabState]}`);
    const data = await response.json();
    switchSetResponse(tabState, data);
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    const value = event.target[0].value;
    const response = await fetch(`${baseUrl}/datamodel/search?keyword=${value}&model=CTDC&type=${tabState}&page=page=${currentPageState[tabState]}&pageSize=${pageSizeState[tabState]}`);
    const data = await response.json();
    switchSetResponse(tabState, data);
  }

  return (
    <DashboardContainer>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Clinical Trial Data Commons</SectionTitle>
          <div>
            <ButtonBlue>Graphic View</ButtonBlue>{' '}
            <ButtonGray>Model Update</ButtonGray>{' '}
            <br/>
            <BatchUpdateModal/>{' '}
            <ButtonDarkBlue>Change Report</ButtonDarkBlue>{' '}
          </div>
        </SectionHeader>
        <TableContainer>
        <Form className={styles.form} onSubmit={handleSubmitSearch}>
          <Form.Group role="form">
            <Form.Control 
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button type="submit">Send</Button>
          </Form.Group>
        </Form>
        <Tabs defaultActiveKey="values" id="uncontrolled-tab-example" activeKey={tabState} onSelect={selectTabHandle}>
          <Tab eventKey="values" title="Values">
            <div>
              {valueState.message === 'No matched data in values'
              ? <div>No Results</div>
              : <Table bordered>
                  <thead>
                    <tr>
                      <th>Category/Node/Property</th>
                      <th>Values</th>
                      <th>NCItcode</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {valueState.result.map((v, i) => { 
                      return(
                        <tr>
                          <td>
                            {'Category_Name'}
                            <TableUl>
                              <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{v.Node_Name}
                                <TableUl>
                                  <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{v.Property_Name}</TableLi>
                                </TableUl>
                              </TableLi>
                            </TableUl>
                          </td>
                          <td>{v.Value}</td>
                          <td></td>
                          <td>
                            <ActionLink href="/#" aria-label="edit">
                              <FontAwesomeIcon icon={faEdit}/>
                            </ActionLink>
                            <ActionLink href="/#" aria-label="edit">
                              <FontAwesomeIcon icon={faTimes}/>
                            </ActionLink>
                          </td>
                        </tr>
                      )
                  })}
                  </tbody>
                </Table>
              }
            </div>
          </Tab>
          <Tab eventKey="props" title="Properties">
            <div>
            {propState.message === 'No matched data in properties.' 
            ? <div>No Results</div>
            : <Table bordered>
                <thead>
                  <tr>
                    <th>Category/Node</th>
                    <th>Properties</th>
                    <th>NCItcode</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {propState.result.map((p, i) => { 
                    return(
                      <tr>
                      <td>
                        {'Category_Name'}
                        <TableUl>
                          <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{p.Node_Name}</TableLi>
                        </TableUl>
                      </td>
                      <td>{p.Property_Name}</td>
                      <td></td>
                      <td>
                        <ActionLink href="/#" aria-label="edit">
                          <FontAwesomeIcon icon={faEdit}/>
                        </ActionLink>
                        <ActionLink href="/#" aria-label="edit">
                          <FontAwesomeIcon icon={faTimes}/>
                        </ActionLink>
                      </td>
                    </tr>   
                    )
                  })}
                </tbody>
              </Table>
              }
            </div>
          </Tab>
          <Tab eventKey="nodes" title="Nodes">
            <div>
            {nodeState.message === 'No matched data in nodes.'
            ? <div>No Results</div>
            : <Table bordered>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Node</th>
                    <th>NCItcode</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {nodeState.result.map((n, i) => { 
                    return(
                      <tr>
                      <td>
                        {'Category_Name'}
                      </td>
                      <td>{n.Node_Name}</td>
                      <td></td>
                      <td>
                        <ActionLink href="/#" aria-label="edit">
                          <FontAwesomeIcon icon={faEdit}/>
                        </ActionLink>
                        <ActionLink href="/#" aria-label="edit">
                          <FontAwesomeIcon icon={faTimes}/>
                        </ActionLink>
                      </td>
                    </tr>   
                    )
                  })}
                </tbody>
              </Table>
              }
            </div>
          </Tab>
        </Tabs>

        <PaginationController type={tabState} pageCount={pageCountState} currentPage={currentPageState} pageClick={handlePageClick}/>

        </TableContainer>
      </SectionContainer>
    </DashboardContainer>
)};

export default CTDCSource;
