import React from 'react';
import styled from 'styled-components';
import { Form, Button, Row, Table, Col, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const searchContainer = styled(Col)`
  width: 100%;
`;

const TableContainer = styled.div`
  width: 100%;
`;

const TableUl = styled.ul`
  padding-left: 15px;
  list-style: none;
  margin-bottom: 0;
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

const TableDiff = (props) => {
  let groupCount = {};
  let tableData = Object.assign([], props.result);
  tableData.map((entry) => {
    entry.id = entry.p + '/' + entry.n + '/' + entry.c;
    if(groupCount[entry.id]){
      groupCount[entry.id]++;
    }
    else{
      groupCount[entry.id] = 1;
    }
  });
  return <>
    <Form>
      <Form.Row className="align-items-center">
        <Col sm={6} className="my-1">
          <Form.Label htmlFor="inlineFormInputGroupUsername" srOnly>
            Search By Text
          </Form.Label>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text><i class="fas fa-search"></i></InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control id="inlineFormInputGroupUsername" placeholder="Search By Text" />
          </InputGroup>
        </Col>
        <Col sm={6} xs="auto" className="my-1 d-flex">
          <Button variant="primary"onClick={props.reportTrigger} className="ml-auto">
            Download Result
          </Button>
        </Col>
      </Form.Row>
    </Form>
    <TableContainer>
      <Table bordered>
        <thead style={{background:"#535F74", color: "white", textAlign: "center"}}>
          <tr>
            <th rowSpan="2" width="10%">Category / Node / Property</th>
            <th colSpan="2" width="30%">GDC Dictionary</th>
            <th colSpan="2" width="30%">Mapped GDC Values</th>
          </tr>
          <tr>
            <th>Value</th>
            <th>NCIt Code</th>
            <th>Value</th>
            <th>NCIt Code</th>
          </tr>
        </thead>
        <tbody>
          {
            tableData.map((item, index) =>{
              let rowSpan = 0;
              if(index == 0){
                rowSpan = groupCount[item.id];
              }
              else{
                rowSpan = tableData[index].id == tableData[index -1].id ? 0 : groupCount[item.id];
              }
              if(rowSpan > 0){
                return (
                  <tr key={index}>
                    <td rowSpan={rowSpan}>
                      {item.c}
                      <TableUl>
                        <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{item.n}
                          <TableUl>
                            <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{item.p}</TableLi>
                          </TableUl>
                        </TableLi>
                      </TableUl>
                    </td>
                    <td>{item.v_1}</td>
                    <td>{item.n_1}</td>
                    <td>{item.v_2}</td>
                    <td>{item.n_2}</td>
                  </tr>
                );
              }
              else{
                return (
                  <tr key={index}>
                    <td>{item.v_1}</td>
                    <td>{item.n_1}</td>
                    <td>{item.v_2}</td>
                    <td>{item.n_2}</td>
                  </tr>
                );
              }
            })
          }
        </tbody>
      </Table>
    </TableContainer>
  </>
}

export default TableDiff;
