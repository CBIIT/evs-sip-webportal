import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Table, Tab, Nav, Collapse} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { getHighlightObj, sortAlphabetically, sortSynonyms } from '../../shared';


// import GDCTerms from './dialogs/GDCTerms';

const ContainerStyled = styled(Container)`
  font-size: 1rem;
  padding-left: 15px;
  padding-right: 15px;
  background-color: var(--white);
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
  max-height: 42rem;
`;

const TableRow = styled(Row)`
  border-bottom: 1px solid #BBC5CD;
`;

const TableRowFlex = styled(TableRow)`
  display: flex;
  align-items: stretch;
`;

const TableRowValue = styled(TableRowFlex)`
  border-bottom: 1px solid #ecf0f1;
`;

const TableCol = styled(Col)`
  text-align: left;
  padding-top: 12px;
  padding-bottom: 12px;
  line-height: 1.428571;
`;

const TableColBorder = styled(TableCol)`
  border-bottom: 1px solid #BBC5CD;
`;

const TableUl = styled.ul`
  padding-left: 0.5625rem;
  list-style: none;
`;

const TableLi = styled.li`
  position: relative;
`;

const SpanIcon = styled.span`
  left: -0.8rem;
  top: 0.2rem;
  position: absolute;
  width: 1rem;
  line-height: inherit;
  color: var(--checkbox-green);
  transform: rotate(45deg);
`;

const TableLiBreak = styled(TableLi)`
  word-wrap: break-word;
`;

const TableValues = styled(Col)`
  border-left: 1px solid #BBC5CD;
`;

const ColRight = styled(Col)`
  text-align: right;
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

const DivCenter = styled.div`
  text-align: center;
  padding-top: 1rem;
`;

const CodeSpan = styled.span`
  color: #475162;
  font-size: 1.25rem;
  font-weight: bold;
`;

const PreferredTerm = styled.div`
  color: #475162;
  font-size: 1rem;
  font-weight: bold;
`;

const TableStyled = styled(Table)`
  margin-bottom: 0;
