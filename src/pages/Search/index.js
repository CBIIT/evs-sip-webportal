import React, { useState, useEffect } from 'react';
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

const Search = (props) => {
  let [keywordState, setKeywordState] = useState(props.location.state !== undefined && props.location.state.keyword !== undefined ? props.location.state.keyword : '');
  let [sourceState, setSourceState] = useState([]);
  let [dataSource, setDataSource] = useState(props.location.state !== undefined && props.location.state.dataSource !== undefined ? props.location.state.dataSource : {});

  const searchHandler = (keyword, options, source) => {
    setKeywordState(keyword);
    setDataSource(source);
    apiSearchAll(keyword, options, source).then(result => setSourceState(result));
  };

  useEffect(() => {
    if(props.location.state !== undefined && props.location.state.keyword !== undefined){
      setKeywordState(props.location.state.keyword);
      searchHandler(props.location.state.keyword, 
      {
        match: false,
        desc: false,
        syns: false
      },
      props.location.state.dataSource);
    }
  },[props.location.state]);

  return <Page>
        <SearchBox searchTrigger={searchHandler}/>
        <MainTabsController keyword={keywordState} source={sourceState} dataOptions={dataSource}/>
    </Page>;
}

export default Search;
