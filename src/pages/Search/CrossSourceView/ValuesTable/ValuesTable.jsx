import { useState } from 'react'
import styles from './ValuesTable.module.css'
import { Container, Row, Col, Table, Tab, Nav, Collapse } from 'react-bootstrap'
import {
  MinusIcon,
  PlusIcon,
  AngleDownIcon,
  AngleUpIcon,
} from '../../../../components/ui/icons/Icons'
import { getHighlightObj, sortSynonyms } from '../../../../shared'

import { default as TableValueComp } from '../../components/TableValue/TableValue'

const CrossValuesTable = (props) => {
  let items = JSON.parse(JSON.stringify(props.values))
  let values = []

  let ncitMatchObj = {}
  let icdo3MatchObj = {}

  items.forEach((data) => {
    let enums = data.inner_hits.enum
    if (enums.hits.hits.length !== 0) {
      let enumHits = enums.hits.hits
      enumHits.forEach((hits) => {
        let highlight = hits.highlight

        let highlightValue =
          'enum.n' in highlight || 'enum.n.have' in highlight
            ? highlight['enum.n'] || highlight['enum.n.have']
            : undefined
        let highlightValueObj = getHighlightObj(highlightValue)

        let highlightSyn =
          'enum.ncit.s.n' in highlight || 'enum.ncit.s.n.have' in highlight
            ? highlight['enum.ncit.s.n'] || highlight['enum.ncit.s.n.have']
            : undefined
        let highlightSynObj = getHighlightObj(highlightSyn)

        let highlightNC =
          'enum.ncit.c' in highlight || 'enum.ncit.c.have' in highlight
            ? highlight['enum.ncit.c'] || highlight['enum.ncit.c.have']
            : undefined
        let highlightNCObj = getHighlightObj(highlightNC)

        let highlightIC =
          'enum.icdo.c' in highlight || 'enum.icdo.have' in highlight
            ? highlight['enum.icdo.c'] || highlight['enum.icdo.have']
            : undefined
        let highlightICObj = getHighlightObj(highlightIC)

        let obj = {}
        obj.category = data._source.category
        obj.node = data._source.node
        obj.property = data._source.prop
        obj.id = data._source.id
        obj.source = data._source.source
        obj.cdeId = data._source.cde ? data._source.cde.id : undefined
        obj.cdeUrl = data._source.cde ? data._source.cde.url : undefined
        obj.vs = []
        let highlightCdeId =
          data.highlight !== undefined && 'cde.id' in data.highlight
            ? data.highlight['cde.id']
            : undefined
        // if (highlightCdeId !== undefined) {
        //   if (data._source.enum !== undefined) obj.vs = getAllValues(data);
        // }

        let ncitMatch = []
        let icdo3Match = undefined

        if (highlightCdeId === undefined) {
          let valueObj = {}
          let source = hits._source
          valueObj.n =
            highlightValueObj[source.n] !== undefined
              ? highlightValueObj[source.n]
              : source.n
          valueObj.src_n = source.n
          //valueObj.drug = source.drug;
          if (source.ncit !== undefined) {
            source.ncit.forEach((data) => {
              let newSyn = []
              let preferredTerm
              let preferredTermObj
              data.s.forEach((s) => {
                if (s.src !== 'NCI') return
                let synObj = {}
                synObj.termName = highlightSynObj[s.n]
                  ? highlightSynObj[s.n]
                  : s.n
                synObj.termSource = s.src
                synObj.termGroup = s.t
                if (s.t === 'PT' && preferredTerm === undefined) {
                  preferredTerm = s.n
                  preferredTermObj = synObj
                }
                newSyn.push(synObj)
              })

              if (ncitMatch.indexOf(data.c) === -1) {
                ncitMatch.push(data.c)

                if (ncitMatchObj[data.c] === undefined) {
                  ncitMatchObj[data.c] = preferredTermObj
                }
              }

              data.n_c = highlightNCObj[data.c]
                ? highlightNCObj[data.c]
                : data.c
              data.id = (
                obj.property +
                '-' +
                valueObj.src_n +
                '-' +
                data.n_c
              ).replace(/[^a-zA-Z0-9-]+/gi, '')
              data.pt = preferredTerm
              data.s = sortSynonyms(newSyn)
              if (
                data.def !== undefined &&
                data.def.length !== 0 &&
                data.def.find((defs) => defs.defSource === 'NCI') !== undefined
              ) {
                data.def = data.def.find(
                  (defs) => defs.defSource === 'NCI'
                ).description
              } else {
                data.def = undefined
              }
              if (data.ap !== undefined && data.ap.length !== 0) {
                data.ap = data.ap.filter((aps) => {
                  return (
                    aps.name === 'CAS_Registry' ||
                    aps.name === 'FDA_UNII_Code' ||
                    aps.name === 'NSC_Code'
                  )
                })
              } else {
                data.ap = undefined
              }
            })
            valueObj.n_syn = source.ncit
          }
          valueObj.i_c = {}
          valueObj.i_c.c = source.icdo
            ? highlightICObj[source.icdo.c]
              ? highlightICObj[source.icdo.c]
              : source.icdo.c
            : undefined
          valueObj.i_c.id = source.icdo
            ? (
                obj.property +
                '-' +
                valueObj.src_n +
                '-' +
                source.icdo.c
              ).replace(/[^a-zA-Z0-9-]+/gi, '')
            : undefined

          if (valueObj.i_c.c !== undefined) {
            icdo3Match = valueObj.i_c.c

            if (icdo3MatchObj[valueObj.i_c.c] === undefined) {
              icdo3MatchObj[valueObj.i_c.c] = valueObj.i_c
            }
          }

          if (source.icdo && source.icdo.s !== undefined) {
            valueObj.ic_enum = source.icdo.s
            icdo3MatchObj[valueObj.i_c.c].enum = source.icdo.s
            source.icdo.s.forEach((ic) => {
              if (ic.t === 'PT') {
                icdo3MatchObj[valueObj.i_c.c].preferredTerm = ic
              }
            })
          }
          obj.vs.push(valueObj)
        }
        obj.n_match = ncitMatch
        obj.ic_match = icdo3Match
        values.push(obj)
      })
    }
  })

  let idValueObj = {}
  let idValuesObj = {}

  values.forEach((value) => {
    if (
      value.n_match !== undefined &&
      value.n_match.length !== 0 &&
      value.id !== undefined
    ) {
      value.n_match.forEach((match) => {
        let idMatch = `${match}-${value.id}`
        if (idValueObj[idMatch] === undefined) {
          idValueObj[idMatch] = []
          idValuesObj[idMatch] = value
        }
        idValueObj[idMatch].push(value.vs[0])
      })
    }

    if (value.ic_match !== undefined && value.id !== undefined) {
      let idMatch = `${value.ic_match}-${value.id}`
      if (idValueObj[idMatch] === undefined) {
        idValueObj[idMatch] = []
        idValuesObj[idMatch] = value
      }
      idValueObj[idMatch].push(value.vs[0])
    }

    if (
      (value.n_match === undefined || value.n_match.length === 0) &&
      value.ic_match === undefined &&
      value.id !== undefined
    ) {
      let idMatch = `no-mapping-${value.id}`
      if (idValueObj[idMatch] === undefined) {
        idValueObj[idMatch] = []
        idValuesObj[idMatch] = value
      }
      idValueObj[idMatch].push(value.vs[0])
    }
  })

  let ncitObjs = {}
  let icdo3Objs = {}

  Object.entries(idValuesObj).forEach((entry) => {
    if (entry[1].n_match !== undefined && entry[1].n_match.length !== 0) {
      entry[1].n_match.forEach((match) => {
        if (entry[0] === `${match}-${entry[1].id}`) {
          if (ncitObjs[match] === undefined) {
            ncitObjs[match] = []
          }

          entry[1].vs = idValueObj[`${match}-${entry[1].id}`]
          ncitObjs[match].push({ ...entry[1] })
        }
      })
    }

    if (
      entry[1].ic_match !== undefined &&
      entry[0] === `${entry[1].ic_match}-${entry[1].id}`
    ) {
      if (icdo3Objs[entry[1].ic_match] === undefined) {
        icdo3Objs[entry[1].ic_match] = []
      }
      entry[1].vs = idValueObj[`${entry[1].ic_match}-${entry[1].id}`]
      icdo3Objs[entry[1].ic_match].push({ ...entry[1] })
    }

    if (
      (entry[1].n_match === undefined || entry[1].n_match.length === 0) &&
      entry[1].ic_match === undefined &&
      entry[0] === `no-mapping-${entry[1].id}`
    ) {
      if (ncitObjs['no-mapping'] === undefined) {
        ncitObjs['no-mapping'] = []
      }
      entry[1].vs = idValueObj[`no-mapping-${entry[1].id}`]
      ncitObjs['no-mapping'].push({ ...entry[1] })
    }
  })

  let crossValues = []

  Object.entries(ncitObjs).forEach((entry) => {
    let ctdcValues = []
    let gdcValues = []
    let icdcValues = []
    let pcdcValues = []

    if (entry[1] !== undefined && entry[1].length !== 0) {
      entry[1].forEach((value) => {
        if (value.source !== undefined && value.source === 'gdc') {
          gdcValues.push(value)
        }
        if (value.source !== undefined && value.source === 'ctdc') {
          ctdcValues.push(value)
        }
        if (value.source !== undefined && value.source === 'icdc') {
          icdcValues.push(value)
        }
        if (value.source !== undefined && value.source === 'pcdc') {
          pcdcValues.push(value)
        }
      })
    }

    crossValues.push({
      code: entry[0] !== 'no-mapping' ? entry[0] : 'No NCIT Mapping',
      ref: 'NCIt',
      ncitPreferredTerm: ncitMatchObj[entry[0]],
      values: {
        ctdcvalues: ctdcValues,
        gdcvalues: gdcValues,
        icdcvalues: icdcValues,
        pcdcvalues: pcdcValues,
      },
    })
  })

  Object.entries(icdo3Objs).forEach((entry) => {
    let gdcValues = []
    let ctdcValues = []
    let icdcValues = []
    let pcdcValues = []

    if (entry[1] !== undefined && entry[1].length !== 0) {
      entry[1].forEach((value) => {
        if (value.source !== undefined && value.source === 'gdc') {
          gdcValues.push(value)
        }
        if (value.source !== undefined && value.source === 'ctdc') {
          ctdcValues.push(value)
        }
        if (value.source !== undefined && value.source === 'icdc') {
          icdcValues.push(value)
        }
        if (value.source !== undefined && value.source === 'pcdc') {
          pcdcValues.push(value)
        }
      })
    }

    crossValues.push({
      code: entry[0].replace(/<b>/g, '').replace(/<\/b>/g, ''),
      ref: 'ICD-O-3',
      icdo3PreferredTerm: icdo3MatchObj[entry[0]].preferredTerm,
      values: {
        ctdcvalues: ctdcValues,
        gdcvalues: gdcValues,
        icdcvalues: icdcValues,
        pcdcvalues: pcdcValues,
      },
    })
  })

  const TableSynonyms = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) => (
        <tr key={index}>
          <td dangerouslySetInnerHTML={{ __html: item.termName }}></td>
          <td>{item.termSource}</td>
          <td>{item.termGroup}</td>
        </tr>
      ))
    }
    return null
  }

  const TableICDO3Syns = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) => (
        <tr key={index}>
          <td>{item.n}</td>
          <td>(ICD-O-3)</td>
          <td>{item.t}</td>
        </tr>
      ))
    }
    return null
  }

  const NcitValue = (props) => {
    if (props.synonym !== undefined) {
      return (
        <div className="ncit-value-container">
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <b>NCI Thesaurus Code: </b>
              <a
                href={
                  'https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=' +
                  props.synonym.n_c.replace(/<b>/g, '').replace(/<\/b>/g, '')
                }
                rel="noopener noreferrer"
                target="_blank"
                dangerouslySetInnerHTML={{ __html: props.synonym.n_c }}
              ></a>
            </Col>
          </Row>
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <Table
                className={styles['table-styled']}
                striped
                bordered
                condensed="true"
                hover
              >
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Source</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <TableSynonyms synonyms={props.synonym.s} />
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      )
    }
    return null
  }

  const NcitValues = (props) => {
    if (props.ncit !== undefined) {
      return props.ncit.map((item, index) => (
        <div key={index} className="ncit-value-container">
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <b>NCI Thesaurus Code: </b>
              <a
                href={
                  'https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=' +
                  item.n_c.replace(/<b>/g, '').replace(/<\/b>/g, '')
                }
                rel="noopener noreferrer"
                target="_blank"
                dangerouslySetInnerHTML={{ __html: item.n_c }}
              ></a>
            </Col>
          </Row>
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <Table
                className={styles['table-styled']}
                striped
                bordered
                condensed="true"
                hover
              >
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Source</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <TableSynonyms synonyms={item.s} />
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      ))
    }
    return null
  }

  const TabsContent = (props) => {
    if (props.ncit !== undefined || props.icemun !== undefined) {
      return (
        <Tab.Container
          id="tabs-controller"
          defaultActiveKey={
            props.icemun !== undefined ? props.ic.id : props.ncit[0].id
          }
        >
          <Row className="clearfix">
            <Col sm={12}>
              <Nav variant="tabs">
                {props.icemun !== undefined && (
                  <Nav.Item>
                    <Nav.Link
                      eventKey={props.ic.id}
                      dangerouslySetInnerHTML={{
                        __html: props.ic.c + ' (ICD-O-3)',
                      }}
                    ></Nav.Link>
                  </Nav.Item>
                )}
                {props.ncit !== undefined &&
                  props.ncit.map((syn, index) => (
                    <Nav.Item>
                      <Nav.Link
                        key={index}
                        eventKey={syn.id}
                        dangerouslySetInnerHTML={{
                          __html: syn.n_c + ' (NCIt)',
                        }}
                      ></Nav.Link>
                    </Nav.Item>
                  ))}
              </Nav>
            </Col>
            <Col sm={12}>
              <Tab.Content transition="false">
                {props.icemun !== undefined && (
                  <Tab.Pane eventKey={props.ic.id}>
                    <ICDO3Value ic={props.ic} icemun={props.icemun} />
                  </Tab.Pane>
                )}
                {props.ncit !== undefined &&
                  props.ncit.map((syn, index) => (
                    <Tab.Pane key={index} eventKey={syn.id}>
                      <NcitValue synonym={syn} />
                    </Tab.Pane>
                  ))}
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )
    }
    return null
  }

  const ICDO3Value = (props) => {
    if (props.icemun !== undefined) {
      return (
        <div className="icdo3-value-container">
          <Row>
            <Col
              className={styles['table-col']}
              xs={12}
              dangerouslySetInnerHTML={{ __html: props.ic.c + ' (ICD-O-3)' }}
            ></Col>
          </Row>
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <Table
                className={styles['table-styled']}
                striped
                bordered
                condensed="true"
                hover
              >
                <thead>
                  <tr>
                    <th>Term</th>
                    <th>Source</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  <TableICDO3Syns synonyms={props.icemun} />
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      )
    }
    return null
  }

  const TableValue = (props) => {
    let [isToggleOn, setIsToggleOn] = useState(false)

    const ToggleTableHandler = (event) => {
      event.preventDefault()
      setIsToggleOn(!isToggleOn)
    }

    return (
      <Col className={styles['table-col']} data-class="TableCol" xs={12}>
        <Row>
          <Col xs={10}>
            {(props.nsyn !== undefined && props.nsyn.length !== 0) ||
            props.icemun !== undefined ? (
              <a
                href="/#"
                dangerouslySetInnerHTML={{ __html: props.name }}
                onClick={ToggleTableHandler}
              ></a>
            ) : (
              <span dangerouslySetInnerHTML={{ __html: props.name }}></span>
            )}
          </Col>
          <Col className={styles['col-right']} xs={2}>
            {((props.nsyn !== undefined && props.nsyn.length !== 0) ||
              props.icemun !== undefined) && (
              <a
                href="/#"
                aria-label={isToggleOn === true ? 'collapse' : 'expand'}
                onClick={ToggleTableHandler}
              >
                {isToggleOn === true ? <MinusIcon /> : <PlusIcon />}
              </a>
            )}
          </Col>
        </Row>
        {((props.nsyn !== undefined && props.nsyn.length !== 0) ||
          props.icemun !== undefined) && (
          <Collapse in={isToggleOn} mountOnEnter={true}>
            <div className="ncit-values">
              {props.nsyn !== undefined &&
                props.nsyn.length === 1 &&
                props.icemun === undefined && <NcitValues ncit={props.nsyn} />}
              {((props.nsyn !== undefined && props.icemun !== undefined) ||
                (props.nsyn !== undefined && props.nsyn.length > 1)) && (
                <TabsContent
                  ncit={props.nsyn}
                  ic={props.ic}
                  icemun={props.icemun}
                />
              )}
              {props.nsyn === undefined && props.icemun !== undefined && (
                <ICDO3Value ic={props.ic} icemun={props.icemun} />
              )}
            </div>
          </Collapse>
        )}
      </Col>
    )
  }

  const ValuesItems = (props) => {
    let [isToggleOn, setIsToggleOn] = useState(false)

    const ToggleTableHandler = (event) => {
      event.preventDefault()
      setIsToggleOn(!isToggleOn)
    }

    return (
      <Col
        className={styles['table-col-flex']}
        data-class="TableColFlex"
        sx={12}
      >
        <Row className={styles['table-row']}>
          <Col className={styles['table-col']} data-class="TableCol" xs={3}>
            {props.item.category}
            <ul className={styles['table-ul']}>
              <li className={styles['table-li']}>
                <span className={styles['span-icon']}>
                  <AngleDownIcon />
                </span>
                {props.item.node.n}
                <ul className={styles['table-ul']}>
                  <li className={styles['table-li']}>
                    <span className={styles['span-icon']}>
                      <AngleDownIcon />
                    </span>
                    {props.item.property.n}
                  </li>
                </ul>
              </li>
            </ul>
          </Col>
          <Col
            className={styles['table-col-right']}
            data-class="TableColRight"
            xs={9}
          >
            <div>
              {props.item.vs.slice(0, 5).map((value, index) => {
                return (
                  <Row
                    className={styles['table-row-value']}
                    data-class="TableRowValue"
                    key={index}
                  >
                    {/* <TableValue
                      name={value.n}
                      ic={value.i_c}
                      icemun={value.ic_enum}
                      nsyn={value.n_syn}
                    /> */}
                    <TableValueComp 
                      ncitName={value.n}
                      nciTerms={value.n_syn}
                      icdo3Code={value.i_c}
                      icdo3Synonyms={value.ic_enum}
                    />
                  </Row>
                )
              })}
              {props.item.vs.length > 5 && (
                <Collapse in={isToggleOn} mountOnEnter={true}>
                  <div>
                    {props.item.vs.map((value, index) => {
                      if (index >= 5) {
                        return (
                          <Row
                            className={styles['table-row-value']}
                            data-class="TableRowValue"
                            key={index}
                          >
                            <TableValue
                              name={value.n}
                              ic={value.i_c}
                              icemun={value.ic_enum}
                              nsyn={value.n_syn}
                            />
                          </Row>
                        )
                      }
                      return null
                    })}
                  </div>
                </Collapse>
              )}
            </div>
            {props.item.vs.length > 5 && (
              <Row
                className={styles['table-row-value']}
                data-class="TableRowValue"
              >
                <Col
                  className={styles['table-col']}
                  data-class="TableCol"
                  xs={12}
                >
                  {isToggleOn === false ? (
                    <a
                      href="/#"
                      aria-label="Show More"
                      aria-expanded="false"
                      data-hidden={props.item.vs.length - 5}
                      onClick={ToggleTableHandler}
                    >
                      <AngleDownIcon /> Show More ({props.item.vs.length - 5})
                    </a>
                  ) : (
                    <a
                      href="/#"
                      aria-label="Show Less"
                      aria-expanded="true"
                      data-hidden={props.item.vs.length - 5}
                      onClick={ToggleTableHandler}
                    >
                      <AngleUpIcon /> Show Less
                    </a>
                  )}
                </Col>
              </Row>
            )}
          </Col>
        </Row>
      </Col>
    )
  }

  const ValuesItemsContainer = (props) => {
    return (
      <Row>
        <Col
          className={styles['table-col-left']}
          data-class="TableColLeft"
          xs={2}
        >
          <div className={styles['div-center']}>
            <span className={styles['code-span']}>
              {props.cross.code}
              <br />({props.cross.ref})
            </span>
            <br />
            {props.cross.ncitPreferredTerm !== undefined && (
              <div
                className={styles['preferred-term']}
                dangerouslySetInnerHTML={{
                  __html: `${props.cross.ncitPreferredTerm.termName} (${props.cross.ncitPreferredTerm.termGroup})`,
                }}
              ></div>
            )}
            {props.cross.icdo3PreferredTerm !== undefined && (
              <div className={styles['preferred-term']}>
                {props.cross.icdo3PreferredTerm.n} (
                {props.cross.icdo3PreferredTerm.t})
              </div>
            )}
          </div>
        </Col>
        <Col
          className={styles['table-col-right']}
          data-class="TableColRight"
          xs={10}
        >
          {props.cross.values.gdcvalues.length !== 0 && (
            <Row className={styles['table-row']}>
              <Col className={styles['table-col-left']} xs={2}>
                <div className={styles['div-center']}>Genomic Data Commons</div>
              </Col>
              <Col
                className={styles['table-col-right']}
                data-class="TableColRight"
                xs={10}
              >
                {props.cross.values.gdcvalues.map((value, index) => (
                  <Row
                    className={styles['table-row-values']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <ValuesItems item={value} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.values.ctdcvalues.length !== 0 && (
            <Row className={styles['table-row']}>
              <Col
                className={styles['table-col-left']}
                data-class="TableColLeft"
                xs={2}
              >
                <div className={styles['div-center']}>
                  Clinical Trials Data Commons
                </div>
              </Col>
              <Col
                className={styles['table-col-right']}
                data-class="TableColRight"
                xs={10}
              >
                {props.cross.values.ctdcvalues.map((value, index) => (
                  <Row
                    className={styles['table-row-values']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <ValuesItems item={value} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.values.icdcvalues.length !== 0 && (
            <Row className={styles['table-row']}>
              <Col
                className={styles['table-col-left']}
                data-class="TableColLeft"
                xs={2}
              >
                <div className={styles['div-center']}>
                  Integrated Canine Data Commons
                </div>
              </Col>
              <Col
                className={styles['table-col-right']}
                ight
                data-class="TableColRight"
                xs={10}
              >
                {props.cross.values.icdcvalues.map((value, index) => (
                  <Row
                    className={styles['table-row-values']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <ValuesItems item={value} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.values.pcdcvalues.length !== 0 && (
            <Row className={styles['table-row']}>
              <Col
                className={styles['table-col-left']}
                data-class="TableColLeft"
                xs={2}
              >
                <div className={styles['div-center']}>
                  Pediatric Cancer Data Commons
                </div>
              </Col>
              <Col
                className={styles['table-col-right']}
                data-class="TableColRight"
                xs={10}
              >
                {props.cross.values.pcdcvalues.map((value, index) => (
                  <Row
                    className={styles['table-row-values']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <ValuesItems item={value} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    )
  }

  if (crossValues.length !== 0) {
    return (
      <Container className={styles['container']}>
        <Row className={styles['table-thead']}>
          <Col xs={2}>
            <div className={styles['table-th']}>Terminology Reference</div>
          </Col>
          <Col xs={10}>
            <Row>
              <Col xs={2}>
                <div className={styles['table-th']}>Data Sources</div>
              </Col>
              <Col xs={2}>
                <div className={styles['table-th']}>Node / Property</div>
              </Col>
              <Col xs={8}>
                <div className={styles['table-th']}>Matched Values</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles['table-body']}>
          <Col xs={12}>
            {crossValues.map((cross, index) => (
              <ValuesItemsContainer cross={cross} key={index} />
            ))}
          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container className={styles['container']}>
        <div className={styles['indicator']}>
          <div className={styles['indicator-content']}>
            Sorry, no results found.
          </div>
        </div>
      </Container>
    )
  }
}

export default CrossValuesTable
