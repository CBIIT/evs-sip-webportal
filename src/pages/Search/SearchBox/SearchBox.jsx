import React, { useState, useRef, useEffect} from 'react';
import styles from './SearchBox.module.css';
import debounce from 'lodash.debounce';
import { apiSuggest, apiSearchAll } from '../../../api';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircle, faArrowRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import SuggestBox from '../SuggestBox/SuggestBox';
import LoadingAnimation from '../../../components/LoadingAnimation/LoadingAnimation';

const SearchBox = (props) => {
  let [suggestState, setSuggestState] = useState([]);
  let [selectIndexState, setSelectIndexState] = useState(-1);

  let [isToggleOnOptions, setIsToggleOnOptions] = useState(false);
  let [isToggleOnSource, setIsToggleOnSource] = useState(false);

  const searchInputRef = useRef();

  const searchHandler = (keyword, match, options, sources) => {
    let keywordCase = keyword.trim();
    //props.setKeyword(keywordCase);
    props.setSearchTerm(keywordCase);
    props.setIsLoading(true);

    if (keywordCase === '') {
      props.setError(true);
      props.setResult({});
      props.setIsLoading(false);
      return;
    }

    apiSearchAll(keyword, match, options, sources)
      .then(result => {
        props.setIsLoading(false);
        props.setError(false);
        props.setResult(result);
        props.setIsSearching(false);
      });
  };

  const suggestClickHandler = (id, event) => {
    props.setKeyword(id);
    setSuggestState([]);
    searchHandler(id, props.match, props.options, props.dataSource);
  };

  const suggestKeyPressHandler = event => {
    if (event.keyCode === 13 && selectIndexState === -1) {
      props.setKeyword(event.target.value);
      setSuggestState([]);
      searchHandler(event.target.value, props.match, props.options, props.dataSources);
    }
    if (event.keyCode === 13 && suggestState.length !== 0 && selectIndexState !== -1) {
      props.setKeyword(suggestState[selectIndexState].id);
      setSuggestState([]);
      searchHandler(suggestState[selectIndexState].id, props.match, props.options, props.dataSources);
    }
    if (event.keyCode === 38 || event.keyCode === 40) {
      let index = selectIndexState;
      index += event.keyCode === 40 ? 1 : -1;
      if (index >= suggestState.length) {
        index = 0;
      }
      if (index < 0) {
        index = suggestState.length - 1;
      }
      setSelectIndexState(index);
    }
  };

  const cleanSearchBar = event => {
    event.preventDefault();
    props.setKeyword('');
    searchInputRef.current.focus();
  }

  const cleanSuggestHandler = () => {
    setSuggestState([]);
    setSelectIndexState(-1);
  };

  const suggestHandlerDebounce = useRef(
    debounce((value) => {
      apiSuggest(value)
        .then(result => setSuggestState(result))
        .catch(error => {
          console.log(error);
        });
    }, 300)
  ).current;

  const suggestHandler = event => {
    let value =  event.target.value;
    props.setKeyword(value);
    suggestHandlerDebounce(value);
  };

  const matchOptionsHandler = event => {
    props.setMatchOptions(event.target.value);
  };

  const checkedToggleHandler = event => {
    props.setOptionsSearch({
      ...props.options,
      [event.target.name]: event.target.checked
    })
  };

  const selectDataToggleHandler = event => {
    props.setDataSources({
      ...props.dataSources,
      [event.target.name]: event.target.checked
    });
  };

  const checkedAllToggleHandler = event => {
    if(isToggleOnOptions === false){
      props.setOptionsSearch({
        desc: true,
        syns: true,
        npsyns: true
      });
    } else {
      props.setOptionsSearch({
        desc: false,
        syns: false,
        npsyns: false
      });
    }
    setIsToggleOnOptions(!isToggleOnOptions);
  };

  const selectDataAllToggleHandler = event => {
    if(isToggleOnSource === false){
      props.setDataSources({
        ctdc: true,
        gdc: true,
        icdc: true,
        pcdc: true
      });
    } else {
      props.setDataSources({
        ctdc: false,
        gdc: false,
        icdc: false,
        pcdc: false
      });
    }
    setIsToggleOnSource(!isToggleOnSource);
  };

  useEffect(() => {
    if(props.isSearching !== undefined && props.isSearching === true){
      props.setMatchOptions('partial');
      props.setOptionsSearch({
        desc: false,
        syns: false,
        npsyns: false
      });
      searchHandler(props.keyword, props.match, props.options, props.dataSources);
    }
  });

  return (
    <div className={styles.container}>
      {props.isLoading && <LoadingAnimation/>}
      <div className={styles['search-bar-container']}>
        <div className={styles['search-bar']}>
          <InputGroup>
            <FormControl
              type="text"
              className={`${styles['form-control']}${props.error ? ` ${styles.error}` : ''}`}
              value={props.keyword}
              onChange={suggestHandler}
              onKeyDown={suggestKeyPressHandler}
              placeholder="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
              aria-label="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
              ref={searchInputRef}
            />
            <a aria-label="Delete" className={styles['delete-button']} href="/#" onClick={cleanSearchBar} style={props.keyword.length === 0 ? {} : { display: 'block' }}><FontAwesomeIcon icon={faTimes} /></a>
            <Button aria-label="Search" className={styles['search-button']} onClick={() => searchHandler(props.keyword, props.match, props.options, props.dataSources)}>
              <FontAwesomeIcon className={styles['search-button-icon']} icon={faArrowRight}/>
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
                  <input className={styles['radio-input']} name="match" type="radio" value="partial" checked={props.match === 'partial'} onChange={matchOptionsHandler}/>
                  <span className={styles['radio-span']}>
                    <FontAwesomeIcon className={styles['radio-icon']} icon={faCircle}/>
                  </span>
                  <span>Partial match of values or properties</span>
                </label>
                <label className={styles['radio-label']}>
                  <input className={styles['radio-input']} name="match" type="radio" value="exact" checked={props.match === 'exact'} onChange={matchOptionsHandler} />
                  <span className={styles['radio-span']}>
                    <FontAwesomeIcon className={styles['radio-icon']} icon={faCircle}/>
                  </span>
                  <span>Exact match of values or properties</span>
                </label>
              </div>
            </div>
          </div>
          <div className={styles['search-options-container']}>
            <label className={styles['search-options-label']}>Search Include</label>
            <div className={styles['search-options']}>
              <Button className={styles['select-button']} aria-label={isToggleOnOptions === false ? 'Select All' : 'Unselect All'} onClick={checkedAllToggleHandler}>{isToggleOnOptions === false ? 'Select All' : 'Unselect All'}</Button>
              <div className={styles['form-group']}>
                <label className={styles['checkbox-label']}>
                  <input className={styles['checkbox-input']} name="desc" type="checkbox" checked={props.options['desc']}  onChange={checkedToggleHandler}/>
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck}/>
                  </span>
                  Search Property Description
                </label>
                <label className={styles['checkbox-label']}>
                  <input className={styles['checkbox-input']} name="syns" type="checkbox" checked={props.options['syns']} onChange={checkedToggleHandler}/>
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck}/>
                  </span>
                  Search Synonyms of Values
                </label>
                <label className={styles['checkbox-label']}>
                  <input className={styles['checkbox-input']} name="npsyns" checked={props.options['npsyns']} onChange={checkedToggleHandler} type="checkbox"/>
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck}/>
                  </span>
                  Search Synonyms of Properties/Nodes
                </label>
              </div>
            </div>
          </div>
          <div className={styles['search-options-container']}>
            <label className={styles['search-options-label']}>Choose your Data Source</label>
            <div className={styles['search-options']}>
              <Button className={styles['select-button']} aria-label={isToggleOnSource === false ? 'Select All' : 'Unselect All'} onClick={selectDataAllToggleHandler}>{isToggleOnSource === false ? 'Select All' : 'Unselect All'}</Button>
              <div className={styles['form-group']}>
                <label className={styles['checkbox-label']}>
                  <input className={styles['checkbox-input']} name="gdc" type="checkbox" checked={props.dataSources['gdc']} onChange={selectDataToggleHandler}/>
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck}/>
                  </span>
                  Genomic Data Commons(GDC)
                </label>
                <label className={styles['checkbox-label']}>
                  <input className={styles['checkbox-input']} name="ctdc" type="checkbox" checked={props.dataSources['ctdc']} onChange={selectDataToggleHandler}/>
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck}/>
                  </span>
                  Clinical Trial Data Commons (CTDC)
                </label>
                <label className={styles['checkbox-label']}>
                  <input className={styles['checkbox-input']} name="icdc" type="checkbox" checked={props.dataSources['icdc']} onChange={selectDataToggleHandler}/>
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck}/>
                  </span>
                  Integrated Canine Data Commons (ICDC)
                </label>
                <label className={styles['checkbox-label']}>
                  <input className={styles['checkbox-input']} name="pcdc" type="checkbox" checked={props.dataSources['pcdc']} onChange={selectDataToggleHandler}/>
                  <span className={styles['checkbox-span']}>
                    <FontAwesomeIcon className={styles['checkbox-icon']} icon={faCheck}/>
                  </span>
                  Pediatric Cancer Data Commons (PCDC)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
