import {useState} from 'react';
import styled from 'styled-components';
import { Button, Modal, Form} from 'react-bootstrap';


const ButtonStyled = styled(Button)`
  font-size: 0.87rem;
  border-radius: 1rem;
  font-weight: 600;
  margin-bottom: 0.3rem;

  &&:hover,
  &&:focus {
    background-color: #6fc0d9;
    border-color: #34859d;
  }
`;

const ButtonGreen = styled(ButtonStyled)`
  background-color: #00e097;
  border-color: #0a8867;

  &&:hover,
  &&:focus {
    background-color: #00a770;
  }
`;


const ModalBodyStyled = styled(Modal.Body)`
  padding: 4rem;
`;

const BatchUpdateModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <ButtonGreen onClick={handleShow}>
        Batch Update
      </ButtonGreen>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Batch Update</Modal.Title>
        </Modal.Header>
        <ModalBodyStyled>

        <Form>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Select Template</Form.Label>
            <Form.Control as="select">
              <option>Select..</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </Form.Control>
          </Form.Group>
          
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input</Form.Label>
            <Form.Control type="file" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update
          </Button>

        </Form>

        </ModalBodyStyled>
        {/* <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Update
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default BatchUpdateModal;
