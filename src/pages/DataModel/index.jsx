import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom'
import TabsController from './TabsController/TabsController'

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

const DataModel = (props) => {

  const [model, setModel] = useState('gdc');
  const [fromModel, setfromModel] = useState('gdc');
  const location = useLocation();
  const state = location?.state || 'gdc';

  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  if(state?.fromDataModel !== undefined && state.fromDataModel !== fromModel){
    setfromModel(state.fromDataModel);
    setModel(state.fromDataModel);
  }

  return <Page>
    <PageContainer>
      <PageTitle>Data Model</PageTitle>
      <TabsController dataModel={model} setDataModel={setModel}/>
    </PageContainer>
  </Page>
}

export default DataModel;
