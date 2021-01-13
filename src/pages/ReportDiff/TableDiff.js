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
        <thead>
          <tr>
            <th>Category</th>
            <th>Node</th>
            <th>Property</th>
            <th>GDC Dictionary Value</th>
            <th>User Provided Value</th>
            <th>NCIt Code from GDC Dictionary</th>
            <th>NCIt Code from User</th>
            <th>Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>ALK/c-Met Inhibitor  TQ-B3139</td>
            <td>ALK/c-Met Inhibitor  TQ-B3139</td>
            <td></td>
            <td>C148513</td>
            <td>Excel File has new NCIt mapping.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>Itraconazole</td>
            <td>Itraconazole</td>
            <td></td>
            <td>C1138</td>
            <td>Excel File has new NCIt mapping.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>MDM2 Inhibitor KRT-232</td>
            <td>MDM2 Inhibitor KRT-232</td>
            <td>C156415</td>
            <td>C116624</td>
            <td>Conflict.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>Tipiracil</td>
            <td>Tipiracil</td>
            <td></td>
            <td>C152646</td>
            <td>Excel File has new NCIt mapping.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>Tipiracil Hydrochloride</td>
            <td>Tipiracil Hydrochloride</td>
            <td></td>
            <td>C152647</td>
            <td>Excel File has new NCIt mapping.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>Zirconium Zr 89 Panitumumab</td>
            <td>Zirconium Zr 89 Panitumumab</td>
            <td></td>
            <td>C156043</td>
            <td>Excel File has new NCIt mapping.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>2-O, 3-O Desulfated Heparin</td>
            <td></td>
            <td>C99130</td>
            <td></td>
            <td>Value not exists in Excel file.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td>AEE788</td>
            <td></td>
            <td>C48369</td>
            <td></td>
            <td>Value not exists in Excel file.</td>
          </tr>
          <tr>
            <td>clinical</td>
            <td>treatment</td>
            <td>therapeutic_agents</td>
            <td></td>
            <td>"Value 1"</td>
            <td></td>
            <td>C00000</td>
            <td>Value not exists in GDC Dictionary.</td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  </>
}

export default TableDiff;
