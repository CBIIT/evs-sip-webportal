import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { getHighlightObj } from '../../shared';

// import GDCTerms from './dialogs/GDCTerms'

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

const TableThead = styled(Row)`
  background: #535F74;
  display: flex;
  align-items: center;
  border-radius: 0.8rem 0.8rem 0 0;
  padding-right: 0.5rem
`;

const TableTh = styled.div`
  font-family: 'Lato-Bold', sans-serif;
  font-size: 1rem;
  text-align: left;
  color: var(--white);
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
`;

const TableBody = styled(Row)`
  overflow-y: auto;
  max-height: 39rem;
`;

// const TableRow = styled(Row)`
//   border-bottom: 1px solid #ecf0f1;
// `;

const TableRow = styled(Row)`
  height: auto;
  flex-basis: auto;
  flex-grow: 1;
`;

const TableCol = styled(Col)`
  text-align: left;
  padding-top: 12px;
  padding-bottom: 12px;
  line-height: 1.428571;
`;

const TableColLeft = styled(TableCol)`
  border-bottom: 1px solid #BBC5CD;
`;

const TableColRight = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-left: 1px solid #BBC5CD;
`;

const TableColFlex = styled(Col)`
  display: flex;
`;

const TableRowProps = styled(Row)`
  height: 100%;
  flex-basis: auto;
  flex-grow: 1;
  border-bottom: 1px solid #BBC5CD;
`;

const TableUl = styled.ul`
  padding-left: 15px;
  list-style: none;
`;

const TableLi = styled.li`
  position: relative;
  word-wrap: break-word;
`;

const SpanIcon = styled.span`
  left: -0.9rem;
  top: 0.2rem;
  position: absolute;
  width: 1rem;
  line-height: inherit;
  color: var(--checkbox-green);
  transform: rotate(45deg);
`;

// const SpanBreak = styled.span`
//   word-wrap: break-word;
// `;

