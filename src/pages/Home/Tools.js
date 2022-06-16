import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Row, Col} from 'react-bootstrap';

import bkgd from '../../assets/img/tools-bkgd.jpg';
import dataCommonsImg from '../../assets/img/data-commons.png';
import SemanticImg from '../../assets/img/semantic.png';
import ToolsImg from '../../assets/img/tools.png';
import SupportImg from '../../assets/img/support.png';

const ToolsSection = styled.section`
  height: 50rem;
  background-color: var(--tools-green);
  background: linear-gradient(90deg, var(--white-bkgd) 40%, var(--tools-green) 40%);
`;

const ToolsContainer = styled(Container)`
  max-width: 80rem;
  background: url(${bkgd}) no-repeat top;
  height: 100%;
`;

const RowStyled = styled(Row)`
  height: 100%;
`;

const FourTools = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 3rem;
`;

const FourToolsContainer  = styled.div`
  height: 36rem;
  width: 40rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const LinkContainer = styled.div`
  display: block;
  width: 100%;
`;

const ToolBoxLink = styled(Link)`
  display: block;
  line-height: 2rem;
  font-family: 'Raleway-ExtraBold', sans-serif;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.0625rem;
`;

const ToolBox = styled.div`
  width: 17rem;
  margin: 0.8rem 1rem;

  && ${LinkContainer} ${ToolBoxLink} {
    background-color: var(--toolbox-link);
    color: var(--white);
    border-radius: 0 0 1rem 1rem;
    border: var(--toolbox-link) 0.125rem solid;
    font-size: 0.6875rem;
    padding: 0;
  }

  && ${LinkContainer} ${ToolBoxLink}:hover,
  && ${LinkContainer} ${ToolBoxLink}:focus {
    background-color: var(--toolbox-link-select);
    border: var(--toolbox-link-select) 0.125rem solid;
    color: #b9fee6;
    text-decoration: underline;
  }
`;

const ToolBoxContainer = styled.div`
  width: 100%;
  height: 14rem;
  border: #B7B7B7 0.125rem solid;
  border-bottom: none;
  border-radius: 1rem 1rem 0 0;
`;

const ToolBoxImg = styled.img`
  max-width: 5rem;
  margin: 3rem auto 1.5rem;
  display: block;
`;

const ToolBoxTitleContainer = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;

const ToolBoxTitle = styled.strong`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--toolbox-title);
  text-transform: uppercase;
  width: 8rem;
  inline-size: 8rem;
  margin: auto;
  text-align: center;
  line-height: 1rem;
  letter-spacing: 0.03125rem;
`;

const ToolTitleContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToolTitle = styled.h2`
  font-family: 'Raleway-Medium', sans-serif;
  width: 10rem;
  inline-size: 10rem;
  font-size: 2.25rem;
  line-height: 2.8rem;
  font-weight: 500;
`;

const Tools = () => {
  return <ToolsSection>
    <ToolsContainer>
      <RowStyled>
        <Col xs={9}>
          <FourTools>
            <FourToolsContainer>
              <ToolBox>
                <ToolBoxContainer>
                  <ToolBoxImg alt="data commons" src={dataCommonsImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Data Commons</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                </ToolBoxContainer>
                <LinkContainer>
                  <ToolBoxLink className="btn" to="/datamodel" aria-label="Read More About Data Commons" title="Read More About Data Commons">Read More</ToolBoxLink>
                </LinkContainer>
              </ToolBox>
              <ToolBox>
                <ToolBoxContainer>
                  <ToolBoxImg alt="semantic" src={SemanticImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Semantic Integration</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                </ToolBoxContainer>
                <LinkContainer>
                  <ToolBoxLink className="btn" to="/about" aria-label="Read More About Semantic Integration" title="Read More About Semantic Integration">Read More</ToolBoxLink>
                </LinkContainer>
              </ToolBox>
              <ToolBox>
                <ToolBoxContainer>
                  <ToolBoxImg alt="tools" src={ToolsImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Tools</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                </ToolBoxContainer>
                <LinkContainer>
                  <ToolBoxLink className="btn" to="/about" aria-label="Read More About Tools" title="Read More About Tools">Read More</ToolBoxLink>
                </LinkContainer>
              </ToolBox>
              <ToolBox>
                <ToolBoxContainer>
                  <ToolBoxImg alt="support" src={SupportImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Support</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                </ToolBoxContainer>
                <LinkContainer>
                  <ToolBoxLink className="btn" to="/about" aria-label="Read More About Support" title="Read More About Support">Read More</ToolBoxLink>
                </LinkContainer>
              </ToolBox>
            </FourToolsContainer>
          </FourTools>
        </Col>
        <Col xs={3}>
          <ToolTitleContainer>
            <ToolTitle>Data Transfer Tools</ToolTitle>
          </ToolTitleContainer>
        </Col>
      </RowStyled>
    </ToolsContainer>
  </ToolsSection>;
}

export default Tools;
