import { useState } from 'react'
import styles from './PropsTable.module.css'
import { Container, Row, Col, Table, Collapse } from 'react-bootstrap'
import {
  MinusIcon,
  PlusIcon,
  AngleDownIcon,
} from '@/components/ui/icons/Icons'
import { getHighlightObj } from '../../../../utils'

import AllValuesModal from '../../components/AllValuesModal/AllValuesModal'
import ToCompareModal from '../../../../components/Modals/ToCompareModal'

const PropsTable = (props) => {
  let items = JSON.parse(JSON.stringify(props.properties))
  let properties = []

  items.forEach((item) => {
    let prop = item.inner_hits.prop

    if (prop.hits.hits.length !== 0) {
      let propHits = prop.hits.hits

      propHits.forEach((hits) => {
        let hl = hits.highlight

        let highlightProp =
          'prop.n' in hl || 'prop.n.have' in hl
            ? hl['prop.n'] || hl['prop.n.have']
            : undefined
        let highlightPropObj = getHighlightObj(highlightProp)

        let highlightDesc =
          'prop.d' in hl || 'prop.d.have' in hl
            ? hl['prop.d'] || hl['prop.d.have']
            : undefined
        let highlightDescObj = getHighlightObj(highlightDesc)

        let highlightNC =
          'prop.ncit.c' in hl || 'prop.ncit.c.have' in hl
            ? hl['prop.ncit.c'] || hl['prop.ncit.c.have']
            : undefined
        let highlightNCObj = getHighlightObj(highlightNC)

        let highlightSyn =
          'prop.ncit.s.n' in hl || 'prop.ncit.s.n.have' in hl
            ? hl['prop.ncit.s.n'] || hl['prop.ncit.s.n.have']
            : undefined
        let highlightSynObj = getHighlightObj(highlightSyn)

        let propObj = {}
        propObj.category = item._source.category
        propObj.node = item._source.node
        propObj.id = item._source.id
        propObj.source = item._source.source
        propObj.property = item._source.prop
        propObj.type = item._source.type
        propObj.property.n = highlightPropObj[item._source.prop.n]
          ? highlightPropObj[item._source.prop.n]
          : item._source.prop.n
        propObj.property.d = highlightDescObj[item._source.prop.d]
          ? highlightDescObj[item._source.prop.d]
          : item._source.prop.d

        propObj.ncit = hits._source.ncit ? hits._source.ncit : undefined

        if (propObj.ncit !== undefined && propObj.ncit !== 0) {
          propObj.ncit.forEach((ncit, i) => {
            propObj.ncit[i].c = highlightNCObj[ncit.c]
              ? highlightNCObj[ncit.c]
              : ncit.c

            if (ncit.s !== undefined && ncit.s !== 0) {
              ncit.s.forEach((s, j) => {
                propObj.ncit[i].s[j].n = highlightSynObj[s.n]
                  ? highlightSynObj[s.n]
                  : s.n
              })
            }
          })
        }

        properties.push(propObj)
      })
    }
  })

  let mappingObj = {}
  properties.forEach((prop) => {
    if (prop.ncit !== undefined && prop.ncit !== 0) {
      prop.ncit.forEach((nt) => {
        if (mappingObj[nt.c] === undefined) {
          mappingObj[nt.c] = []
          mappingObj[nt.c].push(prop)
        } else {
          mappingObj[nt.c].push(prop)
        }
      })
    } else {
      if (mappingObj['no-mapping'] === undefined) {
        mappingObj['no-mapping'] = []
        mappingObj['no-mapping'].push(prop)
      } else {
        mappingObj['no-mapping'].push(prop)
      }
    }
  })

  let crossProps = []

  Object.entries(mappingObj).forEach((entry) => {
    let ctdcProps = []
    let gdcProps = []
    let icdcProps = []
    let pcdcProps = []

    if (entry[1] !== undefined && entry[1].length !== 0) {
      entry[1].forEach((prop) => {
        if (prop.source !== undefined && prop.source === 'gdc') {
          gdcProps.push(prop)
        }
        if (prop.source !== undefined && prop.source === 'ctdc') {
          ctdcProps.push(prop)
        }
        if (prop.source !== undefined && prop.source === 'icdc') {
          icdcProps.push(prop)
        }
        if (prop.source !== undefined && prop.source === 'pcdc') {
          pcdcProps.push(prop)
        }
      })
    }

    crossProps.push({
      code: entry[0] !== 'no-mapping' ? entry[0] : 'No NCIt Mapping',
      ref: 'NCIt',
      props: {
        ctdc: ctdcProps,
        gdc: gdcProps,
        icdc: icdcProps,
        pcdc: pcdcProps,
      },
    })
  })

  const TableSynonyms = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) => (
        <tr key={index}>
          <td dangerouslySetInnerHTML={{ __html: item.n }}></td>
          <td>{item.src}</td>
          <td>{item.t}</td>
        </tr>
      ))
    }
    return null
  }

  const NcitProps = (props) => {
    if (props.ncit !== undefined) {
      return props.ncit.map((item, index) => (
        <div key={index} data-class="ncit-value-container">
          <Row>
            <Col className={styles['table-col']} xs={12}>
              <b>NCI Thesaurus Code: </b>
              <a
                href={
                  'https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=' +
                  item.c.replace(/<b>/g, '').replace(/<\/b>/g, '')
                }
                rel="noopener noreferrer"
                target="_blank"
                dangerouslySetInnerHTML={{ __html: item.c }}
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

  const DescCollapse = (props) => {
    let [isToggleOn, setIsToggleOn] = useState(false)

    const ToggleTableHandler = (event) => {
      event.preventDefault()
      setIsToggleOn(!isToggleOn)
    }

    return (
      <div className={styles['description-content']}>
        <p
          className={styles['description']}
          style={{ WebkitLineClamp: isToggleOn === true ? 'initial' : 3 }}
          dangerouslySetInnerHTML={{
            __html: '<b>Definition:</b> ' + props.desc,
          }}
        ></p>
        {props.desc.replace(/<b>/g, '').replace(/<\/b>/g, '').length > 200 && (
          <a
            href="/#"
            aria-label={isToggleOn === true ? 'collapse' : 'expand'}
            onClick={ToggleTableHandler}
          >
            {isToggleOn === true ? <span>Less...</span> : <span>More... </span>}
          </a>
        )}
      </div>
    )
  }

  const PropsItems = (props) => {
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
              </li>
            </ul>
          </Col>
          <Col
            className={styles['table-col-right']}
            data-class="TableColRight"
            xs={9}
          >
            <Row className={styles['table-row']} data-class="TableRowProps">
              <Col
                className={styles['table-col-props']}
                data-class="TableCol"
                xs={12}
              >
                <Row>
                  <Col xs={10}>
                    <a
                      href="/#"
                      dangerouslySetInnerHTML={{
                        __html: props.item.property.n,
                      }}
                      onClick={ToggleTableHandler}
                    ></a>
                  </Col>
                  <Col className={styles['col-right']} xs={2}>
                    <a
                      href="/#"
                      aria-label={isToggleOn === true ? 'collapse' : 'expand'}
                      onClick={ToggleTableHandler}
                    >
                      {isToggleOn === true ? <MinusIcon /> : <PlusIcon />}
                    </a>
                  </Col>
                </Row>
                <Collapse in={isToggleOn} mountOnEnter={true}>
                  <div data-class="ncit-props-container">
                    {props.item.property.d !== undefined &&
                      props.item.property.d !== '' && (
                        <Row>
                          <Col
                            className={styles['table-col']}
                            data-class="TableCol"
                            xs={12}
                          >
                            <DescCollapse desc={props.item.property.d} />
                          </Col>
                        </Row>
                      )}
                    {props.item.property.ncit !== undefined && (
                      <NcitProps ncit={props.item.ncit} />
                    )}
                  </div>
                </Collapse>
                {props.item.type !== undefined && (
                  <Row className={styles['row-with-enum']}>
                    <Col xs={4}>
                      <span className={styles['prop-type']}>
                        type: {props.item.type}
                      </span>
                    </Col>
                    <Col className={styles['col-right']} xs={8}>
                      {(props.item.type === 'enum' ||
                        props.item.type === 'array') && (
                        <>
                          <AllValuesModal idterm={props.item.id} />
                          <ToCompareModal idterm={props.item.id} />
                        </>
                      )}
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }

  const PropsItemsContainer = (props) => {
    return (
      <Row key={props.index}>
        <Col
          className={styles['table-col-left']}
          data-class="TableColLeft"
          xs={2}
        >
          <div className={styles['div-center']}>
            <span
              className={styles['code-span']}
              dangerouslySetInnerHTML={{
                __html: `${props.cross.code}<br/>${props.cross.ref}`,
              }}
            ></span>
          </div>
        </Col>
        <Col
          className={styles['table-col-right']}
          data-class="TableColRight"
          xs={10}
        >
          {props.cross.props.gdc.length !== 0 && (
            <Row className={styles['table-row']}>
              <Col
                className={styles['table-col-left']}
                data-class="TableColLeft"
                xs={2}
              >
                <div className={styles['div-center']}>Genomic Data Commons</div>
              </Col>
              <Col
                className={styles['table-col-right']}
                data-class="TableColRight"
                xs={10}
              >
                {props.cross.props.gdc.map((prop, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={prop} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.props.ctdc.length !== 0 && (
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
                {props.cross.props.ctdc.map((prop, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={prop} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.props.icdc.length !== 0 && (
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
                data-class="TableColRight"
                xs={10}
              >
                {props.cross.props.icdc.map((prop, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={prop} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.props.pcdc.length !== 0 && (
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
                {props.cross.props.pcdc.map((prop, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={prop} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    )
  }

  if (crossProps.length !== 0) {
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
                <div className={styles['table-th']}>Node</div>
              </Col>
              <Col xs={8}>
                <div className={styles['table-th']}>Matched Properties</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles['table-body']}>
          <Col xs={12}>
            {crossProps.map((cross, index) => (
              <PropsItemsContainer cross={cross} key={index} />
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

export default PropsTable
