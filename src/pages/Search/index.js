import React, { useState } from 'react';
import styled from 'styled-components';
import { apiSearchAll } from '../../api';
import SearchBox from './SearchBox';
import MainTabsController from './MainTabsController';

// const Page = styled.div`
//   background-color: var(--page-bkgd);
//   overflow: auto;
// `;

const Page = styled.div`
  background-color: var(--white);
  min-height: calc(100vh - 26.5rem);
  padding-bottom: 18rem;
`;

const Search = () => {
  let [keywordState, setKeywordState] = useState('');
  let [sourceState, setSourceState] = useState([]);

  const searchHandler = (keyword, options) => {
    setKeywordState(keyword);
    apiSearchAll(keyword, options).then(result => setSourceState(result));
  };

  return <Page>
        <SearchBox searchTrigger={searchHandler}/>
        <MainTabsController keyword={keywordState} source={sourceState}/>
    </Page>;
}

export default Search;
