import React from 'react';
import styled from 'styled-components';

import Description from './Description';
import DataSources from './DataSources';
import Integrate from './Integrate';
import Contacts from './Contacts';

const Page = styled.div`
  background-color: var(--page-bkgd);
  overflow: auto;
`;

const PageContainer = styled.div`
  max-width: 65rem;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: 'Raleway-Medium', sans-serif;
  font-size: 2.25rem;
  color: var(--main-title);
  padding: 3rem 0 1.5rem 0;
`;

const About = () => {
  return <Page>
    <PageContainer>
      <PageTitle>About</PageTitle>
        <Description/>
        <DataSources/>
        <Integrate/>
        <Contacts/>
    </PageContainer>
  </Page>
}

export default About;
