import React, { useState } from 'react';
import styled from 'styled-components';
import { apiSearchAll } from '../../api';
import Search from './Search';
import Graph from './Graph';
import Tools from './Tools'

const Page = styled.div`
  background-color: var(--white);
  padding-bottom: 18rem;
`;

const Home = () => {
  let [keywordState, setKeywordState] = useState('');
  let [sourceState, setSourceState] = useState([]);

  const searchHandler = (keyword, options, source) => {
    setKeywordState(keyword);
    apiSearchAll(keyword, options).then(result => {
      setSourceState(result);
    });
  };

  return <Page>
      <Search searchTrigger={searchHandler}></Search>
      <Graph></Graph>
      <Tools></Tools>
    </Page>;
}

export default Home;
