import React, {useState, useEffect, useCallback} from 'react';
//import { useSelector } from 'react-redux';
import { baseUrl } from '../../api';
import styles from './UserManagement.module.css';
import { Tabs, Tab, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

import AddNewUserModal from '../../components/Modals/AddNewUserModal/AddNewUserModal';
import EditUserModal from '../../components/Modals/EditUserModal/EditUserModal';
import DashboardContainer from '../../components/DashboardContainer/DashboardContainer';
import SearchFormComponent from '../../components/SearchFormComponet/SearchFormComponent';
import PaginationController from '../../components/PaginationController/PaginationController';
import PageSizeComponent from '../../components/PageSizeComponent/PageSizeComponent';


const UserManagement = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [activeUsersState, setActiveUsersState] = useState({});
  const [suspendUsersState, setSuspendUsersState] = useState({});
  const [tabState, setTabState] = useState('active');
  const [pageCountState, setPageCountState] = useState({ active: 0, suspend: 0 });
  const [currentPageState, setCurrentPageState] = useState({ active: 1, suspend: 1 });
  const [pageSizeState, setPageSizeState] = useState({ active: 10, suspend: 10 });

  const fetchUsers = useCallback(async () => {
    const response = await fetch(`${baseUrl}/user/allusers?search=${searchTerm}&status=${tabState === 'active' ? 'Y' : 'N'}&page=${currentPageState[tabState]}&pageSize=${pageSizeState[tabState]}`);
    const data = await response.json();
    tabState === 'active' ? setActiveUsersState(data) : setSuspendUsersState(data);
    setPageCountState(prevPageCountState => ({
      ...prevPageCountState,
      [tabState]: data.user_total / pageSizeState[tabState]
    }));
  }, [searchTerm, tabState, currentPageState, pageSizeState]);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const selectTabHandle = async type => {
    setTabState(type);
  }

  const handleSubmitSearch = async e => {
    e.preventDefault();
    const value = e.target[0].value;
    setSearchTerm(value);
  }

  const handlePageClick = async x => {
    const page = x.selected + 1;
    setCurrentPageState({ ...currentPageState, [tabState]: page });
  }

  const handlePageSize = async e => {
    const pageSize = parseInt(e.target.value);
    setPageSizeState({ ...pageSizeState, [tabState]: pageSize });
    setCurrentPageState({ ...currentPageState, [tabState]: 1 });
  };

  return (
    <DashboardContainer>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>User Management</h2>
          <div>
            <AddNewUserModal updateUserList={fetchUsers}/>
          </div>
        </div>
        <div className={styles.tableContainer}>
        <SearchFormComponent submitSearch={handleSubmitSearch}/>

        <Tabs defaultActiveKey="active" activeKey={tabState} transition={false} onSelect={selectTabHandle}>
            <Tab eventKey="active" title="Active">
              <div>
              {Object.keys(activeUsersState).length === 0 || activeUsersState.message === 'No matched user.'
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
                            <EditUserModal updateUserList={fetchUsers} username={user.nci_username}/>
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
              {Object.keys(suspendUsersState).length === 0 || suspendUsersState.message === 'No matched user.'
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
                            <EditUserModal updateUserList={fetchUsers} username={user.nci_username}/>
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
          <div className={styles.paginationContainer}>
            <PageSizeComponent type={tabState} pageSize={pageSizeState} pageSizeChange={handlePageSize} />
            <PaginationController type={tabState} pageCount={pageCountState} currentPage={currentPageState} pageClick={handlePageClick}/>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default UserManagement;
