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
  padding-bottom: 18rem;
`;

const Search = () => {
  let [keywordState, setKeywordState] = useState('');
  let [sourceState, setSourceState] = useState([]);
  let [dataSource, setdataSource] = useState({});

  const searchHandler = (keyword, options, source) => {
    setKeywordState(keyword);
    setdataSource(source)
    apiSearchAll(keyword, options).then(result => setSourceState(result));
  };

  return <Page>
        <SearchBox searchTrigger={searchHandler}/>
        <MainTabsController keyword={keywordState} source={sourceState} dataOptions={dataSource}/>
    </Page>;
}

export default Search;
