import React, {useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Button, Modal, Container, Row, Col, Collapse, InputGroup, FormControl, Table, Form} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSearch, faCheck} from '@fortawesome/free-solid-svg-icons';
import { searchFilter, sortAlphabetically} from '../../shared';
import { apiGetGDCDataById } from '../../api';


const ModalBodyStyled = styled(Modal.Body)`
  padding: 0 0 1rem 0;
`;

const ButtonStyled = styled(Button)`
  padding: 0 .75rem;
`;

const ModalStyled = styled(Modal)`
  && .modal-dialog {
    max-width: 75rem;
  }
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 12px;
`;

const TableThead = styled(Row)`
  background: #535F74;
`;

const TableTh = styled.div`
  font-family: 'Lato-Bold', sans-serif;
  font-size: 1rem;
  text-align: center;
  color: var(--white);
  padding-top: 0.625rem;
  padding-bottom: 0.625rem;
`;

const ColStyled = styled(Col)`
  padding-right: 0;
  padding-left: 0;
`;

const TableStyled = styled(Table)`
  margin-bottom: 0;
`;

const CompareFormContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
`;

const CompareFormLeft = styled.div`
  width: 47%;
  height: 35rem;
`;

const CompareFormDivider = styled.div`
  width: 1rem;
  height: 35rem;
  margin-right: 1rem;
  border-right: 1px dashed #bbb;
`;

const CompareFormRight = styled.div`
  width: 47%;
  height: 35rem;
  overflow: auto;
  border: 1px solid #a9a9a9;
  display: inline-block;
  padding: .2em;
`;

const TextareaStyled = styled.textarea`
  width: 100%;
  height: 100%;
  padding: .2em 0.9375rem;
`;

// const InputGroupStyled = styled(InputGroup)`
//   max-width: 23rem;
//   padding-left: 2rem;
// `;

const RowStyled = styled(Row)`
  padding: 0.3125rem 0;
  border-bottom: 1px solid #dee2e6;
`;

const RowRight = styled(Row)`
  min-width: 25rem;
`;

const ColRight = styled(Col)`
  text-align: right;
`;

const Indicator = styled.div`
  width: 100%;
  padding: 3rem 0;
  text-align: center;
  font-size: 1.2rem;
`;

const FormGroupStyled = styled(Form.Group)`
  margin-left: 2rem;
  margin-bottom: 0;
  padding: 0.3rem 0;
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
  margin-left: 1rem;
  margin-bottom: 0;
  cursor: pointer;
`;

