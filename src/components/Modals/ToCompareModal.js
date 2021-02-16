import React, {useState} from 'react';
import styled from 'styled-components';
import { Button, Modal, Container, Row, Col, InputGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { searchFilter } from '../../shared';
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

const ToCompareModal = (props) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  //const [keyword, setKeyword] = useState('');

  const handleClose = () => setShow(false);
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

  const handleSearchChange = (event) => {
    let keyword = event.target.value.trim().replace(/[\ ]+/g, ' ').toLowerCase();

    if (keyword.length >= 3 && data !== [] && data[0]._source.enum !== undefined) {
      let newItem = searchFilter(data[0]._source.enum, keyword);
      setItems(newItem);
    } else {
      setItems(data[0]._source.enum);
    }
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
            <Col xs={12}>
              <CompareFormContainer>
                <CompareFormLeft>
                  <TextareaStyled id="cp_input" class="compare-form__textarea" rows="10" cols="20" placeholder="Input values line by line" autocomplete="off"></TextareaStyled>
                </CompareFormLeft>
                <CompareFormDivider/>
                <CompareFormRight>
                  <TableEnums items={items}/>
                </CompareFormRight>
              </CompareFormContainer>
            </Col>
          </Row>
        </Container>
        </ModalBodyStyled>
      </ModalStyled>
    </>
  );
}


export default ToCompareModal;
