import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const ContainerStyled = styled(Container)`
  font-size: 1rem;
  padding-left: 15px;
  padding-right: 15px;
  background-color: var(--white-bkgd);
  border-radius: 1rem;
  height: 45rem;
  border: 2px solid #535F74;
  overflow: hidden;
`;

const Indicator = styled.div`
  position: relative;
  padding-bottom: 36%;
`;

const IndicatorContent = styled.div`
  width: 60%;
  min-width: 550px;
  text-align: center;
  margin: auto;
  padding: 1em 0;
  background-color: #fff;
  color: #535a60;
  font-size: 1.2em;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
`;

const NodesTable = (props) => {
  return (
    <ContainerStyled>
      <Indicator>
        <IndicatorContent>
          Sorry, no results found.
        </IndicatorContent>
      </Indicator>
    </ContainerStyled>
  );
};

export default NodesTable;
