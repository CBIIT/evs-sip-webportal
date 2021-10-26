import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styled from 'styled-components';
import { baseServer } from '../api';
import allActions from '../actions';

const NavbarStyled = styled(Navbar)`
  background-color: var(--nav-back-color-style) !important;

  && .navbar-collapse {
    justify-content: flex-end;
  }

  && .navbar-nav .nav-link {
    color: var(--white);
    padding-right: 1.5rem;
    padding-left: 1.5rem;
    border-radius: 0.3125rem;
  }


  && .navbar-nav .nav-link:focus, 
  && .navbar-nav .nav-link:hover {
    text-decoration: underline;
  }

  && .navbar-nav .nav-item.show .nav-link{
    background-color: #195d9c;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  text-align: right;
`;

const NavDropdownStyled = styled(NavDropdown)`
  @media (min-width: 992px){
    && .dropdown-menu {
      margin: .125rem 0 0 !important;
      right: 0;
      left: auto;
      background-color: var(--nav-back-color-submenu);
      padding: 0.8rem 0;
    }

    && .dropdown-toggle::after {
      content: none;
    }

    && .dropdown-menu::before {
      content: '';
      color: var(--nav-back-color-submenu);
      border-top: 0;
      border-right: 0.5rem solid transparent;
      border-bottom: 0.5rem solid;
      border-left: 0.5rem solid transparent;
      position: absolute;
      top: -0.5rem;
      right: 3rem;
    }
  }
`;

const NavDropdownItem = styled(NavDropdown.Item)`
  color: #fff;
  border-bottom: 0.1rem solid transparent;
  margin: 0.25rem 1.5rem;
  padding: 0;
  width: fit-content;
  display: block;
  
  &&:hover,
  &&:focus {
    color: #fff;
    text-decoration: none;
    background-color: transparent;
    border-bottom: 0.1rem solid #09a58a;
  }
`;

const NavDropdownSubTitle = styled.div`
    display: block;
    width: 100%;
    margin: 0.25rem 1.5rem;
    clear: both;
    font-weight: 400;
    color: #212529;
    text-align: inherit;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    color: var(--sub-title);
    border: 0;
    text-transform: uppercase;
    font-size: 0.8rem;
`;

const NavigationBar = () => {

  //const user = {name: "John"};

  //const baseUrl = "http://localhost:3001"

  const currentUser = useSelector(state => state.currentUser);
  console.dir(useSelector(state => state))
  const isLoggedIn = Object.keys(currentUser).length > 0;
  const dispatch = useDispatch();
  console.log(currentUser)
  console.log( " isLoggedin ", isLoggedIn)
  // const login = async e => {
  //   e.preventDefault();
  //   const response = await fetch(`/dashboard/login`);
  //   dispatch(allActions.userActions.setUser(user));
  //   // can not use normal 301 response, since session is not properly cleared
  //   //const response = await fetch('/api/logout');
  //   //window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
  //   //window.location.href = `https://authtest.nih.gov/siteminderagent/smlogoutredirector.asp?TARGET=https://sip-dev.evs.cancer.gov/evssip`;
  // }

  const logout = async e => {
    e.preventDefault();
    dispatch(allActions.userActions.logOut());
    // can not use normal 301 response, since session is not properly cleared
    const response = await fetch(`${baseServer}/dashboard/logout`);
    console.log(response);
   //window.location.href = `${await response.json()}?TARGET=https://sip-dev.evs.cancer.gov/evssip`;
    window.location.href = `${await response.json()}?TARGET=${window.location.origin}`;
    //window.location.href = `https://authtest.nih.gov/siteminderagent/smlogoutredirector.asp?TARGET=https://sip-dev.evs.cancer.gov/evssip`;
  }


  return (<NavbarStyled bg="dark" expand="lg" role="navigation">
      <NavbarContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
            <Nav.Link as={Link} to="/search">Search</Nav.Link>
            {isLoggedIn &&
              <Nav.Link as={Link} to="/mainboard">Dashboard</Nav.Link>
            }
            <NavDropdownStyled title="Data Model">
              <NavDropdownItem as={Link} to={{
                pathname: '/datamodel',
                state: {
                  fromDataModel: 'gdc'
                }
              }}>GDC</NavDropdownItem>
              <NavDropdownItem as={Link} to={{
                pathname: '/datamodel',
                state: {
                  fromDataModel: 'ctdc'
                }
              }}>CTDC</NavDropdownItem>
              <NavDropdownItem as={Link} to={{
                pathname: '/datamodel',
                state: {
                  fromDataModel: 'icdc'
                }
              }}>ICDC</NavDropdownItem>
              <NavDropdownItem as={Link} to={{
                pathname: '/datamodel',
                state: {
                  fromDataModel: 'pcdc'
                }
              }}>PCDC</NavDropdownItem>
            </NavDropdownStyled>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            {isLoggedIn ? 
              <NavDropdownStyled title={currentUser.name}>
                <NavDropdownSubTitle>Model Owner</NavDropdownSubTitle>
                <NavDropdownItem as={Link} to='#'>Profile</NavDropdownItem>
                <NavDropdownItem as={Link} to='/mainboard'>Dashboard</NavDropdownItem>
                <NavDropdownItem onClick={logout}>Logout</NavDropdownItem>
              </NavDropdownStyled>
              : 
              <a href={`${baseServer}/dashboard/login`} target="_self" className="nav-link">Login</a>
            }
          </Nav>
        </Navbar.Collapse>
      </NavbarContainer>
    </NavbarStyled>
  )
}

export default NavigationBar;
