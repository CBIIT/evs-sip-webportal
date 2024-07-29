import React, { useState } from 'react'
import styles from './NodesTable.module.css'
import { Container, Row, Col, Table, Collapse } from 'react-bootstrap'
import { MinusIcon, PlusIcon } from '../../../../components/ui/icons/Icons'
import { getHighlightObj } from '../../../../utils'

const NodesTable = (props) => {
  let items = JSON.parse(JSON.stringify(props.nodes))
  let nodes = []

  items.forEach((item) => {
    let node = item.inner_hits.node

    if (node.hits.hits.length !== 0) {
      let nodeHits = node.hits.hits

      nodeHits.forEach((hits) => {
        if (
          nodes.findIndex(
            (n) =>
              n.source === item._source.source &&
              n.category === item._source.category &&
              n.node.node_name.replace(/<b>/g, '').replace(/<\/b>/g, '') ===
                item._source.node.node_name
          ) !== -1
        )
          return

        let hl = hits.highlight

        let highlightNode =
          'node.node_name' in hl || 'node.node_name.have' in hl
            ? hl['node.node_name'] || hl['node.node_name.have']
            : undefined
        let highlightNodeObj = getHighlightObj(highlightNode)

        let highlightDesc =
          'node.node_description' in hl || 'node.node_description.have' in hl
            ? hl['node.node_description'] || hl['node.node_description.have']
            : undefined
        let highlightDescObj = getHighlightObj(highlightDesc)

        let highlightNC =
          'node.node_ncit.ncit_code' in hl || 'node.node_ncit.ncit_code.have' in hl
            ? hl['node.node_ncit.ncit_code'] || hl['node.node_ncit.ncit_code.have']
            : undefined
        let highlightNCObj = getHighlightObj(highlightNC)

        let highlightSyn =
          'node.node_ncit.ncit_synonyms.name' in hl || 'nodes.node_ncit.ncit_synonyms.name.have' in hl
            ? hl['node.node_ncit.ncit_synonyms.name'] || hl['node.node_ncit.ncit_synonyms.name.have']
            : undefined
        let highlightSynObj = getHighlightObj(highlightSyn)

        let nodeObj = {}
        nodeObj.category = item._source.category
        nodeObj.node = item._source.node
        nodeObj.id = item._source.id
        nodeObj.source = item._source.source
        nodeObj.property = item._source.property
        nodeObj.type = item._source.property_type
        nodeObj.node.node_name = highlightNodeObj[item._source.node.node_name]
          ? highlightNodeObj[item._source.node.node_name]
          : item._source.node.node_name
        nodeObj.node.node_description = highlightDescObj[item._source.node.node_description]
          ? highlightDescObj[item._source.node.node_description]
          : item._source.node.node_description

        // nodeObj.ncit = hits._source.ncit ? hits._source.ncit : undefined

        if (nodeObj.node.node_ncit !== undefined && nodeObj.node.node_ncit !== 0) {
          nodeObj.node.node_ncit.forEach((node_ncit, i) => {
            nodeObj.node.node_ncit[i].ncit_code = highlightNCObj[node_ncit.ncit_code]
              ? highlightNCObj[node_ncit.ncit_code]
              : node_ncit.ncit_code

            if (node_ncit.ncit_synonyms !== undefined && node_ncit.ncit_synonyms  !== 0) {
              node_ncit.ncit_synonyms.forEach((ncit_synonym, j) => {
                nodeObj.node.node_ncit[i].ncit_synonyms[j].name = highlightSynObj[ncit_synonym.name]
                  ? highlightSynObj[ncit_synonym.name]
                  : ncit_synonym.name
              })
            }
          })
        }

        nodes.push(nodeObj)
      })
    }
  })

  let mappingObj = {}
  nodes.forEach((node) => {
    if (node.node_ncit !== undefined && node.node_ncit  !== 0) {
      node.node_ncit.forEach((node_ncit) => {
        if (mappingObj[node_ncit.ncit_code] === undefined) {
          mappingObj[node_ncit.ncit_code] = []
          mappingObj[node_ncit.ncit_code].push(node)
        } else {
          mappingObj[node_ncit.ncit_code].push(node)
        }
      })
    } else {
      if (mappingObj['no-mapping'] === undefined) {
        mappingObj['no-mapping'] = []
        mappingObj['no-mapping'].push(node)
      } else {
        mappingObj['no-mapping'].push(node)
      }
    }
  })

  let crossNodes = []

  Object.entries(mappingObj).forEach((entry) => {
    let ctdcNodes = []
    let gdcNodes = []
    let icdcNodes = []
    let pcdcNodes = []

    if (entry[1] !== undefined && entry[1].length !== 0) {
      entry[1].forEach((prop) => {
        if (prop.source !== undefined && prop.source === 'ctdc') {
          ctdcNodes.push(prop)
        }
        if (prop.source !== undefined && prop.source === 'gdc') {
          gdcNodes.push(prop)
        }
        if (prop.source !== undefined && prop.source === 'icdc') {
          icdcNodes.push(prop)
        }
        if (prop.source !== undefined && prop.source === 'pcdc') {
          pcdcNodes.push(prop)
        }
      })
    }

    crossNodes.push({
      code: entry[0] !== 'no-mapping' ? entry[0] : 'No NCIt Mapping',
      ref: 'NCIt',
      nodes: {
        ctdc: ctdcNodes,
        gdc: gdcNodes,
        icdc: icdcNodes,
        pcdc: pcdcNodes,
      },
    })
  })

  const TableSynonyms = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) => (
        <tr key={index}>
          <td dangerouslySetInnerHTML={{ __html: item.name }}></td>
          <td>{item.source}</td>
          <td>{item.termType}</td>
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
                  item.ncit_code.replace(/<b>/g, '').replace(/<\/b>/g, '')
                }
                rel="noopener noreferrer"
                target="_blank"
                dangerouslySetInnerHTML={{ __html: item.ncit_code }}
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
                  <TableSynonyms synonyms={item.ncit_synonyms} />
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
      <p>
        <span
          dangerouslySetInnerHTML={{
            __html: '<b>Definition:</b> ' + props.desc.substring(0, 138),
          }}
        ></span>
        {props.desc.length >= 138 && (
          <>
            <span
              className={isToggleOn === true ? '' : 'd-none'}
              dangerouslySetInnerHTML={{ __html: props.desc.substring(138) }}
            ></span>
            <a
              className={styles['link-desc']}
              href="/#"
              aria-label={isToggleOn === true ? 'collapse' : 'expand'}
              onClick={ToggleTableHandler}
            >
              {isToggleOn === true ? (
                <span>Less...</span>
              ) : (
                <span>More... </span>
              )}
            </a>
          </>
        )}
      </p>
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
                      dangerouslySetInnerHTML={{ __html: props.item.node.node_name }}
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
                  <div data-class="ncit-node-container">
                    {props.item.node.node_description !== undefined &&
                      props.item.node.node_description !== '' && (
                        <Row>
                          <Col
                            className={styles['table-col']}
                            data-class="TableCol"
                            xs={12}
                          >
                            <DescCollapse desc={props.item.node.node_description} />
                          </Col>
                        </Row>
                      )}
                    {props.item.node.ncit !== undefined && (
                      <NcitProps ncit={props.item.node.node_ncit} />
                    )}
                  </div>
                </Collapse>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    )
  }

  const NodesItemsContainer = (props) => {
    return (
      <Row key={props.index}>
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
          </div>
        </Col>
        <Col
          className={styles['table-col-right']}
          data-class="TableColRight"
          xs={10}
        >
          {props.cross.nodes.gdc.length !== 0 && (
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
                {props.cross.nodes.gdc.map((node, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={node} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.nodes.ctdc.length !== 0 && (
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
                {props.cross.nodes.ctdc.map((node, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={node} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.nodes.icdc.length !== 0 && (
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
                {props.cross.nodes.icdc.map((node, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={node} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
          {props.cross.nodes.pcdc.length !== 0 && (
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
                {props.cross.nodes.pcdc.map((node, index) => (
                  <Row
                    className={styles['table-row-props']}
                    data-class="TableRowValues"
                    key={index}
                  >
                    <PropsItems item={node} />
                  </Row>
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    )
  }

  if (crossNodes.length !== 0) {
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
                <div className={styles['table-th']}>Category</div>
              </Col>
              <Col xs={8}>
                <div className={styles['table-th']}>Matched Nodes</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles['table-body']}>
          <Col xs={12}>
            {crossNodes.map((cross, index) => (
              <NodesItemsContainer cross={cross} key={index} />
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

export default NodesTable
