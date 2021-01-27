import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';


const TableContainer = styled.div`
  width: 100%;
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
                <td>{item.p}</td>
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