`;

const CrossValuesTable = (props) => {
  // let termTypeNotAssigned = false;
  // let valuesCount = 0;

  let items = JSON.parse(JSON.stringify(props.values));

  let allDataOptions  = (props.dataOptions['ctdc'] === false &&  props.dataOptions['gdc'] === false && props.dataOptions['icdc'] === false) ? true : false;

  let values = [];

  let ncitMatchObj = {};
  let icdo3MatchObj = {};

  items.forEach((data) => {
    let enums = data.inner_hits.enum;
    if (enums.hits.total !== 0) {

      let enumHits = enums.hits.hits;
      enumHits.forEach((hits) => {

        let highlight = hits.highlight;

        let highlightValue = ('enum.n' in highlight) || ('enum.n.have' in highlight) ? highlight['enum.n'] || highlight['enum.n.have'] : undefined;
        let highlightValueObj = getHighlightObj(highlightValue);

        let highlightSyn = ('enum.n_syn.s.termName' in highlight) || ('enum.n_syn.s.termName.have' in highlight) ? highlight['enum.n_syn.s.termName'] || highlight['enum.n_syn.s.termName.have'] : undefined;
        let highlightSynObj = getHighlightObj(highlightSyn);

        let highlightNC = ('enum.n_syn.n_c' in highlight) || ('enum.n_syn.n_c.have' in highlight) ? highlight['enum.n_syn.n_c'] || highlight['enum.n_syn.n_c.have'] : undefined;
        let highlightNCObj = getHighlightObj(highlightNC);

        let highlightIC = ('enum.i_c.c' in highlight) || ('enum.i_c.have' in highlight) ? highlight['enum.i_c.c'] || highlight['enum.i_c.have'] : undefined;
        let highlightICObj = getHighlightObj(highlightIC);

        let obj = {};
        obj.category = data._source.category;
        obj.node = data._source.node;
        obj.property = data._source.property;
        obj.id = data._source.id;
        obj.cdeId = data._source.cde ? data._source.cde.id : undefined;
        obj.cdeUrl = data._source.cde ? data._source.cde.url : undefined;
        obj.vs = [];
        let highlightCdeId = data.highlight !== undefined && ('cde.id' in data.highlight) ? data.highlight['cde.id'] : undefined;
        // if (highlightCdeId !== undefined) {
        //   if (data._source.enum !== undefined) obj.vs = getAllValues(data);
        // }

        let ncitMatch = undefined;
        let icdo3Match = undefined;


        if (highlightCdeId === undefined) {
          let valueObj = {};
          let source = hits._source;
          valueObj.n = highlightValueObj[source.n] !== undefined ? highlightValueObj[source.n] : source.n;
          valueObj.src_n = source.n;
          valueObj.drug = source.drug;
          if (source.n_syn !== undefined) {
            source.n_syn.forEach(data => {
              let newSyn = [];
              let preferredTerm;
              let preferredTermObj;
              data.s.forEach(s => {
                if (s.termSource !== 'NCI') return;
                let synObj = {};
                synObj.termName = highlightSynObj[s.termName] ? highlightSynObj[s.termName] : s.termName;
                synObj.termSource = s.termSource;
                synObj.termGroup = s.termGroup;
                if (s.termGroup === 'PT' && preferredTerm === undefined) {
                  preferredTerm = s.termName;
                  preferredTermObj = synObj;
                }
                newSyn.push(synObj);
              });

              if(ncitMatch !== data.n_c) {
                ncitMatch = data.n_c;

                if(ncitMatchObj[data.n_c] === undefined) {
                  ncitMatchObj[data.n_c] = preferredTermObj;
                };
              };

              // if(ncitMatch.indexOf(data.n_c) === -1) {
              //   ncitMatch.push(data.n_c);

              //   if(ncitMatchObj[data.n_c] === undefined) {
              //     ncitMatchObj[data.n_c] = preferredTermObj;
              //     ncitMatchValues[data.n_c] = valueObj;
              //     newValueObj = valueObj;
              //   };
              // };

              data.n_c = highlightNCObj[data.n_c] ? highlightNCObj[data.n_c] : data.n_c;
              data.id = (obj.property + '-' + valueObj.src_n + '-' + data.n_c).replace(/[^a-zA-Z0-9-]+/gi, '');
              data.pt = preferredTerm;
              data.s = sortSynonyms(newSyn);
              if (data.def !== undefined &&
                data.def.length !== 0 &&
                data.def.find((defs) => defs.defSource === 'NCI') !== undefined) {
                data.def = data.def.find((defs) => defs.defSource === 'NCI').description;
              } else {
                data.def = undefined;
              }
              if (data.ap !== undefined && data.ap.length !== 0) {
                data.ap = data.ap.filter((aps) => {
                  return aps.name === 'CAS_Registry' || aps.name === 'FDA_UNII_Code' || aps.name === 'NSC_Code';
                });
              }
            });
            valueObj.n_syn = source.n_syn;
          }
          valueObj.i_c = {};
          valueObj.i_c.c = source.i_c ? highlightICObj[source.i_c.c] ? highlightICObj[source.i_c.c] : source.i_c.c : undefined;
          valueObj.i_c.id = source.i_c ? (obj.property + '-' + valueObj.src_n + '-' + source.i_c.c).replace(/[^a-zA-Z0-9-]+/gi, '') : undefined;

          if(valueObj.i_c.c !== undefined) {
            icdo3Match = valueObj.i_c.c ;

            if(icdo3MatchObj[valueObj.i_c.c] === undefined) {
              icdo3MatchObj[valueObj.i_c.c] = valueObj.i_c;
            };
          };

          // if(valueObj.i_c.c !== undefined && icdo3Match.indexOf(valueObj.i_c.c) === -1) {
          //   icdo3Match.push(valueObj.i_c.c);

          //   if(icdo3MatchObj[valueObj.i_c.c] === undefined) {
          //     //icdo3MatchObj[valueObj.i_c.c] = {};
          //     icdo3MatchObj[valueObj.i_c.c] = valueObj.i_c;
          //   };
          // };
          if (source.ic_enum !== undefined) {
            valueObj.ic_enum = source.ic_enum;
            icdo3MatchObj[valueObj.i_c.c].enum = source.ic_enum;
            source.ic_enum.forEach(ic => {
              if (ic.term_type === 'PT') {
                icdo3MatchObj[valueObj.i_c.c].preferredTerm = ic;
              }
            });

            // source.ic_enum.forEach(ic => {
            //   if (ic.term_type === '*') termTypeNotAssigned = true;
            // });
          }
          obj.vs.push(valueObj);
        }
        obj.n_match = ncitMatch;
        obj.ic_match = icdo3Match;
        values.push(obj);
      });
      //obj.vs = sortAlphabetically(obj.vs);

      //obj.n_match = ncitMatch;
      //obj.ic_match = icdo3Match;
      //obj.n_match_obj = ncitMatchObj;
      // valuesCount += obj.vs.length;
      //values.push(obj);
    }
  });

  console.log(values);

  let ncitObjs = {};
  let icdo3Objs = {};

  values.forEach((value) => {
    if (value.n_match !== undefined){
      if(ncitObjs[value.n_match] === undefined) {
        ncitObjs[value.n_match] = [];
      }
      ncitObjs[value.n_match].push(value);
    }

    if (value.ic_match !== undefined){
      if(icdo3Objs[value.ic_match] === undefined) {
        icdo3Objs[value.ic_match] = [];
      }
      icdo3Objs[value.ic_match].push(value);
    }

    if (value.n_match === undefined && value.ic_match === undefined){
      if(ncitObjs['norelationship'] === undefined) {
          ncitObjs['norelationship'] = [];
        }
      ncitObjs['norelationship'].push(value);
    }
  });

  let crossValues = [];

  Object.entries(ncitObjs).forEach((entry)=> {
    crossValues.push({
      code: entry[0] !== 'norelationship'? entry[0]: 'No NCIT Relationship',
      ref: 'NCit',
      preferredTerm: ncitMatchObj[entry[0]],
      values: {
        gdcvalues: allDataOptions || props.dataOptions['gdc'] === true ? entry[1] : [],
        ctdcvalues: allDataOptions || props.dataOptions['ctdc'] === true ? entry[1] : [],
        icdcvalues: allDataOptions || props.dataOptions['ctdc'] === true ? entry[1] : [],
      }
    })
  });

  Object.entries(icdo3Objs).forEach((entry)=> {
    crossValues.push({
      code: entry[0],
      ref: 'ICD-O-3',
      icdo3: icdo3MatchObj[entry[0]],
      values: {
        gdcvalues: allDataOptions || props.dataOptions['gdc'] === true ? entry[1] : [],
        ctdcvalues: allDataOptions || props.dataOptions['ctdc'] === true ? entry[1] : [],
        icdcvalues: allDataOptions || props.dataOptions['ctdc'] === true ? entry[1] : [],
      }
    })
  });

  console.log(crossValues);

  const TableSynonyms = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) =>
        <tr key={index}>
          <td>{item.termName}</td>
          <td>{item.termSource}</td>
          <td>{item.termGroup}</td>
        </tr>
      );
    }
    return (null);
  };

  const TableICDO3Syns = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) =>
        <tr key={index}>
          <td>{item.n}</td>
          <td>(ICD-O-3)</td>
          <td>{item.term_type}</td>
        </tr>
      );
    }
    return (null);
  };

  const NcitValue = (props) => {
    if (props.synonym !== undefined) {
      return (
        <div className="ncit-value-container">
          <Row>
            <TableCol xs={12}>
              <b>NCI Thesaurus Code: </b>
              <a href="/#">{props.synonym.n_c}</a>
            </TableCol>
          </Row>
          <Row>
            <TableCol xs={12}>
              <TableStyled striped bordered condensed="true" hover>
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Source</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <TableSynonyms synonyms={props.synonym.s}/>
                </tbody>
              </TableStyled>
            </TableCol>
          </Row>
        </div>
      );
    }
    return (null);
  };

  const NcitValues = (props) => {
    if (props.ncit !== undefined) {
      return props.ncit.map((item, index) =>
        <div key={index} className="ncit-value-container">
          <Row>
            <TableCol xs={12}>
              <b>NCI Thesaurus Code: </b>
              <a href="/#">{item.n_c}</a>
            </TableCol>
          </Row>
          <Row>
            <TableCol xs={12}>
              <TableStyled striped bordered condensed="true" hover>
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Source</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <TableSynonyms synonyms={item.s}/>
                </tbody>
              </TableStyled>
            </TableCol>
          </Row>
        </div>
      );
    }
    return (null);
  };

  const TabsContent = (props) => {
    if (props.ncit !== undefined || props.icemun !== undefined) {
      return (
        <Tab.Container id="tabs-controller" defaultActiveKey={ props.icemun !== undefined ? props.ic.id : props.ncit[0].id}>
          <Row className="clearfix">
            <Col sm={12}>
              <Nav variant="tabs">
                {props.icemun !== undefined &&
                  <Nav.Item>
                    <Nav.Link eventKey={props.ic.id} dangerouslySetInnerHTML={{ __html: props.ic.c + ' (ICD-O-3)' }}></Nav.Link>
                  </Nav.Item>
                }
                {props.ncit !== undefined &&
                  props.ncit.map((syn, index) =>
                    <Nav.Item>
                      <Nav.Link key={index} eventKey={syn.id}>{syn.n_c} (NCIt)</Nav.Link>
                    </Nav.Item>
                  )
                }
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content transition="false">
                {props.icemun !== undefined &&
                  <Tab.Pane eventKey={props.ic.id}>
                    <ICDO3Value ic={props.ic} icemun={props.icemun} />
                  </Tab.Pane>
                }
                {props.ncit !== undefined &&
                  props.ncit.map((syn, index) =>
                    <Tab.Pane key={index} eventKey={syn.id}>
                      <NcitValue synonym={syn} />
                    </Tab.Pane>
                  )
                }
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      );
    }
    return (null);
  };

  const ICDO3Value = (props) => {
    if (props.icemun !== undefined) {
      return (
        <div className="icdo3-value-container">
          <Row>
            <TableCol xs={12} dangerouslySetInnerHTML={{ __html: props.ic.c + ' (ICD-O-3)' }}></TableCol>
          </Row>
          <Row>
            <TableCol xs={12}>
              <TableStyled striped bordered condensed="true" hover>
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Source</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <TableICDO3Syns synonyms={props.icemun}/>
                </tbody>
              </TableStyled>
            </TableCol>
          </Row>
        </div>
      );
    }
    return (null);
  };

  const TableValue = (props) => {
    let [isToggleOn, setIsToggleOn] = useState(false);

    const ToggleTableHandler = event => {
      event.preventDefault();
      setIsToggleOn(!isToggleOn);
    };

    return (
      <TableCol xs={12}>
        <Row>
          <Col xs={10}>
            <a href="/#" dangerouslySetInnerHTML={{ __html: props.name }}></a>
          </Col>
          <ColRight xs={2}>
            {(props.nsyn !== undefined || props.icemun !== undefined) &&
              <a href="/#" onClick={ToggleTableHandler}>
                {isToggleOn === true
                  ? <FontAwesomeIcon icon={faMinus}/>
                  : <FontAwesomeIcon icon={faPlus}/>
                }
              </a>
            }
          </ColRight>
        </Row>
        {(props.nsyn !== undefined || props.icemun !== undefined) &&
          <Collapse in={isToggleOn}>
            <div className="ncit-values">
              {(props.nsyn !== undefined && props.nsyn.length === 1 && props.icemun === undefined) &&
                <NcitValues ncit={props.nsyn} />
              }
              {((props.nsyn !== undefined && props.icemun !== undefined) || (props.nsyn !== undefined && props.nsyn.length > 1)) &&
                <TabsContent ncit={props.nsyn} ic={props.ic} icemun={props.icemun} />
              }
              {(props.nsyn === undefined && props.icemun !== undefined) &&
                <ICDO3Value ic={props.ic} icemun={props.icemun} />
              }
            </div>
          </Collapse>
        }
      </TableCol>
    );
  };

  const ValuesItems = (props) => {
    return (
      <Col sx={12}>
        <Row>
          <TableCol xs={3}>
            {props.item.category}
            <TableUl>
              <TableLi><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{props.item.node}
                <TableUl>
                  <TableLiBreak><SpanIcon><FontAwesomeIcon icon={faAngleDown}/></SpanIcon>{props.item.property}</TableLiBreak>
                </TableUl>
              </TableLi>
            </TableUl>
            {/* <GDCTerms idterm={item.id}/> */}
          </TableCol>
          <TableValues xs={9}>
            {props.item.vs.map((value, index) =>
              <TableRowValue key={index}>
                <TableValue name={value.n} ic={value.i_c} icemun={value.ic_enum} nsyn={value.n_syn}/>
              </TableRowValue>
            )}
          </TableValues>
        </Row>
      </Col>
    )
  };

  const mainValuesItems = crossValues.map((cross, index) => {
    return (
      <Row key={index}>
        <TableColBorder xs={2}>
          <DivCenter>
            <CodeSpan>{cross.code}<br/>({cross.ref})</CodeSpan><br/>
            {cross.preferredTerm !== undefined && <PreferredTerm>{cross.preferredTerm.termName} ({cross.preferredTerm.termGroup})</PreferredTerm>}
            {(cross.icdo3 !== undefined && cross.icdo3.preferredTerm !== undefined) && <PreferredTerm>{cross.icdo3.preferredTerm.n} ({cross.icdo3.preferredTerm.term_type})</PreferredTerm>}
        </DivCenter>
        </TableColBorder>
        <TableValues xs={10}>
          {cross.values.gdcvalues.length !== 0 &&
            <Row>
              <TableColBorder xs={2}>
                <DivCenter>Genomic Data Commons</DivCenter>
              </TableColBorder>
              <TableValues xs={10}>
                {cross.values.gdcvalues.map((value, index) =>
                  <TableRowFlex key={index}>
                    <ValuesItems item={value}/>
                  </TableRowFlex>
                )}
              </TableValues>
            </Row>
          }
          {cross.values.ctdcvalues.length !== 0 &&
            <Row>
              <TableColBorder xs={2}>
                <DivCenter>Clinical Trials Data Commons</DivCenter>
              </TableColBorder>
              <TableValues xs={10}>
                {cross.values.ctdcvalues.map((value, index) =>
                  <TableRowFlex key={index}>
                    <ValuesItems item={value}/>
                  </TableRowFlex>
                )}
              </TableValues>
            </Row>
          }
        </TableValues>
    </Row>
    );
  });

  if (crossValues.length !== 0) {
    return (
      <ContainerStyled>
        <TableThead>
        <Col xs={2}>
            <TableTh>Terminology Reference</TableTh>
          </Col>
          <Col xs={2}>
            <TableTh>Data Sources</TableTh>
          </Col>
          <Col xs={2}>
            <TableTh>Node / Property</TableTh>
          </Col>
          <Col xs={6}>
            <TableTh>Matched Values</TableTh>
          </Col>
        </TableThead>
        <TableBody>
          <Col xs={12}>{mainValuesItems}</Col>
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

export default CrossValuesTable;
