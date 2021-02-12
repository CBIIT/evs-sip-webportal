import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Button } from 'react-bootstrap';
import { compareAllWithGDCDictionary } from '../../api';

import FormDiff from './FormDiff';
import TabController from './TabController';
import PaginationController from './PaginationController';

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

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ContentDiff = () => {
  let [resultState, setResultState] = useState({});
  let [typeState, setTypeState] = useState('all');
  let [pageState, setPageState] = useState(1);
  let [pageSizeState, setPageSizeState] = useState(25);
  let [totalState, setTotalState] = useState(0);
  let [pageCountState, setPageCountState] = useState(0);

  const reportTrigger = () => {
    compareAllWithGDCDictionary()
    .then(result => {
      setResultState(result.data);
      setPageState(result.pageInfo.page);
      setPageSizeState(result.pageInfo.pageSize);
      setTotalState(result.pageInfo.total);
      setPageCountState(result.pageInfo.total / result.pageInfo.pageSize);
    });
  };

  const handleSelectTab = (type) => {
    compareAllWithGDCDictionary(type, pageState, pageSizeState)
    .then(result => {
      setResultState(result.data);
      setTypeState(type);
      setPageState(result.pageInfo.page);
      setPageSizeState(result.pageInfo.pageSize);
      setPageCountState(result.pageInfo.total / result.pageInfo.pageSize);
    });
  };

  const handlePageClick = (data) => {
    const page = data.selected + 1;
    compareAllWithGDCDictionary(typeState, page, pageSizeState)
    .then(result => {
      setResultState(result.data);
      setPageState(result.pageInfo.page);
      // setPageSizeState(result.pageInfo.pageSize);
      // setPageCountState(result.pageInfo.total / result.pageInfo.pageSize);
    });
  }

  const handlepageSizeChange = (event) => {
    //setPageSizeState(event.target.value);
    const pageSize = event.target.value

    compareAllWithGDCDictionary(typeState, pageState, pageSize)
    .then(result => {
      setResultState(result.data);
      // setPageState(result.pageInfo.page);
      setPageSizeState(result.pageInfo.pageSize);
      setPageCountState(result.pageInfo.total / result.pageInfo.pageSize);
    });
  }

  return <ContentBox>
    <ContentBoxTitle>Report Differences</ContentBoxTitle>
    <ContentBoxText>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut sapien tellus. Duis sed dapibus diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
      <FormDiff reportTrigger={reportTrigger}/>
      { !_.isEmpty(resultState) &&
        <>
          <TitleContainer>
            <h2>Result</h2>
          </TitleContainer>
          <TabController selectTab={handleSelectTab} type={typeState} result={resultState}/>
          <PaginationController pageClick={handlePageClick} pageSizeChange={handlepageSizeChange} currentPage={pageState} pageSize={pageSizeState} pageCount={pageCountState} total={totalState}/>
        </>
      }
    </ContentBoxText>
  </ContentBox>
}

export default ContentDiff;
