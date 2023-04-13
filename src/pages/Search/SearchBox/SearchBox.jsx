import React, { useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { apiSuggest, apiSearchAll } from '../../../api';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCircle, faArrowRight, faTimes} from '@fortawesome/free-solid-svg-icons'
import SuggestBox from '../SuggestBox/SuggestBox';
import LoadingAnimation from '../../../components/LoadingAnimation/LoadingAnimation';
// import GDCValues from './dialogs/GDCValues';

const SearchBoxContainer = styled.div`
  padding: 3rem 0 2rem 0;
  background-color: var(--gray-bkgd);
`;

const SearchBarContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  width: 48rem;
  margin: 0 auto;
`;

const SearchFormControl = styled(FormControl)`
  width: 100% !important;
  padding: 0.375rem 7.5rem 0.375rem 0.75rem;
  border-radius: 0;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 3px solid ${props => props.error === 'true' ? '#bf063b' : '#397ded'};
  font-size: 1.875rem;
  font-family: 'Raleway-Light', sans-serif;

  &&:focus {
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
    border-bottom: 3px solid #397ded;
  }

  &&::placeholder {
    font-size: 1.5625rem;
    color: #3A9CF7;
  }

  &&::-ms-input-placeholder {
    transform: scale(0.85) translateX(-4rem);
  }
`;

const SearchButton = styled(Button)`
  position: absolute !important;
  z-index: 5 !important;
  right: 0rem;
  bottom: 0;
  top: 0;
  margin: auto;
  background-color: #A1A0A0;
  border-radius: 2rem !important;
  color: var(--white);
  font-size: 1.25rem; 
  width: 5rem;
  height: 2rem;
  padding: .2rem .75rem;
  border-color: transparent;

  &&:hover,
  &&:focus {
    background-color: #397ded;
    color: var(--white);
  }
`;

const SearchButtonIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  vertical-align: 0;
`;

const SearchOptionsContainer = styled.div`
  padding: 1.5rem;
`;

const SearchAllOptions = styled.div`
  width: 45rem;
  margin: 0 auto;

  && ${SearchOptionsContainer}:not(:last-child) {
    border-bottom: 1px solid #898989;
  }
`;

const SearchOptions = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;

const SearchOptionsLabel = styled.label`
  font-family: 'Lato-Bold',sans-serif;
  color: #1162E9;
  font-size: 0.875rem;
  margin-bottom: 0.7rem;
`;

const FormGroupStyled = styled.div`
  margin-left: 3rem;
  margin-bottom: 0;
  width: 33rem;
`;

const FormGroupRadio = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 0;
  width: 100%;
`;

const CheckboxSpan = styled.span`
  position: relative;
  display: block;
  border: 1px solid #dce4ec;
  background-color: #fff;
  border-radius: .25rem;
  width: 1.5rem;
  height: 1.5rem;
  float: left;
  margin-right: .5rem;
`;

const CheckboxIcon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: .7rem;
  line-height: 0;
  top: 0.3125rem;
  left: 0.375rem;
`;

const CheckboxLabel = styled.label`
  font-family: 'Lato-Bold', sans-serif;
  position: relative;
  font-size: 0.875rem;
  color: #1C1C1C;
  width: 11rem;
  inline-size: 11rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
`;

const SpanNormal = styled.span`
  font-weight: normal;
`; 

const CheckboxInput = styled.input`
  margin: 0 !important;
  position: absolute !important;
  top: 0.5rem;
  left: 0.35rem;

  &&:checked+${CheckboxSpan} {
    background-color: var(--checkbox-green);
    border-color: var(--checkbox-green);
  }
  
  &&+${CheckboxSpan}>${CheckboxIcon}{
    opacity: 0;
  }
  
  &&:checked+${CheckboxSpan}>${CheckboxIcon} {
    opacity: 1;
    color: var(--white);
  }

  &&:focus+${CheckboxSpan} {
    border: 1px solid #042A68;
    box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
  }
`;

const RadioLabel = styled.label`
  font-family: 'Lato-Bold', sans-serif;
  position: relative;
  font-size: 0.875rem;
  color: #1C1C1C;
  margin-bottom: 0;
  cursor: pointer;
`;

const RadioSpan = styled.span`
  position: relative;
  display: block;
  border: 1px solid #dce4ec;
  background-color: #fff;
  border-radius: 50%;
  width: 1.4rem;
  height: 1.4rem;
  float: left;
  margin-right: .5rem;
`;

const RadioIcon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: .9rem;
  line-height: 0;
  top: 0.1875rem;
  left: 0.1875rem;
`;

const RadioInput = styled.input`
  margin: 0!important;
  position: absolute!important;
  top: 0.5rem;
  left: 0.35rem;

  &&:checked+${RadioSpan} {
    background-color: var(--white);
    border: 1px solid #042A68;
  }
  
  &&+${RadioSpan}>${RadioIcon}{
    opacity: 0;
  }
  
  &&:checked+${RadioSpan}>${RadioIcon} {
    opacity: 1;
    color: var(--checkbox-green);
  }

  &&:focus+${RadioSpan} {
    border: 1px solid #042A68;
    box-shadow: 0 0 0 0.2rem rgba(38,143,255,.5);
  }
`;

const SelectBtn = styled(Button)`
  font-family: 'Lato-Regular', sans-serif;
  border: 1px solid #154C5E;
  background-color: #F5F5F5;
  border-radius: 2em;
  text-transform: uppercase;
  width: 6rem;
  inline-size: 6rem;
  font-size: 0.625rem;
  color: #154C5E;
  padding: 0.25rem 0.75rem;

  &&:hover,
  &&:focus {
    background-color: #F5F5F5;
    border: 1px solid #154C5E;
    color: #154C5E;
  }
