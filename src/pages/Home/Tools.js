import React from 'react';
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

const ToolBox = styled.div`
  width: 17rem;
  margin: 0.8rem 1rem;
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
  margin: 2rem auto 1.3rem;
  display: block;
`;


const ToolBoxTitleContainer = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
`;

const ToolBoxTitle = styled.h4`
  font-family: 'Inter', sans-serif;
  font-size: 0.9375rem;
  font-weight: bold;
  color: var(--toolbox-title);
  text-transform: uppercase;
  inline-size: 8rem;
  margin: auto;
  text-align: center;
  line-height: 0.9375rem;
  letter-spacing: 0.03125rem;
`;

const ToolBoxParagragh = styled.p`
  font-family: 'Inter', sans-serif;
  font-weight: normal;
  font-size: 0.875rem;
  color: var(--toolbox-paragraph);
  text-align: left;
  margin: auto;
  padding: 0.7rem 0.7rem;
  inline-size: 14.3rem;
  line-height: 1.0625rem;
`;

const ToolBoxLink = styled.a`
  width: 100%;
  line-height: 2rem;
  font-family: 'Raleway-ExtraBold', sans-serif;
  background-color: var(--toolbox-link);
  color: var(--white);
  text-transform: uppercase;
  display: block;
  border-radius: 0 0 1rem 1rem;
  border: var(--toolbox-link) 0.125rem solid;
  font-size: 0.6875rem;
  text-align: center;
  letter-spacing: 0.0625rem;

  &&:hover,
  &&:visited,
  &&:link,
  &&:active {
    text-decoration: none;
  }

  &&:hover,
  &&:focus {
    background-color: var(--toolbox-link-select);
    border: var(--toolbox-link-select) 0.125rem solid;
    color: var(--white);
    outline: none;
  }

`; 

const ToolTitleContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToolTitle = styled.h3`
  font-family: 'Raleway-Medium', sans-serif;
  inline-size: 10rem;
  font-size: 2.25rem;
  line-height: 2.8rem;
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
                  <ToolBoxImg src={dataCommonsImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Data Commons</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                  <ToolBoxParagragh>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</ToolBoxParagragh>
                </ToolBoxContainer>
                <ToolBoxLink href="/">Read More</ToolBoxLink>
              </ToolBox>
              <ToolBox>
                <ToolBoxContainer>
                  <ToolBoxImg src={SemanticImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Semantic Integraction</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                  <ToolBoxParagragh>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</ToolBoxParagragh>
                </ToolBoxContainer>
                <ToolBoxLink href="/">Read More</ToolBoxLink>
              </ToolBox>
              <ToolBox>
                <ToolBoxContainer>
                  <ToolBoxImg src={ToolsImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Tools</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                  <ToolBoxParagragh>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</ToolBoxParagragh>
                </ToolBoxContainer>
                <ToolBoxLink href="/">Read More</ToolBoxLink>
              </ToolBox>
              <ToolBox>
                <ToolBoxContainer>
                  <ToolBoxImg src={SupportImg}></ToolBoxImg>
                  <ToolBoxTitleContainer>
                    <ToolBoxTitle>Support</ToolBoxTitle>
                  </ToolBoxTitleContainer>
                  <ToolBoxParagragh>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</ToolBoxParagragh>
                </ToolBoxContainer>
                <ToolBoxLink href="/">Read More</ToolBoxLink>
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
