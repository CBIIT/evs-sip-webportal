import React from 'react';
import logo from '../assets/nih-evs-sip-logo-color.png'
import styled from 'styled-components';

const LogoContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 5rem;
  padding: 1rem;
`;

const Header = () => {
  return <LogoContainer>
    <Logo src={logo} alt="logo" />
  </LogoContainer>;
}

export default Header;