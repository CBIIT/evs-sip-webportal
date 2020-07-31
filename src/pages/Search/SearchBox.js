import React, { useState } from 'react';
import styled from 'styled-components';
import { apiSuggest } from '../../api';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import SuggestBox from './SuggestBox';
// import GDCValues from './dialogs/GDCValues';

const SearchBoxContainer = styled.div`
  padding-top: 2rem;
  background-color: var(--gray-bkgd);
`;

const SearchBarContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;

const SearchBar = styled.div`
  width: 60%;
  min-width: 690px;
  margin: 0 auto;
`;

const SearchOptions = styled.div`
  width: 60%;
  min-width: 690px;
  margin: 0 auto;
  padding: 1.5em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ecf0f1;
`;

const SearchFormControl = styled(Form.Control)`
  width: 100% !important;
  border-radius: 0;
  background-color: transparent;
  border: 1px solid transparent;
  border-bottom: 3px solid #397DED;
  font-size: 1.875rem;
  font-family: 'Raleway-Light', sans-serif;

  &&:focus {
    border-color: transparent;
    background-color: transparent;
    box-shadow: none;
    border-bottom: 3px solid #397DED;
  }

  &&::placeholder {
    color: #3A9CF7;
  }
`;

const SearchButton = styled(Button)`
  position: absolute;
  right: 0rem;
  bottom: 0;
  top: 0;
  margin: auto;
  z-index: 3;
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
    box-shadow: none;
  }
`;

const SearchButtonIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  vertical-align: 0;
`;

const FormGroupStyled = styled(Form.Group)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const CheckboxSpan = styled.span`
  position: relative;
  display: block;
  border: 1px solid #dce4ec;
  background-color: #fff;
  border-radius: .25em;
  width: 2em;
  height: 2em;
  float: left;
  margin-right: .5em;
`;

const CheckboxIcon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: .9em;
  line-height: 0;
  top: 50%;
  left: 26%;
`;

const CheckboxStyled = styled(Form.Check)`
  input[type=checkbox]:checked + ${CheckboxSpan} {
    background-color: #6a7676;
    border-color: #6a7676;
  }

  input[type=checkbox]:focus + ${CheckboxSpan} {
    box-shadow: 0 0 4px 2px #c2c2c2;
    outline: thin dotted;
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  input[type=checkbox] + ${CheckboxSpan} > ${CheckboxIcon}{
    opacity: 0;
  }

  input[type=checkbox]:checked + ${CheckboxSpan} > ${CheckboxIcon}{
    opacity: 1;
    color: #fff;
  }
`;

const SearchBox = (props) => {
  let [suggestState, setSuggestState] = useState([]);
  let [searchState, setSearchState] = useState('');
  let [selectIndexState, setSelectIndexState] = useState(-1);
  let [optionsState, setOptionsState] = useState({
    match: false,
    desc: false,
    syns: false
  });

  const suggestClickHandler = (id, event) => {
    setSearchState(id);
    setSuggestState([]);
    props.searchTrigger(id, optionsState);
  };

  const suggestKeyPressHandler = event => {
    if (event.keyCode === 13 && selectIndexState === -1) {
      setSearchState(event.target.value);
      setSuggestState([]);
      props.searchTrigger(event.target.value, optionsState);
    }
    if (event.keyCode === 13 && suggestState.length !== 0 && selectIndexState !== -1) {
      setSearchState(suggestState[selectIndexState].id);
      setSuggestState([]);
      props.searchTrigger(suggestState[selectIndexState].id, optionsState);
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

  const cleanSuggestHandler = () => {
    setSuggestState([]);
    setSelectIndexState(-1);
  };

  const suggestHandler = event => {
    setSearchState(event.target.value);
    apiSuggest(event.target.value).then(result => setSuggestState(result));
  };

  const checkedToggleHandler = event => {
    setOptionsState({
      ...optionsState,
      [event.target.id]: event.target.checked
    });
  };

  return (
    <SearchBoxContainer>
      <SearchBarContainer>
        <SearchBar>
          <InputGroup>
            <SearchFormControl
              type="text"
              value={searchState}
              onChange={suggestHandler}
              onKeyDown={suggestKeyPressHandler}
              placeholder="Search EVS-SIP"
            />
            <SearchButton onClick={() => props.searchTrigger(searchState, optionsState)}>
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
        <SearchOptions>
          <FormGroupStyled>
            <Form.Check inline type="checkbox" id="match" label="Exact match" value={optionsState.match} onChange={checkedToggleHandler}/>
            <Form.Check inline type="checkbox" id="desc" label="Property description" value={optionsState.desc} onChange={checkedToggleHandler}/>
            <Form.Check inline type="checkbox" id="syns" label="Synonyms" value={optionsState.syns} onChange={checkedToggleHandler}/>
            {/* <CheckboxStyled id="match" label="Check"  inline value={optionsState.match} onChange={checkedToggleHandler}>
              <CheckboxSpan>
                <CheckboxIcon icon={faCheck}/>
              </CheckboxSpan>
              Exact match
            </CheckboxStyled>
            <CheckboxStyled id="desc" inline value={optionsState.desc} onChange={checkedToggleHandler}>
              <CheckboxSpan>
                <CheckboxIcon icon={faCheck}/>
              </CheckboxSpan>
              Property description
            </CheckboxStyled>
            <CheckboxStyled id="syns" inline value={optionsState.syns} onChange={checkedToggleHandler}>
              <CheckboxSpan>
                <CheckboxIcon icon={faCheck}/>
              </CheckboxSpan>
              Synonyms
            </CheckboxStyled> */}
          </FormGroupStyled>
        </SearchOptions>
      </SearchBarContainer>
    </SearchBoxContainer>
  );
};

export default SearchBox;
