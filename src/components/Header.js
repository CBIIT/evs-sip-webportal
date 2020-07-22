import React from 'react';
import styled from 'styled-components';

import logo from '../assets/img/nih-evs-sip-logo-color.png';

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
