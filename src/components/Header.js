import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../assets/img/nih-evs-sip-logo-color.png';

const LogoContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 5rem;
`;

const Header = () => {
  return <LogoContainer role="banner">
    <Link to="/"><Logo src={logo} alt="logo"/></Link>
  </LogoContainer>;
}

export default Header;
