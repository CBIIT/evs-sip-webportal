import { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { apiSuggest } from '../../../api'
import { debounce } from '../../../utils'
import styles from './Search.module.css'
import {
  Container,
  Row,
  Col,
  InputGroup,
  Button,
  FormControl,
} from 'react-bootstrap'
import { ArrowRightIcon, CheckIcon } from '../../../components/ui/icons/Icons'
import SuggestBox from '../../Search/SuggestBox/SuggestBox'
import {
  setKeyword,
  setDataSources,
  setIsSearching,
} from '@/reducers/searchSlice'

const Search = () => {
  const [suggestState, setSuggestState] = useState([])
  const [selectIndexState, setSelectIndexState] = useState(-1)
  const [isToggleOnSource, setIsToggleOnSource] = useState(false)

  const keyword = useSelector((state) => state.search.keyword)
  const dataSources = useSelector((state) => state.search.dataSources)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const searchHandler = (kywd) => {
    const keywordCase = kywd.trim()
    dispatch(setKeyword(keywordCase))
    dispatch(setIsSearching(true))
    navigate('./search')
  }

  const suggestHandlerDebounce = useRef(
    debounce((value) => {
      apiSuggest(value)
        .then((result) => {
          return setSuggestState(result)
        })
        .catch((error) => {
          console.error(error)
          // Handle errors as needed
        })
    }, 300)
  ).current

  const suggestHandler = (event) => {
    const value = event.target.value
    dispatch(setKeyword(value))
    suggestHandlerDebounce(value)
  }

  const suggestKeyPressHandler = (event) => {
    if (event.keyCode === 13 && selectIndexState === -1) {
      dispatch(setKeyword(event.target.value))
      setSuggestState([])
      searchHandler(event.target.value)
    }
    if (
      event.keyCode === 13 &&
      suggestState.length !== 0 &&
      selectIndexState !== -1
    ) {
      dispatch(setKeyword(suggestState[selectIndexState].id))
      setSuggestState([])
      searchHandler(suggestState[selectIndexState].id)
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

  const suggestClickHandler = (id, event) => {
    dispatch(setKeyword(id))
    setSuggestState([])
    searchHandler(id)
  }

  const cleanSuggestHandler = () => {
    setSuggestState([])
    setSelectIndexState(-1)
  }

  const selectDataToggleHandler = (event) => {
    dispatch(
      setDataSources({
        ...dataSources,
        [event.target.name]: event.target.checked,
      })
    )
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

  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <Row className={styles.row}>
          <Col xs={5}>
            <div className={styles['title-container']}>
              <h1 className={styles.title}>
                Semantic Integration for Multiple Data Sources
              </h1>
            </div>
          </Col>
          <Col xs={7}>
            <div className={styles['search-box-container']}>
              <div className={styles['search-box']}>
                <InputGroup>
                  <FormControl
                    className={styles['input-box']}
                    placeholder="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
                    aria-label="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
                    type="text"
                    value={keyword}
                    onChange={suggestHandler}
                    onKeyDown={suggestKeyPressHandler}
                  />
                  <Button
                    className={styles['input-box-btn']}
                    aria-label="search"
                    onClick={() => searchHandler(keyword)}
                  >
                    <ArrowRightIcon />
                  </Button>
                </InputGroup>
                <SuggestBox
                  suggest={suggestState}
                  suggestClick={suggestClickHandler}
                  suggestSelected={selectIndexState}
                  cleanSuggest={cleanSuggestHandler}
                />
                <Row className={styles['options-container']}>
                  <Col className={styles['select-container']} xs={3}>
                    <p className={styles['select-title']}>
                      Choose your <br /> Data Source
                    </p>
                    <Button
                      className={styles['select-btn']}
                      aria-label={
                        isToggleOnSource === false
                          ? 'Select All'
                          : 'Unselect All'
                      }
                      onClick={selectDataAllToggleHandler}
                    >
                      {isToggleOnSource === false
                        ? 'Select All'
                        : 'Unselect All'}
                    </Button>
                  </Col>
                  <Col xs={9}>
                    <div className={styles['checkbox-group']}>
                      <label className={styles['checkbox-label']}>
                        <input
                          className={styles['checkbox-input']}
                          name="gdc"
                          type="checkbox"
                          checked={dataSources.gdc}
                          onChange={selectDataToggleHandler}
                        />
                        <span className={styles['checkbox-btn']}>
                          <CheckIcon className={styles['checkbox-icon']} />
                        </span>
                        Genomic Data Commons
                      </label>
                      <label className={styles['checkbox-label']}>
                        <input
                          className={styles['checkbox-input']}
                          name="ctdc"
                          type="checkbox"
                          checked={dataSources.ctdc}
                          onChange={selectDataToggleHandler}
                        />
                        <span className={styles['checkbox-btn']}>
                          <CheckIcon className={styles['checkbox-icon']} />
                        </span>
                        Clinical Trial Data Commons
                      </label>
                      <label className={styles['checkbox-label']}>
                        <input
                          className={styles['checkbox-input']}
                          name="icdc"
                          type="checkbox"
                          checked={dataSources.icdc}
                          onChange={selectDataToggleHandler}
                        />
                        <span className={styles['checkbox-btn']}>
                          <CheckIcon className={styles['checkbox-icon']} />
                        </span>
                        Integrated Canine Data Commons
                      </label>
                    </div>
                    <div className={styles['checkbox-group']}>
                      <label className={styles['checkbox-label']}>
                        <input
                          className={styles['checkbox-input']}
                          name="pcdc"
                          type="checkbox"
                          checked={dataSources.pcdc}
                          onChange={selectDataToggleHandler}
                        />
                        <span className={styles['checkbox-btn']}>
                          <CheckIcon className={styles['checkbox-icon']} />
                        </span>
                        Pedriactic Cancer Data Model
                      </label>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Search