const DivCenter = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const CodeSpan = styled.span`
  color: #475162;
  font-size: 1.25rem;
  font-weight: bold;
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
    propObj.source = source.source;
    propObj.property = highlightPropertyObj[source.prop] ? highlightPropertyObj[source.prop] : source.prop;
    propObj.property_desc = highlightPropertyDescObj[source.prop] ? highlightPropertyDescObj[source.prop] : source.prop_desc;
    //if (source.type !== undefined && source.type !== '' && source.type !== 'enum') propObj.type = source.type;
    if (source.type !== undefined && source.type !== '') propObj.type = source.type;
    if (source.enum !== undefined) propObj.enum = source.enum;
    if (source.cde !== undefined) {
      propObj.cdeId = highlightCdeIdObj[source.cde.id] ? highlightCdeIdObj[source.cde.id] : source.cde.id;
      propObj.cdeSrc =source.cde.src;
      propObj.cdeUrl = source.cde.url;
    }
    properties.push(propObj);
  });

  let mappingObj = {};
  properties.forEach((prop) => {
    if(prop.cdeId !== undefined && prop.cdeSrc !== 'CDE ID') {
      if(mappingObj[prop.cdeId] === undefined) {
        mappingObj[prop.cdeId] = [];
        mappingObj[prop.cdeId].push(prop);
      } else {
        mappingObj[prop.cdeId].push(prop);
      }
    } 
    else {
      if(mappingObj['no-mapping'] === undefined) {
        mappingObj['no-mapping'] = [];
        mappingObj['no-mapping'].push(prop);
      } else {
        mappingObj['no-mapping'].push(prop);
      }
    }
  });

  let crossProps = [];

  Object.entries(mappingObj).forEach((entry)=> {
    let ctdcProps = [];
    let gdcProps = [];
    let icdcProps = [];
    //let refSrc = '';

    if(entry[1] !== undefined && entry[1].length !== 0){
      entry[1].forEach(prop => {
        // if(refSrc === '' && prop.cdeSrc !== undefined){
        //   refSrc = prop.cdeSrc;
        // }
        if(prop.source !== undefined && prop.source === 'gdc'){
          gdcProps.push(prop);
        }
        if(prop.source !== undefined && prop.source === 'ctdc'){
          ctdcProps.push(prop);
        }
        if(prop.source !== undefined && prop.source === 'icdc'){
          icdcProps.push(prop);
        }
      });
    }

    crossProps.push({
      code: entry[0] !== 'no-mapping' ? entry[0]: 'No NCIt Mapping',
      ref: 'NCIt',
      props: {
        ctdc: ctdcProps,
        gdc: gdcProps,
        icdc: icdcProps,
      }
    })
  });

  console.log(crossProps);

  // const propsItems = properties.map((item, index) =>
  //   <TableRow key={index}>
  //     <TableCol xs={2}>
  //       {item.category}
  //       <TableUl>
  //         <TableLi>
  //           <SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{item.node}
  //         </TableLi>
  //       </TableUl>
  //     </TableCol>
  //     <TableCol xs={2}>
  //       <SpanBreak dangerouslySetInnerHTML={{ __html: item.property }}></SpanBreak>
  //       {/* <LinkBreak href="/#" dangerouslySetInnerHTML={{ __html: item.property }}></LinkBreak> */}
  //     </TableCol>
  //     <TableCol xs={4} dangerouslySetInnerHTML={{ __html: item.property_desc }}></TableCol>
  //     <TableCol xs={1}>{item.source.toUpperCase()}</TableCol>
  //     <TableCol xs={2}>
  //       {item.enum !== undefined
  //         ? <div>
  //           <span>See All Values</span><br/>
  //           <span>Compare with User List</span>
  //           {/* <a id="getGDCTerms" href="/#" data-ref="">See All Values</a><br />
  //           <a id="toCompare" href="/#" data-ref="">Compare with User List</a> */}
  //         </div>
  //         : <div>
  //           {item.type !== undefined && <SpanBreak>type: {item.type}</SpanBreak>}
  //         </div>
  //       }
  //     </TableCol>
  //     <TableCol xs={1}>
  //     {item.cdeId !== undefined && 
  //       <span dangerouslySetInnerHTML={{ __html: item.cdeSrc + ' - ' + item.cdeId}}></span>
  //     }
  //     </TableCol>
  //   </TableRow>
  // );


  const PropsItems = (props) => {
    return (
      <TableColFlex data-class="TableColFlex" sx={12}>
        <TableRow>
          <TableCol data-class="TableCol" xs={3}>
            {props.item.category}
            <TableUl>
              <TableLi>
                <SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{props.item.node}
              </TableLi>
            </TableUl>
            {/* <GDCTerms idterm={item.id}/> */}
          </TableCol>
          <TableColRight data-class="TableColRight" xs={9}>
              <div>
                <span dangerouslySetInnerHTML={{ __html: props.item.property}}></span><br/>
                <div>{props.item.property_desc}</div>
              </div>
          </TableColRight>
        </TableRow>
      </TableColFlex>
    )
  };

  const PropsItemsContainer = (props) => {
    return(
      <Row key={props.index}>
        <TableColLeft data-class="TableColLeft" xs={2}>
          <DivCenter>
            <CodeSpan>{props.cross.code}<br/>({props.cross.ref})</CodeSpan>
          </DivCenter>
        </TableColLeft>
        <TableColRight data-class="TableColRight" xs={10}>
          {props.cross.props.gdc.length !== 0 &&
            <TableRow>
              <TableColLeft data-class="TableColLeft" xs={2}>
                <DivCenter>Genomic Data Commons</DivCenter>
              </TableColLeft>
              <TableColRight data-class="TableColRight" xs={10}>
                {props.cross.props.gdc.map((prop, index) =>
                  <TableRowProps data-class="TableRowValues" key={index}>
                    <PropsItems item={prop}/>
                  </TableRowProps>
                )}
              </TableColRight>
            </TableRow>
          }
          {props.cross.props.ctdc.length !== 0 &&
            <TableRow>
              <TableColLeft data-class="TableColLeft" xs={2}>
                <DivCenter>Clinical Trials Data Commons</DivCenter>
              </TableColLeft>
              <TableColRight data-class="TableColRight" xs={10}>
                {props.cross.props.ctdc.map((prop, index) =>
                  <TableRowProps data-class="TableRowValues" key={index}>
                    <PropsItems item={prop}/>
                  </TableRowProps>
                )}
              </TableColRight>
            </TableRow>
          }
          {props.cross.props.icdc.length !== 0 &&
            <TableRow>
              <TableColLeft data-class="TableColLeft" xs={2}>
                <DivCenter>Integrated Canine Data Commons</DivCenter>
              </TableColLeft>
              <TableColRight data-class="TableColRight" xs={10}>
                {props.cross.props.icdc.map((prop, index) =>
                  <TableRowProps data-class="TableRowValues" key={index}>
                    <PropsItems item={prop}/>
                  </TableRowProps>
                )}
              </TableColRight>
            </TableRow>
          }
        </TableColRight>
      </Row>
    )
  };


  if (crossProps.length !== 0) {
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
          <Col xs={1}>
            <TableTh>Source</TableTh>
          </Col>
          <Col xs={2}>
            <TableTh>Property Values</TableTh>
          </Col>
          <Col xs={1}>
            <TableTh>Mapped Code</TableTh>
          </Col>
        </TableThead>
        <TableBody>
          {/* <Col xs={12}>{propsItems}</Col> */}
          <Col xs={12}>
            {crossProps.map((cross, index) => 
              <PropsItemsContainer cross={cross} key={index} />
            )}
          </Col>
        </TableBody>
      </ContainerStyled>
    );
  } else {
    return (
      <ContainerStyled>
        <Indicator>
          <IndicatorContent>
            Sorry, no results found.
          </IndicatorContent>
        </Indicator>
      </ContainerStyled>
    );
  }
};

export default PropsTable;
