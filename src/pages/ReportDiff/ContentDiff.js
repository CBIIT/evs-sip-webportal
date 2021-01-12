import React from 'react';
import styled from 'styled-components';

import FormDiff from './FormDiff';
import TableDiff from './TableDiff';

const ContentBox =  styled.div`
  padding: 2.5rem;
  margin: 2.5rem 0;
  background-color: var(--white-bkgd);
`;

const ContentBoxTitle = styled.h1`
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

const ContentDiff = () => {
  return <ContentBox>
    <ContentBoxTitle>Report Differences</ContentBoxTitle>
    <ContentBoxText>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sapien tellus. Duis sed dapibus diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      <FormDiff/>
      <TableDiff/>
    </ContentBoxText>
  </ContentBox>
}

export default ContentDiff;
