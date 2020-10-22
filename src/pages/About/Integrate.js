import React from 'react';
import styled from 'styled-components';

import bkgd from '../../assets/img/integrate-evs.jpg';

const ContentBox =  styled.div`
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  background-color: var(--white-bkgd);
`;

const ContentBoxIntegrate = styled(ContentBox)`
  background-image: url(${bkgd});
  background-position: right;
  background-repeat: no-repeat;
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
  max-width: 44rem;

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

const Integrate = () => {
  return <ContentBoxIntegrate>
    <ContentBoxTitle>EVS-SIP Data Integration Process</ContentBoxTitle>
    <ContentBoxText>
      <p>EVS-SIP is an open platform and can integrate data models from any sources into the platform. Please execute the following steps:</p>  
      <p>
      <b>Step 1: Data model preparation</b><br/>
        To establish a data model for EVS-SIP, we recommend use of the Metadata Description Framework (MDF) tool. 
        For details on how to setup a data model, please see: <a href="https://github.com/CBIIT/bento-mdf/tree/master/setup" target="_blank" rel="noopener noreferrer">https://github.com/CBIIT/bento-mdf/tree/master/setup</a>. 
        For specifications on defining properties, values and relationships of a data model, please refer to: <a href="https://github.com/CBIIT/bento-mdf#model-description-files-mdf" target="_blank" rel="noopener noreferrer">https://github.com/CBIIT/bento-mdf#model-description-files-mdf</a>.
      </p>
      <p>
        <b>Step 2: EVS-SIP in-take process and continuous data model update</b><br/>
        The initial EVS-SIP in-take process can begin with an unmapped MDF data model or with a model that has been partially 
        or fully mapped to standardized vocabularies (see step 3 for details) or harmonized with pre-existing models found in EVS-SIP. 
        The EVS-SIP platform supports on-going model changes and mapping updates. 
        All modifications will be promoted to production tier on a regular cycle.
      </p>
      <p>
        <b>Step 3: Data Model Mapping</b><br/>
        Model atoms (i.e. properties, permissible values, etc.) can be mapped to the NCI Thesaurus (NCIt) and integrated vocabularies. 
        Mapping of all data model atoms to NCIt or ICD-O-3 codes is a manual process performed by terminology experts. 
        Please contact EVS team @ <a href="mailto:ncithesaurus@mail.nih.gov">ncithesaurus@mail.nih.gov</a> with questions or for assistance.
      </p>
    </ContentBoxText>
  </ContentBoxIntegrate>
}

export default Integrate;
