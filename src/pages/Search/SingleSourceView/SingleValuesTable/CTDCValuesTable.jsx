import { useState } from 'react';
import styles from './SingleValuesTable.module.css';
import { Container, Row, Col, Table, Tab, Nav, Collapse} from 'react-bootstrap';
import { MinusIcon, PlusIcon, AngleDownIcon } from '../../../../components/ui/icons/Icons'
import { getHighlightObj, sortAlphabetically, sortSynonyms } from '../../../../shared';


const CTDCValuesTable = (props) => {
  let items = JSON.parse(JSON.stringify(props.values));
  let values = [];

  items.forEach((data) => {
    if(data._source.source !== 'ctdc') return;
    let enums = data.inner_hits.enum;
    if (enums.hits.hits.length !== 0) { // If the searched term is cde id.
      let enumHits = enums.hits.hits;
      let obj = {};
      obj.category = data._source.category;
      obj.node = data._source.node;
      obj.property = data._source.prop;
      obj.id = data._source.id;
      obj.cdeId = data._source.cde ? data._source.cde.id : undefined;
      obj.cdeUrl = data._source.cde ? data._source.cde.url : undefined;
      obj.vs = [];
      let highlightCdeId = data.highlight !== undefined && ('cde.id' in data.highlight) ? data.highlight['cde.id'] : undefined;
      // if (highlightCdeId !== undefined) {
      //   if (data._source.enum !== undefined) obj.vs = getAllValues(data);
      // }
      enumHits.forEach(hits => {
        let highlight = hits.highlight;

        let highlightValue = ('enum.n' in highlight) || ('enum.n.have' in highlight) ? highlight['enum.n'] || highlight['enum.n.have'] : undefined;
        let highlightValueObj = getHighlightObj(highlightValue);

        let highlightSyn = ('enum.ncit.s.n' in highlight) || ('enum.ncit.s.n.have' in highlight) ? highlight['enum.ncit.s.n'] || highlight['enum.ncit.s.n.have'] : undefined;
        let highlightSynObj = getHighlightObj(highlightSyn);

        let highlightNC = ('enum.ncit.c' in highlight) || ('enum.ncit.c.have' in highlight) ? highlight['enum.ncit.c'] || highlight['enum.ncit.c.have'] : undefined;
        let highlightNCObj = getHighlightObj(highlightNC);

        let highlightIC = ('enum.icdo.c' in highlight) || ('enum.icdo.have' in highlight) ? highlight['enum.icdo.c'] || highlight['enum.icdo.have'] : undefined;
        let highlightICObj = getHighlightObj(highlightIC);

        if (highlightCdeId === undefined) {
          let valueObj = {};
          let source = hits._source;
          valueObj.n = highlightValueObj[source.n] !== undefined ? highlightValueObj[source.n] : source.n;
          valueObj.src_n = source.n;
          //valueObj.drug = source.drug;
          if (source.ncit !== undefined) {
            source.ncit.forEach(data => {
              let newSyn = [];
              let preferredTerm;
              data.s.forEach(s => {
                if (s.src !== 'NCI') return;
                let synObj = {};
                synObj.termName = highlightSynObj[s.n] ? highlightSynObj[s.n] : s.n;
                synObj.termSource = s.src;
                synObj.termGroup = s.t;
                if (s.t === 'PT' && preferredTerm === undefined) {
                  preferredTerm = s.n;
                }
                newSyn.push(synObj);
              });
              data.n_c = highlightNCObj[data.c] ? highlightNCObj[data.c] : data.c;
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
              else{
                data.ap = undefined;
              }
            });
            valueObj.n_syn = source.ncit;
          }
          valueObj.i_c = {};
          valueObj.i_c.c = source.icdo ? highlightICObj[source.icdo.c] ? highlightICObj[source.icdo.c] : source.icdo.c : undefined;
          valueObj.i_c.id = source.icdo ? (obj.property + '-' + valueObj.src_n + '-' + source.icdo.c).replace(/[^a-zA-Z0-9-]+/gi, '') : undefined;
          if (source.icdo && source.icdo.s !== undefined) {
            valueObj.ic_enum = source.icdo.s;
            // source.ic_enum.forEach(ic => {
            //   if (ic.term_type === '*') termTypeNotAssigned = true;
            // });
          }
          obj.vs.push(valueObj);
        }
      });
      obj.vs = sortAlphabetically(obj.vs);
      // valuesCount += obj.vs.length;
      values.push(obj);
    }
  });

  const TableSynonyms = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) =>
        <tr key={index}>
          <td dangerouslySetInnerHTML={{ __html: item.termName }}></td>
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
          <td>{item.t}</td>
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
            <Col className={styles['table-col']} xs={12}>
              <b>NCI Thesaurus Code: </b>
              <a href={"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + props.synonym.n_c.replace(/<b>/g, '').replace(/<\/b>/g, '')} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{ __html: props.synonym.n_c }}></a>
            </Col>
          </Row>
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <Table striped bordered condensed="true" hover>
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
              </Table>
            </Col>
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
            <Col className={styles['table-col']} xs={12}>
              <b>NCI Thesaurus Code: </b>
              <a href={"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + item.n_c.replace(/<b>/g, '').replace(/<\/b>/g, '')} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{ __html: item.n_c }}></a>
            </Col>
          </Row>
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <Table striped bordered condensed="true" hover>
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
              </Table>
            </Col>
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
                      <Nav.Link key={index} eventKey={syn.id} dangerouslySetInnerHTML={{ __html: syn.n_c + ' (NCIt)' }}></Nav.Link>
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
            <Col className={styles['table-col']} xs={12} dangerouslySetInnerHTML={{ __html: props.ic.c + ' (ICD-O-3)' }}></Col>
          </Row>
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <Table striped bordered condensed="true" hover>
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
              </Table>
            </Col>
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
      <Col className={styles['table-col']} xs={12}>
        <Row>
          <Col xs={10}>
            {((props.nsyn !== undefined && props.nsyn.length !== 0) || props.icemun !== undefined) 
              ? <a href="/#" dangerouslySetInnerHTML={{ __html: props.name }} onClick={ToggleTableHandler}></a>
              : <span dangerouslySetInnerHTML={{ __html: props.name }}></span>
            }
          </Col>
          <Col className={styles['col-right']} xs={2}>
            {((props.nsyn !== undefined && props.nsyn.length !== 0) || props.icemun !== undefined) &&
              <a href="/#" aria-label={isToggleOn === true ? 'collapse' : 'expand'} onClick={ToggleTableHandler}>
                {isToggleOn === true
                  ? <MinusIcon/>
                  : <PlusIcon/>
                }
              </a>
            }
          </Col>
        </Row>
        {((props.nsyn !== undefined && props.nsyn.length !== 0) || props.icemun !== undefined) &&
          <Collapse in={isToggleOn} mountOnEnter={true}>
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
      </Col>
    );
  };

  const valuesItems = values.map((item, index) =>
    <Row className={styles['table-row']} key={index}>
      <Col className={styles['table-col']} xs={3}>
        {item.category}
        <ul className={styles['table-ul']}>
          <li className={styles['table-li']}><span className={styles['span-icon']}><AngleDownIcon/></span>{item.node.n}
            <ul className={styles['table-ul']}>
              <li className={styles['table-li']}><span className={styles['span-icon']}><AngleDownIcon/></span>{item.property.n}</li>
            </ul>
          </li>
        </ul>
        {/* <GDCTerms idterm={item.id}/> */}
      </Col>
      <Col className={styles['table-values']} xs={9}>
        {item.vs.map((value, index) =>
          <Row className={styles['table-row-value']} key={index}>
            <TableValue name={value.n} ic={value.i_c} icemun={value.ic_enum} nsyn={value.n_syn}/>
          </Row>
        )}
      </Col>
    </Row>
  );

  if (values.length !== 0) {
    return (
    <Container className={styles['container']}>
      <Row className={styles['table-thead']}>
        <Col xs={3}>
          <div className={styles['table-th']}>Category / Node / Property</div>
        </Col>
        <Col xs={9}>
          <div className={styles['table-th']}>Matched CTDC Values</div>
        </Col>
      </Row>
      <Row className={styles['table-body']}>
        <Col xs={12}>{valuesItems}</Col>
      </Row>
    </Container>
    );
  } else {
    return (
      <Container className={styles['container']}>
        <div className={styles['indicator']}>
          <div className={styles['indicator-content']}>
            Sorry, no results found.
          </div>
        </div>
      </Container>
    );
  }
};

export default CTDCValuesTable;
