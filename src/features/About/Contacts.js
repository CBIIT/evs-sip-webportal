import React from 'react';
import styled from 'styled-components';

const ContentBox =  styled.div`
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  background-color: var(--white-bkgd);
`;

const ContentBoxTitle = styled.h2`
  font-family: 'Raleway-Bold', sans-serif;
  font-size: 1.5rem;
  color: var(--sub-title);
  text-transform: uppercase;

  &&::after {
    content: "";
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

const Contacts = () => {
  return <ContentBox>
    <ContentBoxTitle>EVS-SIP Contacts</ContentBoxTitle>
    <ContentBoxText>
      <p>If you have any questions, please contact us at <a href="mailto:evssip@mail.nih.gov">evssip@mail.nih.gov</a>.</p>
    </ContentBoxText>
  </ContentBox>
}

export default Contacts;
