import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { apiSuggest } from '../../api';
import styled from 'styled-components';
import { Container, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCheck } from '@fortawesome/free-solid-svg-icons';
import SuggestBox from '../Search/SuggestBox';

import bkgd from '../../assets/img/search-bkgd.jpg';


const ContainerStyled = styled(Container)`
  max-width: 80rem;
  height: 100%;
`;

const RowStyled = styled(Row)`
  height: 100%;
`;

const SearchSection = styled.section`
  height: 30rem;
  background: url(${bkgd}) no-repeat top;
  background-color: #fff;
`;

const SeachTitleContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchTitle = styled.h1`
  font-family: 'Raleway-Medium', sans-serif;
  inline-size: 16rem;
  font-size: 2.3125rem; 
  margin-bottom: 3rem;
  letter-spacing: 0.03125rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  line-height: 1.2;
`;

const SeachBoxContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchBox = styled.div`
  margin: auto 2rem;
  width: 100%;
`;

// const InputBoxContainer = styled(InputGroup)`
//   margin-bottom: 3rem;
// `;

const InputBox = styled(FormControl)`
  font-family: 'Lato-Bold', sans-serif;
  font-size: 1.125rem;
  padding: 0.5rem 1rem;
  padding-right: 5rem;
  border-radius: 2rem !important;
  height: 3rem;
  border: 2px solid #397DED;
  line-height: 27px;

  &&::placeholder {
    color: #3A9CF7;
  }
`;

const InputBoxBtnContainer = styled(InputGroup.Append)`
  position: absolute;
  right: 0.3125rem;
  top: 0.3125rem;
  bottom: 0.3125rem;
  z-index: 10;
`;

const InputBoxButton = styled(Button)`
  background-color: #D2D2D2;
  border-radius: 2rem !important;
  color: var(--white);
  font-size: 1.25rem; 
  width: 4rem;
  height: 2.375rem;
  border-color: transparent;

  &&:hover,
  &&:focus {
    background-color: #397ded;
    color: var(--white);
    box-shadow: none;
  }
`;

const InputBoxIcon = styled(FontAwesomeIcon)`
  font-size: 1.25rem;
  vertical-align: 0;
`;


const OptionsContainer = styled(Row)`
  margin-top: 3rem;
`;

const SelectContainer = styled(Col)`
  text-align: right;
  border-right: 1px solid #898989;
  padding-right: 2rem;
`;

const SelectTitle = styled.p`
  font-family: 'Lato-Bold', sans-serif;
  font-size: 0.875rem;
`

const SelectBtn = styled(Button)`
  font-family: 'Lato-Regular', sans-serif;
  border: 1px solid #154C5E;
  background-color: #F5F5F5;
  border-radius: 2em;
  text-transform: uppercase;
  font-size: 0.625rem;
  color: #154C5E;
  padding: 0.25rem 0.75rem;

  &&:hover,
  &&:focus {
    background-color: #F5F5F5;
    border: 1px solid #154C5E;
    color: #154C5E;
  }
`

const CheckboxLabel = styled.label`
  font-family: 'Lato-Regular', sans-serif;
  position: relative;
  font-size: 0.75rem;
  color: #154C5E;
  inline-size: 8rem;
  margin-bottom: 1rem;
  line-height: 1rem;
`;

const CheckboxBtn = styled.span`
  position: relative;
  display: block;
  border: 1px solid var(--checkbox-border);
  background-color: var(--checkbox-bkgd);
  border-radius: .25rem;
  width: 1.5rem;
  height: 1.5rem;
  float: left;
  margin-right: .5rem;
  margin-top: 0.2rem;
`;

const CheckboxIcon = styled(FontAwesomeIcon)`
  position: absolute;
  font-size: .7rem;
  line-height: 0;
  top: 25%;
  left: 25%;
`;

