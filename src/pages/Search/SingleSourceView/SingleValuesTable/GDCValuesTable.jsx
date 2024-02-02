import { useState } from 'react'
import styles from './SingleValuesTable.module.css'
import { Container, Row, Col, Table, Tab, Nav, Collapse } from 'react-bootstrap'
import {
  MinusIcon,
  PlusIcon,
  AngleDownIcon,
  AngleUpIcon,
} from '@/components/ui/icons/Icons'
import {
  getHighlightObj,
  sortAlphabetically,
  sortSynonyms,
} from '../../../../shared'

import TableValue from '../../components/TableValue/TableValue'

const GDCValuesTable = (props) => {
  let items = JSON.parse(JSON.stringify(props.values))
  let values = []

  items.forEach((data) => {
    if (data._source.source !== 'gdc') return
    let enums = data.inner_hits.enum
    if (enums.hits.hits.length !== 0) {
      // If the searched term is cde id.
      let enumHits = enums.hits.hits
      let obj = {}
      obj.category = data._source.category
      obj.node = data._source.node
      obj.property = data._source.prop
      obj.id = data._source.id
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
                }
                newSyn.push(synObj)
              })
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
          if (source.icdo && source.icdo.s !== undefined) {
            valueObj.ic_enum = source.icdo.s
            // source.ic_enum.forEach(ic => {
            //   if (ic.term_type === '*') termTypeNotAssigned = true;
            // });
          }
          obj.vs.push(valueObj)
        }
      })
      obj.vs = sortAlphabetically(obj.vs)
      // valuesCount += obj.vs.length;
      values.push(obj)
    }
  })

  const ValueItem = (props) => {
    let [isToggleOn, setIsToggleOn] = useState(false)

    const ToggleTableHandler = (event) => {
      event.preventDefault()
      setIsToggleOn(!isToggleOn)
    }

    return (
      <Row className={styles['table-row']} key={props.index}>
        <Col className={styles['table-col']} xs={3}>
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

        <Col className={styles['table-values']} xs={9}>
          <div>
            {props.item.vs.slice(0, 5).map((value, index) => {
              return (
                <Row
                  className={styles['table-row-value']}
                  data-class="TableRowValue"
                  key={index}
                >
                  <TableValue
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
                            ncitName={value.n}
                            nciTerms={value.n_syn}
                            icdo3Code={value.i_c}
                            icdo3Synonyms={value.ic_enum}
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
    )
  }

  if (values.length !== 0) {
    return (
      <Container className={styles['container']}>
        <Row className={styles['table-thead']}>
          <Col xs={3}>
            <div className={styles['table-th']}>Category / Node / Property</div>
          </Col>
          <Col xs={9}>
            <div className={styles['table-th']}>Matched GDC Values</div>
          </Col>
        </Row>
        <Row className={styles['table-body']}>
          <Col xs={12}>
            {values.map((item, index) => (
              <ValueItem item={item} key={index} />
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

export default GDCValuesTable
