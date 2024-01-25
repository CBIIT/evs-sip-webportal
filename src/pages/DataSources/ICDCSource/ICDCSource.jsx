import { useState, useEffect, useCallback } from 'react'
import { baseUrl } from '../../../api'
import styles from './ICDCSource.module.css'
import { Table, Tabs, Tab } from 'react-bootstrap'
import {
  AngleDownIcon,
  EditIcon,
  TimesIcon,
} from '../../../components/ui/icons/Icons'

import BatchUpdateModal from '../../../components/Modals/BatchUpdateModal'
import DashboardContainer from '../../../components/DashboardContainer/DashboardContainer'
import SearchFormComponent from '../../../components/SearchFormComponet/SearchFormComponent'
import Button from '../../../components/ui/Button/Button'
import PaginationController from '../../../components/PaginationController/PaginationController'
import PageSizeComponent from '../../../components/PageSizeComponent/PageSizeComponent'
import AddNewValueModal from '../../../components/Modals/AddNewValueModal/AddNewValueModal'
import AddNewPropertyModal from '../../../components/Modals/AddNewPropertyModal/AddNewPropertyModal'

const ICDCSource = () => {
  const [nodeState, setNodeState] = useState({})
  const [propState, setPropState] = useState({})
  const [valueState, setValueState] = useState({})
  const [tabState, setTabState] = useState('values')
  const [searchTerm, setSearchTerm] = useState('')
  const [pageCountState, setPageCountState] = useState({
    values: 0,
    props: 0,
    nodes: 0,
  })
  const [currentPageState, setCurrentPageState] = useState({
    values: 1,
    props: 1,
    nodes: 1,
  })
  const [pageSizeState, setPageSizeState] = useState({
    values: 10,
    props: 10,
    nodes: 10,
  })

  const [rowSpanState, setRowSpanState] = useState({})

  const rowSpanCount = useCallback(
    (result, type) => {
      if (result === undefined || result.length === 0) return
      const rowSpan = {}
      switch (tabState) {
        case 'nodes':
          result.forEach((x, i) => {
            if (x.Category in rowSpan === false) {
              rowSpan[x.Category] = 1
            } else {
              rowSpan[x.Category] = ++rowSpan[x.Category]
            }
          })
          break
        case 'props':
          result.forEach((x, i) => {
            const idx = x.Category + '-' + x.Node_Name
            if (idx in rowSpan === false) {
              rowSpan[idx] = 1
            } else {
              rowSpan[idx] = ++rowSpan[idx]
            }
          })
          break
        default:
          result.forEach((x, i) => {
            const idx = x.Category + '-' + x.Node_Name + '-' + x.Property_Name
            if (idx in rowSpan === false) {
              rowSpan[idx] = 1
            } else {
              rowSpan[idx] = ++rowSpan[idx]
            }
          })
          break
      }
      setRowSpanState(rowSpan)
    },
    [tabState]
  )

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${baseUrl}/datamodel/search?keyword=${searchTerm}&model=ICDC&type=${tabState}&page=${currentPageState[tabState]}&pageSize=${pageSizeState[tabState]}`
      )
      const data = await response.json()
      switch (tabState) {
        case 'nodes':
          setNodeState(data[0])
          break
        case 'props':
          setPropState(data[0])
          break
        default:
          setValueState(data[0])
          break
      }
      rowSpanCount(data[0].result, tabState)
      setPageCountState((prevPageCountState) => ({
        ...prevPageCountState,
        [tabState]: data[0][`total_${tabState}`] / pageSizeState[tabState],
      }))
    }

    fetchData()
  }, [searchTerm, tabState, currentPageState, pageSizeState, rowSpanCount])

  const selectTabHandle = async (type) => {
    setTabState(type)
  }

  const handlePageClick = async (x) => {
    const page = x.selected + 1
    setCurrentPageState({ ...currentPageState, [tabState]: page })
  }

  const handleSubmitSearch = async (e) => {
    e.preventDefault()
    const value = e.target[0].value
    setSearchTerm(value)
    setCurrentPageState({ ...currentPageState, [tabState]: 1 })
  }

  const handlePageSize = async (e) => {
    const pageSize = parseInt(e.target.value)
    setPageSizeState({ ...pageSizeState, [tabState]: pageSize })
    setCurrentPageState({ ...currentPageState, [tabState]: 1 })
  }

  return (
    <DashboardContainer>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Clinical Trial Data Commons</h2>
          <div>
            <Button>Graphic View</Button> <Button>Model Update</Button> <br />
            <BatchUpdateModal /> <Button>Change Report</Button>{' '}
          </div>
        </div>
        <div className={styles.tableContainer}>
          <SearchFormComponent submitSearch={handleSubmitSearch} />
          <Tabs
            defaultActiveKey="values"
            id="uncontrolled-tab-example"
            activeKey={tabState}
            onSelect={selectTabHandle}
          >
            <Tab eventKey="values" title="Values">
              <div>
                {Object.keys(valueState).length === 0 ||
                valueState.message === 'No matched data in values' ? (
                  <div>No Results</div>
                ) : (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Category/Node/Property</th>
                        <th>Values</th>
                        <th>NCItcode</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {valueState.result.map((v, i) => {
                        return (
                          <tr
                            key={v.Node_Name + '-' + v.Property_Name + '-' + i}
                          >
                            {(i === 0 ||
                              valueState.result[i - 1].Node_Name !==
                                v.Node_Name ||
                              valueState.result[i - 1].Property_Name !==
                                v.Property_Name) && (
                              <td
                                rowSpan={
                                  rowSpanState[
                                    v.Category +
                                      '-' +
                                      v.Node_Name +
                                      '-' +
                                      v.Property_Name
                                  ]
                                }
                              >
                                <div>
                                  {'Category_Name'}
                                  <ul className={styles.tableUl}>
                                    <li className={styles.tableLi}>
                                      <span className={styles.spanIcon}>
                                        <AngleDownIcon />
                                      </span>
                                      {v.Node_Name}
                                      <ul className={styles.tableUl}>
                                        <li className={styles.tableLi}>
                                          <span className={styles.spanIcon}>
                                            <AngleDownIcon />
                                          </span>
                                          {v.Property_Name}
                                        </li>
                                      </ul>
                                    </li>
                                  </ul>
                                </div>
                                <AddNewValueModal />
                              </td>
                            )}
                            <td>{v.Value}</td>
                            <td>{v.Term_Ncitcode}</td>
                            <td>
                              <a
                                className={styles.tableLink}
                                href="/#"
                                aria-label="edit"
                              >
                                <EditIcon />
                              </a>
                              <a
                                className={styles.tableLink}
                                href="/#"
                                aria-label="edit"
                              >
                                <TimesIcon />
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                )}
              </div>
            </Tab>
            <Tab eventKey="props" title="Properties">
              <div>
                {Object.keys(propState).length === 0 ||
                propState.message === 'No matched data in properties.' ? (
                  <div>No Results</div>
                ) : (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Category/Node</th>
                        <th>Properties</th>
                        <th>NCItcode</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {propState.result.map((p, i) => {
                        return (
                          <tr key={i}>
                            {(i === 0 ||
                              propState.result[i - 1].Category !== p.Category ||
                              propState.result[i - 1].Node_Name !==
                                p.Node_Name) && (
                              <td
                                rowSpan={
                                  rowSpanState[p.Category + '-' + p.Node_Name]
                                }
                              >
                                <div>
                                  {'Category_Name'}
                                  <ul className={styles.tableUl}>
                                    <li className={styles.tableLi}>
                                      <span className={styles.spanIcon}>
                                        <AngleDownIcon />
                                      </span>
                                      {p.Node_Name}
                                    </li>
                                  </ul>
                                </div>
                                <AddNewPropertyModal />
                              </td>
                            )}
                            <td>{p.Property_Name}</td>
                            <td>{p.Property_Ncitcode}</td>
                            <td>
                              <a
                                className={styles.tableLink}
                                href="/#"
                                aria-label="edit"
                              >
                                <EditIcon />
                              </a>
                              <a
                                className={styles.tableLink}
                                href="/#"
                                aria-label="edit"
                              >
                                <TimesIcon />
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                )}
              </div>
            </Tab>
            <Tab eventKey="nodes" title="Nodes">
              <div>
                {Object.keys(nodeState).length === 0 ||
                nodeState.message === 'No matched data in nodes.' ? (
                  <div>No Results</div>
                ) : (
                  <Table bordered>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Node</th>
                        <th>NCItcode</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {nodeState.result.map((n, i) => {
                        return (
                          <tr key={i}>
                            <td>{'Category_Name'}</td>
                            <td>{n.Node_Name}</td>
                            <td>{n.Node_Ncitcode}</td>
                            <td>
                              <a
                                className={styles.tableLink}
                                href="/#"
                                aria-label="edit"
                              >
                                <EditIcon />
                              </a>
                              <a
                                className={styles.tableLink}
                                href="/#"
                                aria-label="edit"
                              >
                                <TimesIcon />
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                )}
              </div>
            </Tab>
          </Tabs>
          <div className={styles.paginationContainer}>
            <PageSizeComponent
              type={tabState}
              pageSize={pageSizeState}
              pageSizeChange={handlePageSize}
            />
            <PaginationController
              type={tabState}
              pageCount={pageCountState}
              currentPage={currentPageState}
              pageClick={handlePageClick}
            />
          </div>
        </div>
      </div>
    </DashboardContainer>
  )
}

export default ICDCSource
