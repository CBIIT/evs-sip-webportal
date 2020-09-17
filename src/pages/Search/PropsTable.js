import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { getHighlightObj } from '../../shared';

const ContainerStyled = styled(Container)`
  font-size: 1rem;
  padding-left: 15px;
  padding-right: 15px;
  background-color: var(--white);
  border-radius: 1rem;
  height: 45rem;
  border: 2px solid #535F74;
`;

const TableThead = styled(Row)`
  background: #535F74;
  display: flex;
  align-items: center;
  border-radius: 0.8rem 0.8rem 0 0;
`;

const TableTh = styled.div`
  font-family: 'Lato-Bold', sans-serif;
  font-size: 1rem;
  text-align: center;
  color: var(--white);
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
`;

const TableBody = styled(Row)`
  overflow-y: auto;
  max-height: 40rem;
`;

const TableRow = styled(Row)`
  border-bottom: 1px solid #ecf0f1;
`;

const TableCol = styled(Col)`
  text-align: left;
  padding-top: 12px;
  padding-bottom: 12px;
  line-height: 1.428571;
`;

const LinkBreak = styled.a`
  word-wrap: break-word;
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

const IndicatorTerm = styled.span`
  color: #2a72a4;
`;


const PropsTable = (props) => {
  let items = JSON.parse(JSON.stringify(props.properties));
  let properties = [];

  items.forEach(item => {
    if (item.highlight === undefined) return;
    let source = item._source;
    let highlight = item.highlight;

    let highlightProperty = ('prop' in highlight) || ('prop.have' in highlight) ? highlight['prop'] || highlight['prop.have'] : undefined;
    let highlightPropertyObj = getHighlightObj(highlightProperty);

    let highlightPropertyDesc = ('prop_desc' in highlight) ? highlight['prop_desc'] : undefined;
    let highlightPropertyDescObj = {};
    if (highlightPropertyDesc !== undefined) {
      highlightPropertyDesc.forEach(val => {
        if (highlightPropertyDescObj[source.prop] === undefined) highlightPropertyDescObj[source.prop] = val;
      });
    }

    let highlightCdeId = ('cde.id' in highlight) ? highlight['cde.id'] : undefined;
    let highlightCdeIdObj = getHighlightObj(highlightCdeId);

    let propObj = {};
    propObj.category = source.category;
    propObj.node = source.node;
    propObj.id = source.id;
    propObj.property = highlightPropertyObj[source.prop] ? highlightPropertyObj[source.prop] : source.prop;
    propObj.property_desc = highlightPropertyDescObj[source.prop] ? highlightPropertyDescObj[source.prop] : source.prop_desc;
    if (source.type !== undefined && source.type !== '' && source.type !== 'enum') propObj.type = source.type;
    if (source.enum !== undefined) propObj.enum = source.enum;
    if (source.cde !== undefined) {
      propObj.cdeId = highlightCdeIdObj[source.cde.id] ? highlightCdeIdObj[source.cde.id] : source.cde.id;
      propObj.cdeUrl = source.cde.url;
    }
    properties.push(propObj);
  });

  const propsItems = properties.map((item, index) =>
    <TableRow key={index}>
      <TableCol xs={2}>
        {item.category}
        <ul>
          <li>{item.node}</li>
        </ul>
      </TableCol>
      <TableCol xs={2}>
        <LinkBreak href="/#" dangerouslySetInnerHTML={{ __html: item.property }}></LinkBreak>
      </TableCol>
      <TableCol xs={4} dangerouslySetInnerHTML={{ __html: item.property_desc }}></TableCol>
      <TableCol xs={2}>
        {item.enum !== undefined
          ? <div>
            <a id="getGDCTerms" href="/#" data-ref="">See All Values</a><br />
            <a id="toCompare" href="/#" data-ref=""> Compare with User List</a>
          </div>
          : <div>{item.type}</div>
        }
      </TableCol>
      <TableCol xs={2}>
      <a href="/#" target="_blank" dangerouslySetInnerHTML={{ __html: 'CDE ID - ' + item.cdeId}}></a>
      </TableCol>
    </TableRow>
  );

  if (properties.length !== 0) {
    return (
      <ContainerStyled>
      <TableThead>
          <Col xs={2}>
            <TableTh>Category / Node</TableTh>
          </Col>
          <Col xs={2}>
            <TableTh>Property</TableTh>
          </Col>
          <Col xs={4}>
            <TableTh>Description</TableTh>
          </Col>
          <Col xs={2}>
            <TableTh>GDC Property Values</TableTh>
          </Col>
          <Col xs={2}>
            <TableTh>caDSR CDE Reference</TableTh>
          </Col>
        </TableThead>
        <TableBody>
          <Col xs={12}>{propsItems}</Col>
        </TableBody>
      </ContainerStyled>
    );
  } else {
    return (
      <ContainerStyled>
        <Indicator>
          <IndicatorContent>
            Sorry, no results found for keyword: <IndicatorTerm>Keyword</IndicatorTerm>
          </IndicatorContent>
        </Indicator>
      </ContainerStyled>
    );
  }
};

export default PropsTable;
