import React from 'react';
import styled from 'styled-components';
import { Table } from 'react-bootstrap';

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

const ContentBoxTextFullWidth = styled(ContentBoxText)`
  max-width: 100%; 
`;

const ContentBoxTable = styled(Table)`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  text-align: center;

  && thead th {
    background-color: var(--table-th);
    color: var(--white);
    font-weight: normal;
    text-transform: uppercase;
    font-size: 0.8125rem;
    border: none;
    padding: 8px;
  }

  && th,
  && td {
    border: none;
    vertical-align: middle;
  }
`;

const ContentThTitle = styled.h3`
  font-size: 0.9375rem;
  inline-size: 13rem;
  text-align: left;
  margin: 0 auto;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 1.5em;
`;

const DataSources = () => {
  return <ContentBox>
    <ContentBoxTitle>Integrated Data Sources</ContentBoxTitle>
    <ContentBoxTextFullWidth>
      <ContentBoxTable striped>
        <thead>
          <tr>
            <th>Data source</th>
            <th>URL</th>
            <th>inception date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><ContentThTitle>Integrated Canine<br/>Data Commons</ContentThTitle></td>
            <td><a href="https://caninecommons.cancer.gov" target="_blank" rel="noopener noreferrer">https://caninecommons.cancer.gov</a></td>
            <td>September 2019</td>
          </tr>
          <tr>
          <td><ContentThTitle>Genomic Data Commons</ContentThTitle></td>
            <td><a href="https://gdc.cancer.gov/" target="_blank" rel="noopener noreferrer">https://gdc.cancer.gov/</a></td>
            <td>September 2019</td>
          </tr>
          <tr>
          <td><ContentThTitle>Clinical Trials<br/>Data Commons</ContentThTitle></td>
            <td><a href="https://trialcommons-dev.cancer.gov" target="_blank" rel="noopener noreferrer">https://trialcommons-dev.cancer.gov</a></td>
            <td>September 2019</td>
          </tr>
        </tbody>
      </ContentBoxTable>
    </ContentBoxTextFullWidth>
  </ContentBox>
}

export default DataSources;
