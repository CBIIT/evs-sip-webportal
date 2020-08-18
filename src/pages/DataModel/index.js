import React from 'react';
import styled from 'styled-components';
import TabsController from './TabsController'

const Page = styled.div`
  background-color: var(--page-bkgd);
  overflow: auto;
  padding-bottom: 18rem;
`;

const PageContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: 'Raleway-Medium', sans-serif;
  font-size: 2.25rem;
  color: var(--main-title);
  padding: 3rem 0 1.5rem 0;
  font-weight: 500;
  margin-bottom: 0;
`;

const DataModel = () => {
  return <Page>
    <PageContainer>
      <PageTitle>Data Model</PageTitle>
      <TabsController/>
    </PageContainer>
  </Page>
}

export default DataModel;
