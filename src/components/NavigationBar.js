import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

const NavbarStyled = styled(Navbar)`
  background-color: var(--nav-back-color-style) !important;

  && .navbar-collapse {
    justify-content: flex-end;
  }

  && .navbar-nav .nav-link {
    color: var(--white);
  }

  && .navbar-nav .nav-link {
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }
`;

const NavbarContainer = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  text-align: right;
`;

const NavigationBar = () => (
  <NavbarStyled bg="dark" expand="lg">
    <NavbarContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link as={Link} to="/" >Home</Nav.Link>
          <Nav.Link as={Link} to="/about" >About</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </NavbarContainer>
  </NavbarStyled>
)

export default NavigationBar;