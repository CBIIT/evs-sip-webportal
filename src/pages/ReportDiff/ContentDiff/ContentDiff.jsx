import { useState } from 'react'
import styles from './ContentDiff.module.css'
import { Button } from 'react-bootstrap'
import {
  compareAllWithGDCDictionary,
  exportCompareResult,
  exportAllCompareResult,
} from '../../../api'

import LoadingAnimation from '../../../components/LoadingAnimation/LoadingAnimation'
import FormDiff from '../FormDiff/FormDiff'
import TabController from '../TabController/TabController'

const ContentDiff = () => {
  const [loadingState, setLoadingState] = useState(false)
  const [loadedDataStage, setLoadedDataStage] = useState(false)
  const [resultState, setResultState] = useState([])
  const [typeState, setTypeState] = useState('all')
  const [pageSizeState, setPageSizeState] = useState(25)
  const [totalState, setTotalState] = useState(0)
  const [pageCountState, setPageCountState] = useState(0)
  const [searchState, setSearchState] = useState({
    all: '',
    unmapped: '',
    mapped: '',
    conflict: '',
  })
  const [pageState, setPageState] = useState({
    all: 1,
    unmapped: 1,
    mapped: 1,
    conflict: 1,
  })

  const reportTrigger = () => {
    setLoadingState(true)
    compareAllWithGDCDictionary().then((result) => {
      setLoadingState(false)
      setLoadedDataStage(true)
      setResultState(result.data)
      setPageSizeState(result.pageInfo.pageSize)
      setTotalState(result.pageInfo.total)
      setPageCountState(result.pageInfo.total / result.pageInfo.pageSize)
      setTypeState('all')
      setSearchState({
        all: '',
        unmapped: '',
        mapped: '',
        conflict: '',
      })
      setPageState({
        all: result.pageInfo.page,
        unmapped: 1,
        mapped: 1,
        conflict: 1,
      })
    })
  }

  const handleSelectTab = (type) => {
    compareAllWithGDCDictionary(
      type,
      pageState[type],
      pageSizeState,
      searchState[type]
    ).then((result) => {
      setResultState(result.data)
      setTypeState(type)
      pageState[type] = result.pageInfo.page
      setPageState(pageState)
      setPageSizeState(result.pageInfo.pageSize)
      setPageCountState(result.pageInfo.total / result.pageInfo.pageSize)
    })
  }

  const handleDownloadResult = () => {
    exportCompareResult(typeState, searchState[typeState]).then((result) => {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      const url = window.URL.createObjectURL(result)
      a.href = url
      a.download = 'report_' + typeState + '.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    })
  }

  const handleDowloadAllResults = () => {
    exportAllCompareResult().then((result) => {
      const a = document.createElement('a')
      document.body.appendChild(a)
      a.style = 'display: none'
      const url = window.URL.createObjectURL(result)
      a.href = url
      a.download = 'full_report.xlsx'
      a.click()
      window.URL.revokeObjectURL(url)
      a.remove()
    })
  }

  const handlePageClick = (data) => {
    const page = data.selected + 1
    compareAllWithGDCDictionary(
      typeState,
      page,
      pageSizeState,
      searchState[typeState]
    ).then((result) => {
      setResultState(result.data)
      pageState[typeState] = result.pageInfo.page
      setPageState(pageState)
    })
  }

  const handlepageSizeChange = (event) => {
    const pageSize = event.target.value
    compareAllWithGDCDictionary(
      typeState,
      1,
      pageSize,
      searchState[typeState]
    ).then((result) => {
      setResultState(result.data)
      setPageState({
        all: 1,
        unmapped: 1,
        mapped: 1,
        conflict: 1,
      })
      setPageSizeState(result.pageInfo.pageSize)
      setPageCountState(result.pageInfo.total / result.pageInfo.pageSize)
    })
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    const keyword = searchState[typeState]
      .trim()
      .replace(/\s{2,}/g, ' ')
      .toLowerCase()
    compareAllWithGDCDictionary(typeState, 1, pageSizeState, keyword).then(
      (result) => {
        setResultState(result.data)
        pageState[typeState] = 1
        setPageState(pageState)
        setPageCountState(result.pageInfo.total / result.pageInfo.pageSize)
      }
    )
  }

  return (
    <div className={styles['content-box']}>
      <h1 className={styles['content-box-title']}>Report Differences</h1>
      <div className={styles['content-box-text']}>
        <p>
          The Report Differences is a tool to compare the mapped NCIt codes of
          selected Compare Type (Node/Property/Value) between the official GDC
          Dictionary and Data Commons. Currently, only preset options are
          supported.
        </p>
        <p>
          The results have four tabs, &quot;All&quot;, &quot;Unmapped&quot;,
          &quot;Mapped&quot;, and &quot;Conflict&quot;.
        </p>
        <ul>
          <li>
            &quot;All&quot; tab includes all values from specified GDC
            Dictionary and data source.{' '}
          </li>
          <li>
            &quot;Mapped&quot; tab includes all values with NCIt code mappings
            from data source.
          </li>
          <li>
            &quot;Unmapped&quot; tab includes all values without NCIt code
            mappings from data source.
          </li>
          <li>
            &quot;Conflict&quot; tab includes all values with different NCIt
            code mappings from specified GDC Dictionary and data source.
          </li>
        </ul>
        <p>
          The results could be downloaded in xls format for all tabs, or from
          each tab.
        </p>
        <FormDiff reportTrigger={reportTrigger} />
        {loadedDataStage && (
          <>
            <div className={styles['title-container']}>
              <h2>Result</h2>
              <Button variant="secondary" onClick={handleDowloadAllResults}>
                Download All Results
              </Button>
            </div>
            <TabController
              selectTab={handleSelectTab}
              type={typeState}
              result={resultState}
              pageClick={handlePageClick}
              pageSizeChange={handlepageSizeChange}
              currentPage={pageState}
              pageSize={pageSizeState}
              pageCount={pageCountState}
              total={totalState}
              search={searchState}
              setSearch={setSearchState}
              searchSubmit={handleSearchSubmit}
              downloadResult={handleDownloadResult}
            />
          </>
        )}
      </div>
      {loadingState && <LoadingAnimation />}
    </div>
  )
}

export default ContentDiff
