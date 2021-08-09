import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Page = styled.div`
  background-color: #F9F9F9;
  overflow: auto;
  padding-bottom: 18rem;
`;

const PageContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10rem 0;
`;

const NotFound = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-family: 'Raleway-Medium',sans-serif;
  font-size: 6rem;
  margin: 0 auto;
`;

const SubTitle = styled.h2`
  font-family: 'Raleway-Medium',sans-serif;
  font-size: 2rem;
  margin: 0 auto;
`;

const NotResult = () => {
  return <Page>
      <PageContainer>
        <NotFound>
          <Title>404</Title>
          <SubTitle>Page not found</SubTitle>
          <Link to="/" aria-label="back to home">Back to Home</Link>
        </NotFound>
    </PageContainer>
  </Page>;
}

export default NotResult;
