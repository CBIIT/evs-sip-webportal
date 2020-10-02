import React from 'react';
import styled from 'styled-components';

import bkgd from '../../assets/img/integrate-evs.jpg';

const ContentBox =  styled.div`
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  background-color: var(--white-bkgd);
`;

const ContentBoxIntegrate = styled(ContentBox)`
  background-image: url(${bkgd});
  background-position: right;
  background-repeat: no-repeat;
`;

const ContentBoxTitle = styled.h2`
  font-family: 'Raleway-Bold', sans-serif;
  font-size: 1.5rem;
  color: var(--sub-title);
  text-transform: uppercase;

  &&::after {
    content: " ";
    border: 1px solid var(--black);
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: block;
    max-width: 24rem;
  }
`;

const ContentBoxText = styled.div`
  margin-top: 2rem;
  max-width: 34rem;

  && > p {
    font-size: 1.0625rem;
    font-family: 'Inter', sans-serif;
    color: var(--black);
  }

  && > p:last-child {
    margin-bottom: 0;
  }

  && a {
    color: var(--link);
  }
`;

const Integrate = () => {
  return <ContentBoxIntegrate>
    <ContentBoxTitle>How to integrate into EVS-SIP</ContentBoxTitle>
    <ContentBoxText>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat:
      </p>
      <ul>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit cesse cillum dolore eu</li>
        <li>Duis aute irure dolor in reprehenderit in voluptate velit cesse cillum dolore eu</li>
      </ul>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
        irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
        nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa 
        qui officia deserunt mollit anim id est laborum.
      </p>
    </ContentBoxText>
  </ContentBoxIntegrate>
}

export default Integrate;
