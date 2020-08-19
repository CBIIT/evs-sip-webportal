import React from 'react';
import styled from 'styled-components';
import Graph_View from '../Search/GraphicalView_D3';

const ContentBox =  styled.div`
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  background-color: var(--white-bkgd);
`;

const ContentBoxAbout = styled(ContentBox)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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

const Content = styled.div`
  margin-top: 2rem;
`;

const ICDCModel = () => {
  return <ContentBoxAbout>
    <ContentBoxTitle>Graph Representation of the ICDC Data Model</ContentBoxTitle>
    <ContentBoxText>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere sollicitudin augue, eget sodales diam tincidunt vel. Donec euismod orci neque, quis pulvinar est faucibus id. Praesent in rutrum risus. Nullam pretium placerat neque. Duis et arcu eget arcu semper cursus. Integer et volutpat urna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras elit mauris, condimentum vitae erat a, feugiat ullamcorper orci. Vivamus a sem ut sapien porttitor congue dapibus quis quam. Nulla a tortor lacinia, sodales arcu a, consequat nisi. Praesent eros turpis, gravida vitae nisl sit amet, volutpat vehicula ipsum.
      </p>
      <p>
      Aenean vitae faucibus leo. Morbi nec lectus ligula. Quisque tristique in justo ac semper. Morbi nunc odio, viverra a accumsan non, porta nec sem. Cras condimentum lectus sed massa iaculis blandit. Nulla pharetra lacus risus, quis tincidunt ipsum rutrum in. Donec consectetur feugiat tincidunt. Nulla massa turpis, ullamcorper volutpat finibus sed, mollis at ligula. Vivamus sed lectus a quam dapibus fringilla. Praesent mollis urna non massa pretium pellentesque. Etiam vitae nunc quam. Vestibulum et ipsum eget purus elementum euismod id et eros. Donec sodales augue libero, vitae tristique magna fermentum non. Quisque vel lectus ut diam ultricies pulvinar. Sed imperdiet, purus eget venenatis tristique, risus justo pulvinar odio, ac ullamcorper tellus mi eget tortor.
      </p>
    </ContentBoxText>
    <Content>
      <Graph_View type="icdc_readonly"/>
    </Content>
  </ContentBoxAbout>
}

export default ICDCModel;
