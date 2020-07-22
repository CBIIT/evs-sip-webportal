import React from 'react';
import styled from 'styled-components';

import bkgd from '../../assets/img/about-evs.jpg';

const ContentBox =  styled.div`
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  background-color: var(--white-bkgd);
`;

const ContentBoxAbout = styled(ContentBox)`
  background-image: url(${bkgd});
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

const Description = () => {
  return <ContentBoxAbout>
    <ContentBoxTitle>About EVS-SIP</ContentBoxTitle>
    <ContentBoxText>
      <p>
        The EVS Semantic Integration Platform (EVS-SIP) is a 
        service developed and maintained by the National Cancer 
        Institute (NCI) Enterprise Vocabulary Service (EVS) (INSERT LINK). 
        The EVS-SIP permits search and retrieval of terms contained in or 
        across the data dictionaries or data models of repositories participating 
        in the Cancer Research Data Commons (CDRC) and beyond.
      </p>
      <p>
        The purpose of the EVS-SIP is the identification of semantically similar 
        concepts across multiple sources. Semantic similarity or synonymy is 
        inferred from mappings to the NCI Thesaurus. Subject matter experts 
        provide mappings from terms that are native to the data source to concepts 
        contained in the NCI Thesaurus.
      </p>
      <p>
        Mapping from native terminology to NCIt standard terminology permits search 
        and retrieval by leveraging synonyms found in NCI Thesaurus, rather than using 
        synonyms that would otherwise need to be stored in a data repository. 
        Additionally, EVS-SIP provides references to external data standards through 
        relationships defined and maintained by NCI Thesaurus. The platform also promotes 
        reuse and harmonization of terminology across multiple data repositories by providing 
        relationships between the terms in each catalogue and visual representations of the 
        models used for data collection.
      </p>
    </ContentBoxText>
  </ContentBoxAbout>
}

export default Description;
