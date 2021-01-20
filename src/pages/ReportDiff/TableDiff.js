import React from 'react';
import styled from 'styled-components';
import { Table, Button } from 'react-bootstrap';


const TableContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TableDiff = () => {
  return <>
    <TitleContainer>
      <h2>Result</h2>
      <Button variant="primary">Download Result</Button>
    </TitleContainer>
    <TableContainer>
      <Table striped bordered hover>
        <thead style={{background:"#606060",color: "white", textAlign: "center"}}>
          <tr>
            <th rowSpan="2" width="10%">Category</th>
            <th rowSpan="2" width="10%">Node</th>
            <th rowSpan="2" width="10%">Property</th>
            <th colSpan="2" width="30%">GDC Dictionary</th>
            <th colSpan="2" width="30%">EVS-SIP</th>
            <th rowSpan="2" width="10%">Comments</th>
          </tr>
          <tr>
            <th>Value</th>
            <th>NCIt Code</th>
            <th>Value</th>
            <th>NCIt Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>Other</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>CDK4/6 Inhibitor</td>
            <td></td>
            <td>CDK4/6 Inhibitor</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>10-Deacetyltaxol</td>
            <td></td>
            <td>10-Deacetyltaxol</td>
            <td>C957</td>
            <td></td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>3'-dA Phosphoramidate NUC-7738</td>
            <td>C171381</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  </>
}

export default TableDiff;
