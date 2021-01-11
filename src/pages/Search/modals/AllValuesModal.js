import React, {useState} from 'react';
import styled from 'styled-components';
import { Button, Modal, Table, Row, Col, Collapse} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { apiGetGDCDataById } from '../../../api';


const ColRight = styled(Col)`
  text-align: right;
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 12px;
`;

const TableStyled = styled(Table)`
  margin-bottom: 0;
`;

const AllValuesModal = (props) => {
  const [show, setShow] = useState(false);
  const [items, setItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    apiGetGDCDataById(props.idterm).then(result => {
      setItems(result);
    }).then(() => {
      setShow(true);
    });
  };

  const TableSynonyms = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) =>
        <tr key={index}>
          <td>{item.n}</td>
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
        <Row>
          <Col xs={10}>
            {props.ncit.l}
          </Col>
          <ColRight xs={2}>
            <a href="/#" aria-label={isToggleOn === true ? 'collapse' : 'expand'} onClick={ToggleTableHandler}>
              {isToggleOn === true
                ? <FontAwesomeIcon icon={faMinus}/>
                : <FontAwesomeIcon icon={faPlus}/>
              }
            </a>
          </ColRight>
        </Row>
        <Collapse in={isToggleOn} mountOnEnter={true}>
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
                <TableSynonyms synonyms={props.ncit.s}/>
              </tbody>
            </TableStyled>
          </TableContainer>
        </Collapse>
      </>
    );
  };

  const TableEnums = (props) => {
    if (props.items !== [] && props.items[0]._source.enum !== undefined) {
      return props.items[0]._source.enum.map((e) => {
        return e.ncit.map((nc, index) => {
          if(index === 0) {
            return (
              <tr key={e.n +'-'+index}>
                <td rowSpan={e.ncit.length}>{e.n}</td>
                <td rowSpan={e.ncit.length}>{e.icdo !== undefined && e.icdo.c}</td>
                <td>{nc.c}</td>
                <td>
                  <TableNCIt ncit={nc}/>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={e.n +'-'+index}>
                <td>{nc.c}</td>
                <td>
                  <TableNCIt ncit={nc}/>
                </td>
              </tr>
            );
          }  
        });
      });
    }
    return (null);
  };

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        See All Values
      </Button>
      <Modal
        size="lg"
        show={show} 
        onHide={handleClose} 
        aria-labelledby="all-values-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="all-values-modal">See All Values</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered condensed="true">
            <thead>
              <tr>
                <th>Values</th>
                <th>ICD-O-3 Code</th>
                <th>Mapped NCIt Code</th>
                <th>NCIt Preferred Term</th>
              </tr>
            </thead>
            <tbody>
              <TableEnums items={items}/>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default AllValuesModal;
