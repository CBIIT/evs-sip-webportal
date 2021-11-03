import React from 'react';
import { useDispatch } from 'react-redux';
import { Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './NavigationBoard.module.css';
import { baseServer } from '../../api';
import allActions from '../../actions';


const NavigationBoard = () => {
  const dispatch = useDispatch();

  const logout = async e => {
    e.preventDefault();
    dispatch(allActions.userActions.logOut());
    // can not use normal 301 response, since session is not properly cleared
    const response = await fetch(`${baseServer}/dashboard/logout`);
    window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
  }

  return (
    <>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link className={styles.navLink} as={Link} to="/modelbuilder">Model Builder</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={styles.navLink} as={Link} to="/changereport">Change Report</Nav.Link>
        </Nav.Item>
        <NavDropdown className={`${styles.navDropdown}`} title="Published Data Sources" id="nav-dropdown" data-toggle="collapse" renderMenuOnMount>
          <NavDropdown.Item className={styles.navDropdownItem} as={Link} to="/mainboard">GDC</NavDropdown.Item>
          <NavDropdown.Item className={styles.navDropdownItem} as={Link} to="/mainboard">CTDC</NavDropdown.Item>
          <NavDropdown.Item className={styles.navDropdownItem} as={Link} to="/mainboard">ICDC</NavDropdown.Item>
          <NavDropdown.Item className={styles.navDropdownItem} as={Link} to="/mainboard">PCDC</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown className={`${styles.navDropdown}`} title="Unpublished Data Sources" id="nav-dropdown" renderMenuOnMount>
          <NavDropdown.Item className={styles.navDropdownItem} as={Link} to="/mainboard">PDC</NavDropdown.Item>
          <NavDropdown.Item className={styles.navDropdownItem} as={Link} to="/mainboard">IDC</NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link className={styles.navLink} as={Link} to="/usermanagement">User Management</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={styles.navLink} onClick={logout}>Sign Out</Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default NavigationBoard;