const CheckboxInput = styled.input`
  margin: 0!important;
  position: absolute!important;
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


const ToCompareModal = (props) => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    apiGetGDCDataById(props.idterm).then(result => {
      // setData(result);
      if (result !== [] && result[0]._source.enum !== undefined) {
        setItems(result[0]._source.enum);
      }
    }).then(() => {
      setShow(true);
    });
  };


  const ModalContainer = (props) => {

    const [userValues, setUserValues] = useState('');
    // const [items, setItems] = useState([]);
    const [resultReport, setResultReport] = useState();
    const [showReport, setShowReport] =  useState(false);
    //const [keyword, setKeyword] = useState('');
    let [optionsState, setOptionsState] =  useState({
        partial: false,
        syns: false,
        unmatched: false
    });

    const userInputUpdate =  (event) => {
      setUserValues(event.target.value);
    }
  
    // const handleSearchChange = (event) => {
    //   let keyword = event.target.value.trim().replace(/\s{2,}/g, ' ').toLowerCase();
  
    //   if (keyword.length >= 3 && data !== [] && data[0]._source.enum !== undefined) {
    //     let newItem = searchFilter(data[0]._source.enum, keyword);
    //     setItems(newItem);
    //   } else {
    //     setItems(data[0]._source.enum);
    //   }
    // };
  
    const handleCompare = () => {
      if(showReport === false) setShowReport(true);
      setResultReport(compareGDCvalues(userValues, props.items, optionsState));
    }
  
    const handleButtonBack = () => {
      if(showReport === true) setShowReport(false);
      setResultReport([]);
    }

    const checkedToggleHandler = event => {
      setOptionsState({
        ...optionsState,
        [event.target.name]: event.target.checked
      });
    };
  
    // const getMatchedSynonyms = (text, tmp, option) => {
    //   if (option.partial === false) {
    //     let checkerNC = {};
    //     text.forEach(em => {
    //       if (em.matched_s) em.matched_s = undefined; // remove matched_s from previous tmp
    //       if (em.n_syn !== undefined && em.s === undefined) {
    //         em.n_syn.forEach(nSyn => {
    //           if (nSyn.s === undefined) return;
    //           nSyn.s.forEach(x => {
    //             if (x.termName.trim().toLowerCase() === tmp) {
    //               if (checkerNC[nSyn.n_c] === undefined) {
    //                 checkerNC[nSyn.n_c] = [];
    //                 checkerNC[nSyn.n_c].push(x);
    //               } else if (checkerNC[nSyn.n_c] !== undefined && !_.some(checkerNC[nSyn.n_c], x)) {
    //                 checkerNC[nSyn.n_c].push(x);
    //               }
    //             }
    //           });
    //         });
    //       } else if (em.s !== undefined && em.n_syn === undefined) {
    //         em.s.forEach(x => {
    //           if (x.termName.trim().toLowerCase() === tmp) {
    //             if (checkerNC[em.n_c] === undefined) {
    //               checkerNC[em.n_c] = [];
    //               checkerNC[em.n_c].push(x);
    //             } else if (checkerNC[em.n_c] !== undefined && !_.some(checkerNC[em.n_c], x)) {
    //               checkerNC[em.n_c].push(x);
    //             }
    //           }
    //         });
    //       }
    //     });
    //     return checkerNC;
    //   } else {
    //     let checkerNC = {};
    //     text.forEach(em => {
    //       if (em.matched_s) em.matched_s = undefined; // remove matched_s from previous tmp
    //       if (em.n_syn !== undefined && em.s === undefined) {
    //         em.n_syn.forEach(nSyn => {
    //           if (nSyn.s === undefined) return;
    //           nSyn.s = nSyn.s.map(x => { return { termName: x.termName.toLowerCase(), termGroup: x.termGroup, termSource: x.termSource }; });
    //           nSyn.s.forEach(tmpSyn => {
    //             let sIdx = tmpSyn.termName.indexOf(tmp);
    //             if (sIdx >= 0) {
    //               if (checkerNC[nSyn.n_c] === undefined) {
    //                 checkerNC[nSyn.n_c] = [];
    //                 checkerNC[nSyn.n_c].push(tmpSyn);
    //               } else if (checkerNC[nSyn.n_c] !== undefined && !_.some(checkerNC[nSyn.n_c], tmpSyn)) {
    //                 checkerNC[nSyn.n_c].push(tmpSyn);
    //               }
    //             }
    //           });
    //         });
    //       } else if (em.s !== undefined && em.n_syn === undefined) {
    //         em.s = em.s.map(x => { return { termName: x.termName.toLowerCase(), termGroup: x.termGroup, termSource: x.termSource }; });
    //         em.s.forEach(tmpSyn => {
    //           let sIdx = tmpSyn.termName.indexOf(tmp);
    //           if (sIdx >= 0) {
    //             if (checkerNC[em.n_c] === undefined) {
    //               checkerNC[em.n_c] = [];
    //               checkerNC[em.n_c].push(tmpSyn);
    //             } else if (checkerNC[em.n_c] !== undefined && !_.some(checkerNC[em.n_c], tmpSyn)) {
    //               checkerNC[em.n_c].push(tmpSyn);
    //             }
    //           }
    //         });
    //       }
    //     });
    //     return checkerNC;
    //   }
    // };
  
    const compareGDCvalues = (fromV, toV, option) => {
      let fromVArray = fromV.split(/\n/);
      toV = JSON.parse(JSON.stringify(toV));
      let vLowercase = [];
      let vMatched = [];
      toV.forEach(function (v) {
        vLowercase.push(v.n.trim().toLowerCase());
        // letif (v.s && v.s.length > 0) v.s = v.s.map(function (x) { return { termName: x.termName.toLowerCase(), termSource: x.termSource, termGroup: x.termGroup }; });
        //if (v.all_syn && v.all_syn.length > 0) v.all_syn = v.all_syn.map(function (x) { return x.toLowerCase(); });
      });
    
      let items = [];
      fromVArray.forEach(function (v) {
        let caseSensitiveV = v.trim().replace(/\s{2,}/g, ' ');
        v = v.trim().toLowerCase().replace(/\s{2,}/g, ' ');
        // let reg_key = new RegExp(v, "ig");
        let tmp = v;
        if (tmp === '') {
          return;
        }
        let text = [];
        if (option.partial === false) { // If exact match is checked
          let checkerN = [];
          let idx = vLowercase.indexOf(tmp);
          if (idx >= 0) {
            toV[idx].match = caseSensitiveV;
            text.push(toV[idx]);
            checkerN.push(toV[idx].n);
            vMatched.push(idx);
          }
          // if (option.synonyms === true) {
          //   toV.forEach((em, i) => {
          //     if (em.all_syn) { // If it's a ICDO3 code it will have all_syn
          //       if (em.all_syn.indexOf(tmp) !== -1 && checkerN.indexOf(toV[i].n) === -1) {
          //         text.push(toV[i]);
          //         checkerN.push(toV[i].n);
          //         vMatched.push(i);
          //       }
          //     }
          //     if (em.s) {
          //       em.s.forEach(s => {
          //         if (s.termName.trim().toLowerCase() === tmp && checkerN.indexOf(toV[i].n) === -1) {
          //           text.push(toV[i]);
          //           checkerN.push(toV[i].n);
          //           vMatched.push(i);
          //         }
          //       });
          //     }
          //   });
          //   let checkerNC = getMatchedSynonyms(text, tmp, option);
          //   text.forEach(em => {
          //     em.match = caseSensitiveV;
          //     if (em.n_syn !== undefined && em.s === undefined) {
          //       em.n_syn.forEach(nSyn => {
          //         if (em.matched_s === undefined && checkerNC[nSyn.n_c] !== undefined) {
          //           em.matched_s = [];
          //           em.chk_n_c = [];
          //           em.chk_n_c.push(nSyn.n_c);
          //           em.matched_s.push({ n_c: nSyn.n_c, s: checkerNC[nSyn.n_c] });
          //         } else if (em.matched_s !== undefined && em.chk_n_c.indexOf(nSyn.n_c) === -1 && checkerNC[nSyn.n_c] !== undefined) {
          //           let tmpObj = {};
          //           tmpObj.n_c = nSyn.n_c;
          //           tmpObj.s = checkerNC[nSyn.n_c];
          //           em.matched_s.push(tmpObj);
          //           em.chk_n_c.push(nSyn.n_c);
          //         }
          //       });
          //     } else if (em.s !== undefined && em.n_syn === undefined && checkerNC[em.n_c] !== undefined) {
          //       if (em.matched_s === undefined) {
          //         em.matched_s = [];
          //         em.chk_n_c = [];
          //         em.chk_n_c.push(em.n_c);
          //         em.matched_s.push({ n_c: em.n_c, s: checkerNC[em.n_c] });
          //       } else if (em.matched_s !== undefined && em.chk_n_c.indexOf(em.n_c) === -1 && checkerNC[em.n_c] !== undefined) {
          //         let tmpObj = {};
          //         tmpObj.n_c = em.n_c;
          //         tmpObj.s = checkerNC[em.n_c];
          //         em.matched_s.push(tmpObj);
          //         em.chk_n_c.push(em.n_c);
          //       }
          //     }
          //   });
          // }
          } else { // If it's partial match
          let checkerN = [];
            vLowercase.forEach((vTmp, index) => {
              let idx = vTmp.indexOf(tmp);
              if (idx >= 0 && checkerN.indexOf(toV[index].n) === -1) {
                toV[index].match = caseSensitiveV;
                text.push(toV[index]);
                checkerN.push(toV[index].n);
                vMatched.push(index);
              }
        //     if (option.synonyms === true) {
        //       toV.forEach((em, i) => {
        //         if (em.all_syn) {
        //           em.all_syn.forEach(syn => { // If it's a ICDO3 code it will have all_syn
        //             if (syn.indexOf(tmp) !== -1 && checkerN.indexOf(toV[i].n) === -1) {
        //               text.push(toV[i]);
        //               checkerN.push(toV[i].n);
        //               vMatched.push(i);
        //             }
        //           });
        //         }
        //         if (em.s) {
        //           em.s.forEach(syn => {
        //             if (syn.termName.indexOf(tmp) !== -1 && checkerN.indexOf(toV[i].n) === -1) {
        //               text.push(toV[i]);
        //               checkerN.push(toV[i].n);
        //               vMatched.push(i);
        //             }
        //           });
        //         }
        //       });
        //       let checkerNC = getMatchedSynonyms(text, tmp, option);
        //       text.forEach(em => {
        //         em.match = caseSensitiveV;
        //         if (em.n_syn !== undefined && em.s === undefined) {
        //           em.n_syn.forEach(nSyn => {
        //             if (em.matched_s === undefined && checkerNC[nSyn.n_c] !== undefined) {
        //               em.matched_s = [];
        //               em.chk_n_c = [];
        //               em.chk_n_c.push(nSyn.n_c);
        //               em.matched_s.push({ n_c: nSyn.n_c, s: checkerNC[nSyn.n_c] });
        //             } else if (em.matched_s !== undefined && em.chk_n_c.indexOf(nSyn.n_c) === -1 && checkerNC[nSyn.n_c] !== undefined) {
        //               let tmpObj = {};
        //               tmpObj.n_c = nSyn.n_c;
        //               tmpObj.s = checkerNC[nSyn.n_c];
        //               em.matched_s.push(tmpObj);
        //               em.chk_n_c.push(nSyn.n_c);
        //             }
        //           });
        //         } else if (em.s !== undefined && em.n_syn === undefined && checkerNC[em.n_c] !== undefined) {
        //           if (em.matched_s === undefined) {
        //             em.matched_s = [];
        //             em.chk_n_c = [];
        //             em.chk_n_c.push(em.n_c);
        //             em.matched_s.push({ n_c: em.n_c, s: checkerNC[em.n_c] });
        //           } else if (em.matched_s !== undefined && em.chk_n_c.indexOf(em.n_c) === -1 && checkerNC[em.n_c] !== undefined) {
        //             let tmpObj = {};
        //             tmpObj.n_c = em.n_c;
        //             tmpObj.s = checkerNC[em.n_c];
        //             em.matched_s.push(tmpObj);
        //             em.chk_n_c.push(em.n_c);
        //           }
        //         }
        //       });
        //     }
          });
        }
        if (text.length > 0) text = sortAlphabetically(text);
        if (text.length === 0) text.push({ n: '', n_c: '', match: caseSensitiveV, s: [] });
        items = items.concat(JSON.parse(JSON.stringify(text)));
      });
    
      items = option.unmatched ? items.concat(toV.filter((v, i) => !vMatched.includes(i))) : items;
      return items;
    };
  
    const TableSynonyms = (props) => {
      if (props.synonyms !== undefined) {
        return props.synonyms.map((item, index) =>
          <tr key={index}>
            <td dangerouslySetInnerHTML={{ __html: item.n }}></td>
            <td>{item.src}</td>
            <td>{item.t}</td>
          </tr>
        );
      }
      return (null);
    };
  
    const TableNCIt = (props) => {
  
      let [isToggleOn, setIsToggleOn] = useState(false);
  
      const ToggleTableHandler = event => {
        event.preventDefault();
        setIsToggleOn(!isToggleOn);
      };
      return (
        <>
          <RowRight>
            <Col xs={10}>
              {props.name}
            </Col>
            <ColRight xs={2}>
              <a href="/#" aria-label={isToggleOn === true ? 'collapse' : 'expand'} onClick={ToggleTableHandler}>
                {isToggleOn === true
                  ? <FontAwesomeIcon icon={faMinus}/>
                  : <FontAwesomeIcon icon={faPlus}/>
                }
              </a>
            </ColRight>
          </RowRight>
          <Collapse in={isToggleOn} mountOnEnter={true}>
            <div>
              {props.ncit.map(ncit => 
                <Row>
                  <Col xs={2}>
                    {ncit.c}
                  </Col>
                  <Col xs={10}>
                  <TableContainer>
                    <TableStyled striped bordered>
                      <thead>
                        <tr>
                          <th>Term</th>
                          <th>Source</th>
                          <th>Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        <TableSynonyms synonyms={ncit.s}/>
                      </tbody>
                    </TableStyled>
                  </TableContainer>
                  </Col>
                </Row>
              )}
            </div>
          </Collapse>
        </>
      );
    };

    const NcitValues = (props) => {
      if (props.ncit !== undefined) {
        return props.ncit.map((item, index) =>
          <div key={index} className="ncit-value-container">
            <Row>
              <Col xs={12}>
                {item.c} (NCIt)
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Table striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>Term</th>
                      <th>Source</th>
                      <th>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    <TableSynonyms synonyms={item.s}/>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
        );
      }
      return (null);
    };
  
    const TableEnum = (props) => {
      let [isToggleOn, setIsToggleOn] = useState(false);

      const ToggleTableHandler = event => {
        event.preventDefault();
        setIsToggleOn(!isToggleOn);
      };

      if (props.item !== undefined) {
        return(
          <>
            <RowStyled>
              <Col xs={10}>{props.item.n}</Col>
              <ColRight xs={2}>
                {((props.item.ncit !== undefined && props.item.ncit.length !== 0) || props.item.icdo !== undefined) &&
                  <a href="/#" aria-label={isToggleOn === true ? 'collapse' : 'expand'} onClick={ToggleTableHandler}>
                    {isToggleOn === true
                      ? <FontAwesomeIcon icon={faMinus}/>
                      : <FontAwesomeIcon icon={faPlus}/>
                    }
                  </a>
                }
              </ColRight>
            </RowStyled>
            {((props.item.ncit !== undefined && props.item.ncit.length !== 0) || props.item.icdo !== undefined) &&
              <Collapse in={isToggleOn} mountOnEnter={true}>
                <div className="ncit-values">
                  {(props.item.ncit !== undefined && props.item.ncit.length !== 0) &&
                    <NcitValues ncit={props.item.ncit} />
                  }
                </div>
              </Collapse>
            }
          </>
        );
      }
      return (null);
    };

    return (
      <>
        <Modal.Header closeButton>
        <Modal.Title id="to-compare-modal">Compare Your Values</Modal.Title>
        {/* <InputGroupStyled>
          <InputGroup.Prepend>
            <InputGroup.Text id="search-values-input">
              <FontAwesomeIcon icon={faSearch}/>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            placeholder="Type at least 3 characters"
            aria-label="Search"
            aria-describedby="Search"
            onChange={handleSearchChange}
          />
        </InputGroupStyled> */}
        <FormGroupStyled>
          <CheckboxLabel>
            <CheckboxInput name="partial" type="checkbox" checked={optionsState['partial']}  onClick={checkedToggleHandler}/>
            <CheckboxSpan>
              <CheckboxIcon icon={faCheck}/>
            </CheckboxSpan>
            Partial match
          </CheckboxLabel>
          <CheckboxLabel>
            <CheckboxInput name="syns" type="checkbox" checked={optionsState['syns']} onClick={checkedToggleHandler}/>
            <CheckboxSpan>
              <CheckboxIcon icon={faCheck}/>
            </CheckboxSpan>
            Synonyms
          </CheckboxLabel>
          <CheckboxLabel>
            <CheckboxInput name="unmatched" type="checkbox" checked={optionsState['unmatched']} onClick={checkedToggleHandler}/>
            <CheckboxSpan>
              <CheckboxIcon icon={faCheck}/>
            </CheckboxSpan>
            Show Unmatched Values
          </CheckboxLabel>
        </FormGroupStyled>
      </Modal.Header>
      <ModalBodyStyled>
        <Container>
          {showReport === false ?
          <>
            <TableThead>
              <Col xs={6}>
                <TableTh>User Defined Values</TableTh>
              </Col>
              <Col xs={6}>
                <TableTh>Matched Values</TableTh>
              </Col>
            </TableThead>
            <Row>
              <Col xs={12}>
                <CompareFormContainer>
                  <CompareFormLeft>
                    <TextareaStyled rows="10" cols="20" placeholder="Input values line by line" autocomplete="off" value={userValues} onChange={userInputUpdate}></TextareaStyled>
                  </CompareFormLeft>
                  <CompareFormDivider/>
                  <CompareFormRight>
                    <Container>
                      {(items !== undefined && items !== []) &&
                        <>
                          {items.map((item, index) => {
                            return(
                              <TableEnum key={index} item={item}/>
                            )
                          })}
                        </>
                      }
                    </Container>
                  </CompareFormRight>
                </CompareFormContainer>
              </Col>
            </Row>
          </>
          :
          <Row>
            <ColStyled xs={12}>
              {resultReport.length !== 0 ?
              <Table bordered>
                <thead>
                  <tr>
                    <th>User Defined Values</th>
                    <th>Matched Values</th>
                  </tr>
                </thead>
                <tbody>
                  {resultReport.map(item => 
                    <tr>
                      <td>{item.match}</td>
                      <td>
                        <TableNCIt name={item.n} ncit={item.ncit}/>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              :
              <Indicator>Sorry, no results found.</Indicator>
              }
            </ColStyled>
          </Row>
          }
        </Container>
      </ModalBodyStyled>
      <Modal.Footer>
      {showReport === false ?
        <>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          <Button variant="primary"onClick={handleCompare}>Compare</Button>
        </>
        :
        <Button variant="secondary" onClick={handleButtonBack}>Back</Button>
      }
      </Modal.Footer>
    </>
    );
  }

  return (
    <>
      <ButtonStyled variant="link" onClick={handleShow}>
        Compare with User List
      </ButtonStyled>

      <ModalStyled
        size="lg"
        show={show} 
        onHide={handleClose} 
        aria-labelledby="to-compare-modal"
      >
        <ModalContainer items={items}/>
      </ModalStyled>
    </>
  );
}


export default ToCompareModal;
