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
      <Button variant="primary">Download Report</Button>
    </TitleContainer>
    <TableContainer>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Node</th>
            <th>Property</th>
            <th>GDC Dictionary Value</th>
            <th>User Provided Value</th>
            <th>NCIt Code from GDC Dictionary</th>
            <th>NCIt Code from User</th>
            <th>Components</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>clinical</td>
            <td>demographic</td>
            <td>cause_of_death</td>
            <td>cancer related</td>
            <td>cancer related</td>
            <td>C82561</td>
            <td>C8278</td>
            <td>Conflict</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>demographic</td>
            <td>cause_of_death</td>
            <td>cancer related</td>
            <td>cancer related</td>
            <td>C82561</td>
            <td>C8278</td>
            <td>Conflict</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>demographic</td>
            <td>cause_of_death</td>
            <td>cancer related</td>
            <td>cancer related</td>
            <td>C82561</td>
            <td>C8278, C8278</td>
            <td>Excel File has more NCIt mappings.</td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  </>
}

export default TableDiff;
