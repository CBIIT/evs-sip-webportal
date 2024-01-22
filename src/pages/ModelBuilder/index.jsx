import styled from 'styled-components';
import { Button, Table, Pagination, InputGroup, FormControl} from 'react-bootstrap';
import { SearchIcon } from '../../components/ui/icons/Icons';

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


const ModelBuilder = (props) => {

  return (
    <DashboardContainer>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>Model Builder</SectionTitle>
          <div>
            <ButtonBlue>Create Model</ButtonBlue>
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
              <SearchIcon/>
          </InputGroupTextStyled>
        </InputGroupStyled>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Model Name</th>
                    <th>Description</th>
                    <th>Created By</th>
                    <th>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GDC 2.3.0</td>
                    <td>Model 1</td>
                    <td>Otto</td>
                    <td>6/15/2020</td>
                  </tr>
                  <tr>
                    <td>Model 1</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>6/15/2020</td>
                  </tr>
                  <tr>
                    <td>ICDC</td>
                    <td>Larry the Bird</td>
                    <td>Thornton</td>
                    <td>6/15/2020</td>
                  </tr>
                  <tr>
                    <td>PCDC</td>
                    <td>Larry the Bird</td>
                    <td>Thornton</td>
                    <td>6/15/2020</td>
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
      </SectionContainer>
    </DashboardContainer>
  );
}

export default ModelBuilder;
