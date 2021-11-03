import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Tabs, Tab, Table, Pagination, InputGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

import AddNewUserModal from '../../components/Modals/AddNewUserModal';
import EditUserModal from '../../components/Modals/EditUserModal/EditUserModal';
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

const ActionLink = styled.a`
  margin-left: .5rem;
  font-size: 1.1rem;
`;


const UserManagement = (props) => {

  const users = useSelector(state => state.usersList.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    const results = users.filter(user =>
      user.nci_username.includes(searchTerm) || 
      user.first_name.toLowerCase().includes(searchTerm) ||
      user.last_name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [users, searchTerm]);

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <DashboardContainer>
      <SectionContainer>
        <SectionHeader>
          <SectionTitle>User Management</SectionTitle>
          <div>
            <AddNewUserModal/>
          </div>
        </SectionHeader>
        <TableContainer>
        <InputGroupStyled>
          <FormControlStyled
            type="text"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="btnGroupAddon"
            value={searchTerm}
            onChange={handleSearch}
          />
          <InputGroupTextStyled id="btnGroupAddon">
            <InputGroupIcon icon={faSearch}/>
          </InputGroupTextStyled>
        </InputGroupStyled>

        <Tabs defaultActiveKey="activeUsers" id="uncontrolled-tab-example">
            <Tab eventKey="activeUsers" title="Active">
              <div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>User Account</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((user, index) => {
                      if (user.active === 'N') return null;
                      return(
                        <tr key={index}>
                          <td>{user.first_name} {user.last_name}</td>
                          <td>{user.nci_username}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.active === 'Y' ? 'active': 'suspend'}</td>
                          <td>
                            <EditUserModal userid={user.id}/>
                            <ActionLink href="/#" aria-label="edit">
                              <FontAwesomeIcon icon={faTimes}/>
                            </ActionLink>
                          </td>
                        </tr>
                      )
                    })}
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
            <Tab eventKey="suspendUsers" title="Suspend">
              <div>
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>User Account</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((user, index) => {
                      if (user.active === 'Y') return null;
                      return(
                        <tr key={index}>
                          <td>{user.first_name} {user.last_name}</td>
                          <td>{user.nci_username}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.active === 'Y' ? 'active': 'suspend'}</td>
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
          </Tabs>




        </TableContainer>
      </SectionContainer>
    </DashboardContainer>
  );
}

export default UserManagement;