const CheckboxInput = styled.input`
  margin: 0!important;
  position: absolute!important;
  top: 0.5rem;
  left: 0.35rem;

  &&:checked+${CheckboxBtn} {
    background-color: var(--checkbox-green);
    border-color: var(--checkbox-green);
  }
  
  &&+${CheckboxBtn}>${CheckboxIcon}{
    opacity: 0;
  }
  
  &&:checked+${CheckboxBtn}>${CheckboxIcon} {
    opacity: 1;
    color: var(--white);
  }
`;


const Search = () => {
  let [searchState, setSearchState] = useState('');
  let [suggestState, setSuggestState] = useState([]);
  let [selectIndexState, setSelectIndexState] = useState(-1);

  const history = useHistory();

  const searchTriggerRoute = (id) =>{ 
    history.push({
      pathname: './search',
      state: { keyword: id }
    });
  }

  const suggestHandler = event => {
    setSearchState(event.target.value);
    apiSuggest(event.target.value).then(result => setSuggestState(result));
  };

  const suggestKeyPressHandler = event => {
    if (event.keyCode === 13 && selectIndexState === -1) {
      setSearchState(event.target.value);
      setSuggestState([]);
      searchTriggerRoute(event.target.value);
    }
    if (event.keyCode === 13 && suggestState.length !== 0 && selectIndexState !== -1) {
      setSearchState(suggestState[selectIndexState].id);
      setSuggestState([]);
      searchTriggerRoute(suggestState[selectIndexState].id);
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

  const suggestClickHandler = (id, event) => {
    setSearchState(id);
    setSuggestState([]);
    searchTriggerRoute(id);
  };

  const cleanSuggestHandler = () => {
    setSuggestState([]);
    setSelectIndexState(-1);
  };

  return <SearchSection>
    <ContainerStyled>
      <RowStyled>
        <Col xs={5}>
          <SeachTitleContainer>
            <SearchTitle>
              Semantic Integration for Multiple Data Sources
            </SearchTitle>
          </SeachTitleContainer>
        </Col>
        <Col xs={7}>
          <SeachBoxContainer>
            <SearchBox>
            <InputGroup>
              <InputBox
                placeholder="Search EVS-SIP"
                aria-label="Search EVS-SIP"
                type="text"
                value={searchState}
                onChange={suggestHandler}
                onKeyDown={suggestKeyPressHandler}
              />
              <InputBoxBtnContainer>
                <InputBoxButton onClick={searchTriggerRoute}>
                  <InputBoxIcon icon={faArrowRight}/>
                </InputBoxButton>
              </InputBoxBtnContainer>
            </InputGroup>
            <SuggestBox
              suggest={suggestState}
              suggestClick={suggestClickHandler}
              suggestSelected={selectIndexState}
              cleanSuggest={cleanSuggestHandler}
            />
            <OptionsContainer>
              <SelectContainer xs={3}>
                <SelectTitle>Choose your<br/>Data Commons</SelectTitle>
                <SelectBtn>Select All</SelectBtn>
              </SelectContainer>
              <Col xs={9}>
                <Row>
                  <Col xs={4}>
                    <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Clinical Trial Data Commons
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Clinical Trial Data Commons
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Clinical Trial Data Commons
                    </CheckboxLabel>
                  </Col>
                  <Col xs={4}>
                  <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Genomic Data Commons
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Genomic Data Commons
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Genomic Data Commons
                    </CheckboxLabel>
                  </Col>
                  <Col xs={4}>
                  <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Integrated Canine<br/>Data Commons
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Integrated Canine<br/>Data Commons
                    </CheckboxLabel>
                    <CheckboxLabel>
                      <CheckboxInput type="checkbox"/>
                      <CheckboxBtn>
                        <CheckboxIcon icon={faCheck}/>
                      </CheckboxBtn>
                      Integrated Canine<br/>Data Commons
                    </CheckboxLabel>
                  </Col>
                </Row>
              </Col>
            </OptionsContainer>
            </SearchBox>
          </SeachBoxContainer>
        </Col>
      </RowStyled>
    </ContainerStyled>
  </SearchSection>;
}

export default Search;
