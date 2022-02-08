import React, {useState} from 'react';
//import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
//import Select from 'react-select';
import styles from './AddNewValueModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

//import { baseUrl } from '../../../api';


const AddNewUserModal = () => {
  //const currentUser = useSelector(state => state.currentUser);
  const [userState, setUserState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async (event) => {  
    event.preventDefault();
    setShow(true);
    setFormErrors({});
  };

  const handleOnSubmitValue = async (event) => {
    event.preventDefault();
    const errors = findFormErrors();
 
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
    //   const body = {
    //       "requester": currentUser.name,
    //       "user": {
    //           "role": userState.role,
    //           "projects": userState.projects,
    //           "nci_username": userState.nci_username,
    //           "first_name": userState.first_name,
    //           "last_name": userState.last_name,
    //           "active": userState.active,
    //           "email": userState.email
    //       }
    //   };

    //   const response = await fetch(`${baseUrl}/user/createuser`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    //   });
    //   const data = await response.json();
    //   console.log(data);
      // clear state values
      setUserState({});
      setFormErrors({});
      //close modal
      handleClose();
    }
  }

  const handleFormOnChange = event => {
    setUserState({ ...userState, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: ''});
  };

  const findFormErrors = (fieldName, value) => {
    const newErrors = {}

    // first name errors
    if ( !userState.value_name || userState.value_name  === '' ) newErrors.value_name = 'cannot be blank!'
    else if ( userState.value_name.length > 30 ) newErrors.value_name = 'first name is too long!'

    // last name errors
    if ( !userState.ncit_code || userState.ncit_code === '' ) newErrors.ncit_code = 'cannot be blank!'
    else if ( userState.ncit_code.length > 10 ) newErrors.ncit_code = 'last name is too long!'

    //nci_username erros
    if ( !userState.value_desc || userState.value_desc === '' ) newErrors.value_desc = 'cannot be blank!'
    else if ( userState.value_desc.length > 50 ) newErrors.value_desc = 'last name is too long!'

    return newErrors;
  }

  return (
    <>
      <a href="/#" className={`btn btn-outline-primary ${styles.actionLink}`} onClick={handleShow}>Add Value</a>

      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.title}>Add New Value</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form onSubmit={handleOnSubmitValue} id="form-new-value">
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formValueName">
              <Form.Label className={styles.formLabel}>Value Name</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="text"
                name="value_name"
                placeholder="Enter value name"
                onChange={handleFormOnChange}
                isInvalid={!!formErrors.value_name}
                defaultValue={userState.value_name}
                required
              />
              <Form.Control.Feedback type='invalid'>{ formErrors.value_name }</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formNCITCode">
              <Form.Label className={styles.formLabel}>NCIT Code</Form.Label>
              <Form.Control 
                className={styles.formControl}
                type="text"
                name="ncit_code"
                placeholder="Enter a NCIT Code"
                onChange={handleFormOnChange}
                isInvalid={!!formErrors.ncit_code}
                defaultValue={userState.ncit_code}
                required
              />
              <Form.Control.Feedback type='invalid'>{ formErrors.ncit_code }</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formDescription">
              <Form.Label className={styles.formLabel}>Description</Form.Label>
              <Form.Control
                className={styles.formControl}
                as="textarea"
                rows={3}
                name="value_desc"
                placeholder="Enter Value Description"
                onChange={handleFormOnChange}
                isInvalid={!!formErrors.value_desc}
                defaultValue={userState.value_desc}
                required
              />
              <Form.Control.Feedback type='invalid'>{ formErrors.value_desc }</Form.Control.Feedback>
            </Form.Group>
            <Button className={[styles.button, styles.cancelButton]} type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button className={[styles.button, styles.submitButton]} type="submit" form="form-new-value">
              Add Value
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddNewUserModal;