`;

const DeleteBtn = styled.a`
  position: absolute;
  right: 6rem;
  top: 0.9rem;
  z-index: 100;
  font-size: 1.375rem;
  color: #5376ac;
  display: none;
`;

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
    <SearchBoxContainer>
      {props.isLoading && <LoadingAnimation/>}
      <SearchBarContainer>
        <SearchBar>
          <InputGroup>
            <SearchFormControl
              type="text"
              value={props.keyword}
              onChange={suggestHandler}
              onKeyDown={suggestKeyPressHandler}
              placeholder="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
              aria-label="Search Values, Properties, NCIt Terms or ICD-O-3 Terms"
              ref={searchInputRef}
              error={props.error.toString()}
            />
            <DeleteBtn aria-label="Delete" href="/#" onClick={cleanSearchBar} style={props.keyword.length === 0 ? {} : { display: 'block' }}><FontAwesomeIcon icon={faTimes} /></DeleteBtn>
            <SearchButton aria-label="Search" onClick={() => searchHandler(props.keyword, props.match, props.options, props.dataSources)}>
              <SearchButtonIcon icon={faArrowRight}/>
            </SearchButton>
          </InputGroup>
          <SuggestBox
            suggest={suggestState}
            suggestClick={suggestClickHandler}
            suggestSelected={selectIndexState}
            cleanSuggest={cleanSuggestHandler}
          />
        </SearchBar>
        <SearchAllOptions>
          <SearchOptionsContainer>
            <SearchOptions>
              <FormGroupRadio>
                <RadioLabel>
                  <RadioInput name="match" type="radio" value="partial" checked={props.match === 'partial'} onClick={matchOptionsHandler}/>
                  <RadioSpan>
                    <RadioIcon icon={faCircle}/>
                  </RadioSpan>
                  <span>Partial match of values or properties</span>
                </RadioLabel>
                <RadioLabel>
                  <RadioInput name="match" type="radio" value="exact" checked={props.match === 'exact'} onClick={matchOptionsHandler} />
                  <RadioSpan>
                    <RadioIcon icon={faCircle}/>
                  </RadioSpan>
                  <span>Exact match of values or properties</span>
                </RadioLabel>
              </FormGroupRadio>
            </SearchOptions>
          </SearchOptionsContainer>
          <SearchOptionsContainer>
            <SearchOptionsLabel>Search Include</SearchOptionsLabel>
            <SearchOptions>
              <SelectBtn aria-label={isToggleOnOptions === false ? 'Select All' : 'Unselect All'} onClick={checkedAllToggleHandler}>{isToggleOnOptions === false ? 'Select All' : 'Unselect All'}</SelectBtn>
              <FormGroupStyled>
                <CheckboxLabel>
                  <CheckboxInput name="desc" type="checkbox" checked={props.options['desc']}  onClick={checkedToggleHandler}/>
                  <CheckboxSpan>
                    <CheckboxIcon icon={faCheck}/>
                  </CheckboxSpan>
                  Search Property Description
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput name="syns" type="checkbox" checked={props.options['syns']} onClick={checkedToggleHandler}/>
                  <CheckboxSpan>
                    <CheckboxIcon icon={faCheck}/>
                  </CheckboxSpan>
                  Search Synonyms of Values
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput name="npsyns" checked={props.options['npsyns']} onClick={checkedToggleHandler} type="checkbox"/>
                  <CheckboxSpan>
                    <CheckboxIcon icon={faCheck}/>
                  </CheckboxSpan>
                  Search Synonyms of Properties/Nodes
                </CheckboxLabel>
              </FormGroupStyled>
            </SearchOptions>
          </SearchOptionsContainer>
          <SearchOptionsContainer>
            <SearchOptionsLabel>Choose your Data Source</SearchOptionsLabel>
            <SearchOptions>
              <SelectBtn aria-label={isToggleOnSource === false ? 'Select All' : 'Unselect All'} onClick={selectDataAllToggleHandler}>{isToggleOnSource === false ? 'Select All' : 'Unselect All'}</SelectBtn>
              <FormGroupStyled>
                <CheckboxLabel>
                  <CheckboxInput name="gdc" type="checkbox" checked={props.dataSources['gdc']} onClick={selectDataToggleHandler}/>
                  <CheckboxSpan>
                    <CheckboxIcon icon={faCheck}/>
                  </CheckboxSpan>
                  Genomic Data Commons <SpanNormal>(GDC)</SpanNormal>
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput name="ctdc" type="checkbox" checked={props.dataSources['ctdc']} onClick={selectDataToggleHandler}/>
                  <CheckboxSpan>
                    <CheckboxIcon icon={faCheck}/>
                  </CheckboxSpan>
                  Clinical Trial Data Commons <SpanNormal>(CTDC)</SpanNormal>
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput name="icdc" type="checkbox" checked={props.dataSources['icdc']} onClick={selectDataToggleHandler}/>
                  <CheckboxSpan>
                    <CheckboxIcon icon={faCheck}/>
                  </CheckboxSpan>
                  Integrated Canine Data Commons <SpanNormal>(ICDC)</SpanNormal>
                </CheckboxLabel>
                <CheckboxLabel>
                  <CheckboxInput name="pcdc" type="checkbox" checked={props.dataSources['pcdc']} onClick={selectDataToggleHandler}/>
                  <CheckboxSpan>
                    <CheckboxIcon icon={faCheck}/>
                  </CheckboxSpan>
                  Pediatric Cancer Data Commons <SpanNormal>(PCDC)</SpanNormal>
                </CheckboxLabel>
              </FormGroupStyled>
            </SearchOptions>
          </SearchOptionsContainer>
        </SearchAllOptions>
      </SearchBarContainer>
    </SearchBoxContainer>
  );
};

export default SearchBox;
