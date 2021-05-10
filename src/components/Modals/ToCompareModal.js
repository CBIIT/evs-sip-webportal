import React, {useState} from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Button, Modal, Container, Row, Col, Collapse, InputGroup, FormControl, Table} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus , faSearch } from '@fortawesome/free-solid-svg-icons';
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
`;

const InputGroupStyled = styled(InputGroup)`
  max-width: 23rem;
  padding-left: 2rem;
`;

const RowStyled = styled(Row)`
  min-width: 25rem;
  margin-right: -0.75rem;
  margin-left: -0.75rem;
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


const ToCompareModal = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [userValues, setUserValues] = useState('');
  const [items, setItems] = useState([]);
  const [result, setResult] = useState();
  const [showReport, setShowReport] =  useState(false);
  //const [keyword, setKeyword] = useState('');
  const [options, setOptions] =  useState({
      partial: true,
      syns: false,
      unmatched: false
  });

  const handleClose = () => {
    setUserValues('');
    setShow(false);
  };
  const handleShow = () => {
    apiGetGDCDataById(props.idterm).then(result => {
      setData(result);
      if (result !== [] && result[0]._source.enum !== undefined) {
        setItems(result[0]._source.enum);
      }
    }).then(() => {
      setShow(true);
    });
  };

  const userInputUpdate =  (event) => {
    setUserValues(event.target.value);
  }

  const handleSearchChange = (event) => {
    let keyword = event.target.value.trim().replace(/[\ ]+/g, ' ').toLowerCase();

    if (keyword.length >= 3 && data !== [] && data[0]._source.enum !== undefined) {
      let newItem = searchFilter(data[0]._source.enum, keyword);
      setItems(newItem);
    } else {
      setItems(data[0]._source.enum);
    }
  };

  const handleCompare = () => {
    if(showReport === false) setShowReport(true);
    setResult(compareGDCvalues(userValues, items, options));
  }

  const handleButtonBack = () => {
    if(showReport === true) setShowReport(false);
    setResult([]);
  }

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
      let caseSensitiveV = v.trim().replace(/[\ ]+/g, ' ');
      v = v.trim().toLowerCase().replace(/[\ ]+/g, ' ');
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
        <RowStyled>
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
        </RowStyled>
        <Collapse in={isToggleOn} mountOnEnter={true}>
          <div>
            {props.ncit.map(ncit => 
              <Row>
                <Col xs={2}>
                  {ncit.c}
                </Col>
                <Col xs={10}>
                <TableContainer>
                  <TableStyled striped bordered condensed="true" hover>
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

  const TableEnums = (props) => {
    if (props.items !== undefined && props.items !== []) {
      return props.items.map((e, index) =>
        <div key={index} dangerouslySetInnerHTML={{ __html: e.n }}></div>
      );
    }
    return (null);
  };

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
        <Modal.Header closeButton>
          <Modal.Title id="to-compare-modal">Compare Your Values</Modal.Title>
          <InputGroupStyled>
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
          </InputGroupStyled>
        </Modal.Header>
        <ModalBodyStyled>
          <Container>
            <TableThead>
              <Col xs={6}>
                <TableTh>User Defined Values</TableTh>
              </Col>
              <Col xs={6}>
                <TableTh>Matched Values</TableTh>
              </Col>
            </TableThead>
            <Row>
            {showReport === false ? 
              <Col xs={12}>
                <CompareFormContainer>
                  <CompareFormLeft>
                    <TextareaStyled rows="10" cols="20" placeholder="Input values line by line" autocomplete="off" value={userValues} onChange={userInputUpdate}></TextareaStyled>
                  </CompareFormLeft>
                  <CompareFormDivider/>
                  <CompareFormRight>
                    <TableEnums items={items}/>
                  </CompareFormRight>
                </CompareFormContainer>
              </Col>
            :
            <ColStyled xs={12}>
              {result.length !== 0 ?
                <Table striped bordered>
                  <tbody>
                    {result.map(item => 
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
            }
            </Row>
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
      </ModalStyled>
    </>
  );
}


export default ToCompareModal;
