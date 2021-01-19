import React, {useState} from 'react';
import styled from 'styled-components';
import { Button, Modal, Table, Row, Col, Collapse, Badge} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { apiGetGDCDataById } from '../../api';

const ColRight = styled(Col)`
  text-align: right;
`;

const TableContainer = styled.div`
  width: 100%;
  padding: 12px;
`;

const MainTableContainer = styled.div`
  width: 100%;
`;

const TableStyled = styled(Table)`
  margin-bottom: 0;
`;

const BadgeStyled = styled(Badge)`
  margin-left: 1rem;
  font-size: 100%;
`;

const ModalStyled = styled(Modal)`
  && .modal-dialog {
    max-width: 75rem;
  }
`;

const RowStyled = styled(Row)`
  width: 30rem;
  padding-right: -0.75rem;
  padding-left: -0.75rem;
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

  const TableICDOSyn = (props) => {
    if (props.synonyms !== undefined) {
      return props.synonyms.map((item, index) =>
        <tr key={index}>
          <td>{item.n}</td>
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
        </RowStyled>
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

  // const TableICDO3 = (props) => {
  //   return (
  //     <TableContainer>
  //       <TableStyled striped bordered condensed="true" hover>
  //         <thead>
  //           <tr>
  //             <th>Term</th>
  //             <th>Type</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <TableICDOSyn synonyms={props.icdo.s}/>
  //         </tbody>
  //       </TableStyled>
  //     </TableContainer>
  //   );
  // }



  const TableICDO3 = (props) => {

    let [isToggleOn, setIsToggleOn] = useState(false);

    const ToggleTableHandler = event => {
      event.preventDefault();
      setIsToggleOn(!isToggleOn);
    };
    return (
      <>
        <RowStyled>
          <Col xs={10}>
            {props.icdo.c}
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
          <TableContainer>
            <TableStyled striped bordered condensed="true" hover>
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <TableICDOSyn synonyms={props.icdo.s}/>
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
                <td rowSpan={e.ncit.length}>
                  {e.icdo !== undefined &&
                    <TableICDO3 icdo={e.icdo} />
                  }
                </td>
                <td>
                  <a href={"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + nc.c} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{ __html: nc.c }}></a>
                </td>
                <td>
                  <TableNCIt ncit={nc}/>
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={e.n +'-'+index}>
                <td>
                  <a href={"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + nc.c} rel="noopener noreferrer" target="_blank" dangerouslySetInnerHTML={{ __html: nc.c }}></a>
                </td>
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


  const TitleModal = (props) => {
    if (props.items !== [] && props.items[0]._source.enum !== undefined) {
      return(<>Values from {props.items[0]._source.prop.n}</>);
    }
    return (null);
  }


  const TotalLabel = (props) => {
    if (props.items !== [] && props.items[0]._source.enum !== undefined) {
      return(
        <BadgeStyled variant="primary">{props.items[0]._source.enum.length}</BadgeStyled>
      );
    }
    return (null);
  }

  return (
    <>
      <Button variant="link" onClick={handleShow}>
        See All Values
      </Button>
      <ModalStyled
        show={show} 
        onHide={handleClose}
        aria-labelledby="all-values-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="all-values-modal">
            <TitleModal items={items}/>
            <TotalLabel items={items}/>  
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MainTableContainer>
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
          </MainTableContainer>
        </Modal.Body>
      </ModalStyled>
    </>
  );
}


export default AllValuesModal;
