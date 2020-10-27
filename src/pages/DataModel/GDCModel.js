import React from 'react';
import styled from 'styled-components';
import GraphicalView from '../../components/GraphicalView';

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
  color: #009ECC;
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
    color: #009ECC;
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
`;

const GDCModel = () => {
  return <ContentBoxAbout>
    <ContentBoxText>
      <h2>Graph Representation of the GDC Data Model</h2>
      <p>
        The GDC data model is represented as a graph with nodes and edges, and this graph 
        is the store of record for the GDC. It maintains the critical relationship between 
        projects, cases, clinical data and molecular data and insures that this data is 
        linked correctly to the actual data file objects themselves, by means of unique 
        identifiers. The graph is designed in terms of the "property graph" model, in which 
        nodes represent entities, edges between nodes represent relationships between entities, 
        and properties on both nodes and edges represent additional data which describe 
        entities and their relationships. Relationships are encoded as edges of a given 
        type which associate exactly two nodes. Properties of nodes or relationships are 
        sets of key-value pairs.
      </p>
      <p>
        Original metadata as submitted by external users is extracted and loaded first into 
        the graph. Representations of the data provided by the other GDC components are derived 
        from the authoritative graph model. Note that file and archive objects are not stored in 
        the graph, but rather in an external object store. The node/edge structure of the graph 
        is depicted below.
      </p>
    </ContentBoxText>
    <ContentBoxHr/>
    <ContentBoxTitle>The GDC Data Model</ContentBoxTitle>
    <GraphContent>
      <GraphicalView type="gdc_readonly"/>
    </GraphContent>
  </ContentBoxAbout>
}

export default GDCModel;
