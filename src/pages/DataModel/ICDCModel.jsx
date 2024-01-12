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

const ICDCModel = () => {
  return <ContentBoxAbout>
    <ContentBoxText>
      <h2>Graph Representation of the ICDC Data Model</h2>

      <p>
        The ICDC data model is a representation of how all the constituent data are arranged relative to each other. Given the number of studies, the range of study types and the multiple data types that the ICDC needs to support, the data model will need to adapt to the needs of the science. The data model is not static and is expected to change as new needs are identified.
      </p>
      <p>
        The graphic below represents the current ICDC data model consisting of data nodes, node properties, and relationships (edges). It provides a comprehensive mapping of the system data, part of which may be viewed in the application interface and UI. In other words, additional nodes and properties are available for inspection and querying beyond those presented on the front-end.
      </p>
      <p>
        Additionally, the ICDC Data Model serves as a template for similar initiatives and data structures, including graph-based database schemas. The model will continue to evolve as data needs are further discerned.
      </p>
      <p>
        The source of ICDC data model can be found on Github at: <a title="ICDC Model Tool" target="_blank" href="https://github.com/CBIIT/icdc-model-tool" rel="noopener noreferrer">https://github.com/CBIIT/icdc-model-tool</a>.
      </p>
      <p>
        The model and associated files may be viewed here: <a title="Associated ICDC Model Flies" target="_blank" href="https://cbiit.github.io/icdc-model-tool/" rel="noopener noreferrer">https://cbiit.github.io/icdc-model-tool/</a>.
      </p>
    </ContentBoxText>
    <ContentBoxHr/>
    <ContentBoxTitle>The ICDC Data Model</ContentBoxTitle>
    <GraphContent>
      <GraphicalView type="icdc_readonly"/>
    </GraphContent>
  </ContentBoxAbout>
}

export default ICDCModel;
