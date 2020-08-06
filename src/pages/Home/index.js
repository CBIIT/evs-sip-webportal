import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import Graph from './Graph';
import Tools from './Tools'

const Page = styled.div`
  background-color: var(--white);
  padding-bottom: 18rem;
`;


const Test = styled.div`
  text-align: center;

  &::before {
    content: "x";
    font-size: 1rem;
    display: inline-block;
    margin: 0 5px 0 -15px;
    color: #acacac;
    transform: rotate(45deg);
    position: absolute;
  }
`;

const Home = () => {
  return <Page>
      <Test />

      <Search></Search>
      <Graph></Graph>
      <Tools></Tools>
    </Page>;
}

export default Home;
