import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';


const TableContainer = styled.div`
  width: 100%;
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

const TableDiff = (props) => {
  return <>
    <TableContainer>
      <Table striped bordered hover>
        <thead style={{background:"#535F74", color: "white", textAlign: "center"}}>
          <tr>
            <th rowSpan="2" width="10%">Category / Node / Property</th>
            <th colSpan="2" width="30%">GDC Dictionary</th>
            <th colSpan="2" width="30%">EVS-SIP</th>
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
            props.result.map((item, index) =>
              <tr key={index}>
                <td>
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
            )
          }
        </tbody>
      </Table>
    </TableContainer>
  </>
}

export default TableDiff;
