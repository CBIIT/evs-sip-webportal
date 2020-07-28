import React, { useState } from 'react';
import styled from 'styled-components';
import { apiSearchAll } from '../../api';
import SearchBox from './SearchBox';
import TabsController from './TabsController';

const Page = styled.div`
  background-color: var(--page-bkgd);
  overflow: auto;
`;

const PageContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  background-color: var(--white);
  padding: 2rem;
`;

const Search = () => {
  let [keywordState, setKeywordState] = useState('');
  let [sourceState, setSourceState] = useState([]);

  const searchHandler = (keyword, options) => {
    setKeywordState(keyword);
    apiSearchAll(keyword, options).then(result => setSourceState(result));
  };

  return <Page>
      <PageContainer>
        <SearchBox searchTrigger={searchHandler}/>
        <TabsController keyword={keywordState} source={sourceState}/>
      </PageContainer>;
    </Page>
}

export default Search;
