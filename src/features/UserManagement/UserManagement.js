import React, {useState, useEffect} from 'react';
//import { useSelector } from 'react-redux';
import { baseUrl } from '../../api';
import styles from './UserManagement.module.css';
import { Tabs, Tab, Table, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import AddNewUserModal from '../../components/Modals/AddNewUserModal/AddNewUserModal';
import EditUserModal from '../../components/Modals/EditUserModal/EditUserModal';
import DashboardContainer from '../../components/DashboardContainer/DashboardContainer';
import PaginationController from '../../components/PaginationController/PaginationController';


const UserManagement = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [activeUsersState, setActiveUsersState] = useState({
    message: "No matched user."
  });
  const [suspendUsersState, setSuspendUsersState] = useState({
    message: "No matched user."
  });
  const [tabState, setTabState] = useState('active');
  const [pageCountState, setPageCountState] = useState({ active: 0, suspend: 0 });
  const [currentPageState, setCurrentPageState] = useState({ active: 1, suspend: 1 });
  const [pageSizeState, setPageSizeState] = useState({ active: 3, suspend: 3 });
  
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${baseUrl}/user/allusers?type=Y&page=1&pageSize=3`);
      const data = await response.json();
      setActiveUsersState(data);
      setPageCountState(prevPageCountState => ({
        ...prevPageCountState,
        active: data.user_total / pageSizeState.active
      }));
    }

    fetchUsers();
  }, [pageSizeState.active]);

  const updateUserList = async () => {
    const response = await fetch(`${baseUrl}/user/allusers?search=${searchTerm}&status=${tabState === 'active' ? 'Y' : 'N'}&page=${currentPageState[tabState]}&pageSize=${pageSizeState[tabState]}`);
    const data = await response.json();
    tabState === 'active' ? setActiveUsersState(data) : setSuspendUsersState(data);
    setPageCountState({ ...pageCountState, [tabState]: data.user_total / pageSizeState[tabState]});
  }

  const selectTabHandle = async (type) => {
    setTabState(type);
    const response = await fetch(`${baseUrl}/user/allusers?search=${searchTerm}&status=${type === 'active' ? 'Y' : 'N'}&page=${currentPageState[type]}&pageSize=${pageSizeState[type]}`);
    const data = await response.json();
    type === 'active' ? setActiveUsersState(data) : setSuspendUsersState(data);
    setPageCountState({ ...pageCountState, [type]: data.user_total / pageSizeState[type]});
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const handleSubmitSearch = async (event) => {
    event.preventDefault();
    const keyword = event.target[0].value;
    const response = await fetch(`${baseUrl}/user/allusers?search=${keyword}&status=${tabState === 'active' ? 'Y' : 'N'}&page=${currentPageState[tabState]}&pageSize=${pageSizeState[tabState]}`);
    const data = await response.json();
    tabState === 'active' ? setActiveUsersState(data) : setSuspendUsersState(data);
    setPageCountState({ ...pageCountState, [tabState]: data.user_total / pageSizeState[tabState]});
  }

  const handlePageClick = async (x) => {
    const page = x.selected + 1;
    setCurrentPageState({ ...currentPageState, [tabState]: page});
    const response = await fetch(`${baseUrl}/user/allusers?search=${searchTerm}&status=${tabState === 'active' ? 'Y' : 'N'}&page=${page}&pageSize=${pageSizeState[tabState]}`);
    const data = await response.json();
    if (tabState === 'active') {
      setActiveUsersState(data);
    } else {
      setSuspendUsersState(data);
    }
    setPageCountState({ ...pageCountState, [tabState]: data.user_total / pageSizeState[tabState]});
  }

  return (
    <DashboardContainer>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>User Management</h2>
          <div>
            <AddNewUserModal/>
          </div>
        </div>
        <div className={styles.tableContainer}>
        <Form className={styles.form} onSubmit={handleSubmitSearch}>
          <Form.Group className={styles.formGroup} role="form">
            <Form.Control 
              type="text"
              placeholder="Search"
              aria-label="Search"
              className={styles.formControl}
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button type="submit"><FontAwesomeIcon icon={faSearch}/></Button>
          </Form.Group>
        </Form>

        <Tabs defaultActiveKey="active" activeKey={tabState} transition={false} onSelect={selectTabHandle}>
            <Tab eventKey="active" title="Active">
              <div>
              {activeUsersState.message === 'No matched user.'
              ? <div>No Results</div>
              : <Table bordered>
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
                    {activeUsersState.results.map((user, index) => {
                      return(
                        <tr key={index}>
                          <td>{user.first_name} {user.last_name}</td>
                          <td>{user.nci_username}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.active === 'Y' ? 'active': 'suspend'}</td>
                          <td>
                            <EditUserModal updateUserList={updateUserList} nci_username={user.nci_username}/>
                            <a className={styles.tableLink} href="/#" aria-label="edit">
                              <FontAwesomeIcon icon={faTimes}/>
                            </a>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              }
              </div>
            </Tab>
            <Tab eventKey="suspend" title="Suspend">
              <div>
              {suspendUsersState.message === 'No matched user.'
              ? <div>No Results</div>
              : <Table bordered>
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
                    {suspendUsersState.results.map((user, index) => {
                      return(
                        <tr key={index}>
                          <td>{user.first_name} {user.last_name}</td>
                          <td>{user.nci_username}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.active === 'Y' ? 'active': 'suspend'}</td>
                          <td>
                            <EditUserModal updateUserList={updateUserList} nci_username={user.nci_username}/>
                            <a className={styles.tableLink} href="/#" aria-label="edit">
                              <FontAwesomeIcon icon={faTimes}/>
                            </a>
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

        </div>
      </div>
    </DashboardContainer>
  );
}

export default UserManagement;
