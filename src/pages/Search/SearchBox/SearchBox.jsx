import React, { useState, useRef, useEffect } from 'react'
import styles from './SearchBox.module.css'
import debounce from 'lodash.debounce'
import { apiSuggest, apiSearchAll } from '../../../api'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircle, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons'
import SuggestBox from '../SuggestBox/SuggestBox'
import LoadingAnimation from '../../../components/LoadingAnimation/LoadingAnimation'
import { useSelector, useDispatch } from 'react-redux'
import {
  setKeyword,
  setResult,
  setError,
  setMatchOptions,
  setOptionsSearch,
  setDataSources,
  setSearchTerm,
  setIsLoading,
  setIsSearching,
} from '../../../reducers/searchSlice'

const SearchBox = () => {
  let [suggestState, setSuggestState] = useState([])
  let [selectIndexState, setSelectIndexState] = useState(-1)

  let [isToggleOnOptions, setIsToggleOnOptions] = useState(false)
  let [isToggleOnSource, setIsToggleOnSource] = useState(false)

  const keyword = useSelector((state) => state.search.keyword)
  const error = useSelector((state) => state.search.error)
  const match = useSelector((state) => state.search.match)
  const options = useSelector((state) => state.search.options)
  const dataSources = useSelector((state) => state.search.dataSources)
  const isLoading = useSelector((state) => state.search.isLoading)
  const isSearching = useSelector((state) => state.search.isSearching)

  const searchInputRef = useRef()
  const dispatch = useDispatch()

  const searchHandler = (keyword, match, options, dataSources) => {
    let keywordCase = keyword.trim()
    dispatch(setKeyword(keywordCase))
    dispatch(setSearchTerm(keywordCase))
    dispatch(setIsLoading(true))

    if (keywordCase === '') {
      dispatch(setError(true))
      dispatch(setResult({}))
      dispatch(setIsLoading(false))
      return
    }

    apiSearchAll(keyword, match, options, dataSources).then((result) => {
      dispatch(setIsLoading(false))
      dispatch(setError(false))
      dispatch(setResult(result))
      dispatch(setIsSearching(false))
    })
  }

  const suggestClickHandler = (id, event) => {
    dispatch(setKeyword(id))
    setSuggestState([])
    searchHandler(id, match, options, dataSources)
  }

  const suggestKeyPressHandler = (event) => {
    if (event.keyCode === 13 && selectIndexState === -1) {
      dispatch(setKeyword(event.target.value))
      setSuggestState([])
      searchHandler(event.target.value, match, options, dataSources)
    }
    if (event.keyCode === 13 && suggestState.length !== 0 && selectIndexState !== -1) {
      dispatch(setKeyword(suggestState[selectIndexState].id))
      setSuggestState([])
      searchHandler(suggestState[selectIndexState].id, match, options, dataSources)
    }
    if (event.keyCode === 38 || event.keyCode === 40) {
      let index = selectIndexState
      index += event.keyCode === 40 ? 1 : -1
      if (index >= suggestState.length) {
        index = 0
      }
      if (index < 0) {
        index = suggestState.length - 1
      }
      setSelectIndexState(index)
    }
  }

  const cleanSearchBar = (event) => {
    event.preventDefault()
    dispatch(setKeyword(''))
    searchInputRef.current.focus()
  }

  const cleanSuggestHandler = () => {
    setSuggestState([])
    setSelectIndexState(-1)
  }

  const suggestHandlerDebounce = useRef(
    debounce((value) => {
      apiSuggest(value)
        .then((result) => setSuggestState(result))
        .catch((error) => {
          console.log(error)
        })
    }, 300)
  ).current

  const suggestHandler = (event) => {
    let value = event.target.value
    dispatch(setKeyword(value))
    suggestHandlerDebounce(value)
  }

  const matchOptionsHandler = (event) => {
    dispatch(setMatchOptions(event.target.value))
  }

  const checkedToggleHandler = (event) => {
    dispatch(
      setOptionsSearch({
        ...options,
        [event.target.name]: event.target.checked,
      })
    )
  }

  const selectDataToggleHandler = (event) => {
    dispatch(
      setDataSources({
        ...dataSources,
        [event.target.name]: event.target.checked,
      })
    )
  }

  const checkedAllToggleHandler = (event) => {
    if (isToggleOnOptions === false) {
      dispatch(
        setOptionsSearch({
          desc: true,
          syns: true,
          npsyns: true,
        })
      )
    } else {
      dispatch(
        setOptionsSearch({
          desc: false,
          syns: false,
          npsyns: false,
        })
      )
    }
    setIsToggleOnOptions(!isToggleOnOptions)
  }

  const selectDataAllToggleHandler = (event) => {
    if (isToggleOnSource === false) {
      dispatch(
        setDataSources({
          ctdc: true,
          gdc: true,
          icdc: true,
          pcdc: true,
        })
      )
    } else {
      dispatch(
        setDataSources({
          ctdc: false,
          gdc: false,
          icdc: false,
          pcdc: false,
        })
      )
    }
    setIsToggleOnSource(!isToggleOnSource)
  }

  useEffect(() => {
    if (isSearching !== undefined && isSearching === true) {
      dispatch(setMatchOptions('partial'))
      dispatch(
        setOptionsSearch({
          desc: false,
          syns: false,
          npsyns: false,
        })
      )
      searchHandler(keyword, match, options, dataSources)
    }
  })

  return (
    <div className={styles.container}>
      {isLoading && <LoadingAnimation />}
      <div className={styles['search-bar-container']}>
        <div className={styles['search-bar']}>
          <InputGroup>
            <FormControl
              type="text"
              className={`${styles['form-control']}${error ? ` ${styles.error}` : ''}`}
              value={keyword}
              onChange={suggestHandler}
              onKeyDown={suggestKeyPressHandler}
              placeholder="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
              aria-label="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
              ref={searchInputRef}
            />
            <a
              aria-label="Delete"
              className={styles['delete-button']}
              href="/#"
              onClick={cleanSearchBar}
              style={keyword.length === 0 ? {} : { display: 'block' }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </a>
            <Button
              aria-label="Search"
              className={styles['search-button']}
              onClick={() => searchHandler(keyword, match, options, dataSources)}
            >
              <FontAwesomeIcon className={styles['search-button-icon']} icon={faArrowRight} />
            </Button>
          </InputGroup>
          <SuggestBox
            suggest={suggestState}
            suggestClick={suggestClickHandler}
            suggestSelected={selectIndexState}
            cleanSuggest={cleanSuggestHandler}
          />
        </div>
        <div className={styles['search-all-options']}>
          <div className={styles['search-options-container']}>
            <div className={styles['search-options']}>
              <div className={styles['form-group-radio']}>
                <label className={styles['radio-label']}>
                  <input
                    className={styles['radio-input']}
                    name="match"
                    type="radio"
                    value="partial"
                    checked={match === 'partial'}
                    onChange={matchOptionsHandler}
                  />
                  <span className={styles['radio-span']}>
                    <FontAwesomeIcon className={styles['radio-icon']} icon={faCircle} />
                  </span>
                  <span>Partial match of values or properties</span>
                </label>
                <label className={styles['radio-label']}>
                  <input
                    className={styles['radio-input']}
                    name="match"
                    type="radio"
                    value="exact"
                    checked={match === 'exact'}
                    onChange={matchOptionsHandler}
                  />
                  <span className={styles['radio-span']}>
                    <FontAwesomeIcon className={styles['radio-icon']} icon={faCircle} />
                  </span>
                  <span>Exact match of values or properties</span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles['search-options-container']}>
            <label className={styles['search-options-label']}>Search Include</label>
            <div className={styles['search-options']}>
              <Button
                className={styles['select-button']}
                aria-label={isToggleOnOptions === false ? 'Select All' : 'Unselect All'}
                onClick={checkedAllToggleHandler}
              >
                {isToggleOnOptions === false ? 'Select All' : 'Unselect All'}
              </Button>
              <div className={styles['form-group']}>
                <label className={styles['checkbox-label']}>
                  <input
                    className={styles['checkbox-input']}
                    name="desc"
                    type="checkbox"
                    checked={options['desc']}
                    onChange={checkedToggleHandler}
                  />
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck} />
                  </span>
                  Search Property Description
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    className={styles['checkbox-input']}
                    name="syns"
                    type="checkbox"
                    checked={options['syns']}
                    onChange={checkedToggleHandler}
                  />
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck} />
                  </span>
                  Search Synonyms of Values
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    className={styles['checkbox-input']}
                    name="npsyns"
                    checked={options['npsyns']}
                    onChange={checkedToggleHandler}
                    type="checkbox"
                  />
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck} />
                  </span>
                  Search Synonyms of Properties/Nodes
                </label>
              </div>
            </div>
          </div>
          <div className={styles['search-options-container']}>
            <label className={styles['search-options-label']}>Choose your Data Source</label>
            <div className={styles['search-options']}>
              <Button
                className={styles['select-button']}
                aria-label={isToggleOnSource === false ? 'Select All' : 'Unselect All'}
                onClick={selectDataAllToggleHandler}
              >
                {isToggleOnSource === false ? 'Select All' : 'Unselect All'}
              </Button>
              <div className={styles['form-group']}>
                <label className={styles['checkbox-label']}>
                  <input
                    className={styles['checkbox-input']}
                    name="gdc"
                    type="checkbox"
                    checked={dataSources['gdc']}
                    onChange={selectDataToggleHandler}
                  />
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck} />
                  </span>
                  Genomic Data Commons(GDC)
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    className={styles['checkbox-input']}
                    name="ctdc"
                    type="checkbox"
                    checked={dataSources['ctdc']}
                    onChange={selectDataToggleHandler}
                  />
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck} />
                  </span>
                  Clinical Trial Data Commons (CTDC)
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    className={styles['checkbox-input']}
                    name="icdc"
                    type="checkbox"
                    checked={dataSources['icdc']}
                    onChange={selectDataToggleHandler}
                  />
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck} />
                  </span>
                  Integrated Canine Data Commons (ICDC)
                </label>
                <label className={styles['checkbox-label']}>
                  <input
                    className={styles['checkbox-input']}
                    name="pcdc"
                    type="checkbox"
                    checked={dataSources['pcdc']}
                    onChange={selectDataToggleHandler}
                  />
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck} />
                  </span>
                  Pediatric Cancer Data Commons (PCDC)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBox
