import React from 'react';
import styled from 'styled-components';
import Graph_View from '../Search/GraphicalView_D3';

const ContentBox =  styled.div`
  padding: 3rem 4rem;
  margin-bottom: 2.5rem;
  background-color: var(--white-bkgd);
`;

const ContentBoxAbout = styled(ContentBox)`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const ContentBoxTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 1.1875rem;
  font-weight: 500;
  color: #00C6FF;
  text-transform: uppercase;
`;

const ContentBoxHr = styled.hr`
  border-top: 1px solid #77B7CD;
  margin-top: 3rem;
  margin-bottom: 3rem;
`;

const ContentBoxText = styled.div`
  margin-bottom: 3rem;

  && > h2 {
    font-family: 'Inter', sans-serif;
    font-size: 1.1875rem;
    font-weight: 500;
    color: #00C6FF;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

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

const GraphContent = styled.div`
  margin: 2rem auto;
  font-size: 1rem;
  background-color: var(--white);
  border-radius: 1rem;
  border: 2px solid #1C87AC;
`;

const CTDCModel = () => {
  return <ContentBoxAbout>
    <ContentBoxText>
      <h2>Graph Representation of the CTDC Data Model</h2>
      <p>
        Donec ac ex ligula. Maecenas vel congue nibh. Phasellus gravida felis nec turpis feugiat fermentum. Suspendisse potenti. Mauris et magna posuere, imperdiet risus eget, pellentesque nibh. Vestibulum id quam sit amet dolor pulvinar cursus quis et metus. Duis consectetur lacus eu ornare consectetur. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut bibendum viverra elit, sed rutrum neque sollicitudin id. Nullam ornare nisl lectus. Phasellus vitae sapien rhoncus, convallis neque sit amet, feugiat libero. Cras sit amet arcu vitae leo ullamcorper congue.
      </p>
      <p>
        Quisque ut lectus aliquet, feugiat nunc a, venenatis mi. Ut id consectetur lorem, nec sagittis libero. Maecenas fermentum vitae nunc in euismod. Aliquam erat volutpat. Sed ullamcorper, est sit amet mollis laoreet, enim nisl mattis risus, vitae tincidunt lacus nibh non sapien. Sed tristique molestie odio. Integer tempus metus congue lectus varius, ac consectetur elit varius. Mauris vel egestas urna, vel molestie turpis. Praesent odio arcu, porta vel justo sit amet, mattis accumsan ipsum. Praesent ipsum tortor, mattis at neque nec, sagittis lacinia metus. Praesent id ligula in odio gravida dictum at quis ligula. Nullam molestie id justo rhoncus lacinia. Aenean ligula odio, luctus in libero a, lobortis luctus diam. Suspendisse elit justo, tincidunt eu lacinia in, egestas consequat arcu. Integer consectetur ante eget risus tempus ultrices.
      </p>
    </ContentBoxText>
    <ContentBoxHr/>
    <ContentBoxTitle>The CTDC Data Model</ContentBoxTitle>
    <GraphContent>
      <Graph_View type="ctdc_readonly"/>
    </GraphContent>
  </ContentBoxAbout>
}

export default CTDCModel;
