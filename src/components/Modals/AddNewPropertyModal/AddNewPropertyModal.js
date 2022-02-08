import React, {useState} from 'react';
//import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
//import Select from 'react-select';
import styles from './AddNewPropertyModal.module.css';

//import { baseUrl } from '../../../api';


const AddNewPropertyModal = () => {
  //const currentUser = useSelector(state => state.currentUser);
  const [formState, setFormState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async (event) => {  
    event.preventDefault();
    setShow(true);
    setFormErrors({});
  };

  const handleOnSubmitProp = async (event) => {
    event.preventDefault();
    const errors = findFormErrors();
 
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
    //   const body = {
    //       "requester": currentUser.name,
    //       "user": {
    //           "role": formState.role,
    //           "projects": formState.projects,
    //           "nci_username": formState.nci_username,
    //           "first_name": formState.first_name,
    //           "last_name": formState.last_name,
    //           "active": formState.active,
    //           "email": formState.email
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
      setFormState({});
      setFormErrors({});
      //close modal
      handleClose();
    }
  }

  const handleFormOnChange = event => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
    setFormErrors({ ...formErrors, [event.target.name]: ''});
  };

  const findFormErrors = (fieldName, value) => {
    const newErrors = {}

    // first name errors
    if ( !formState.prop_name || formState.prop_name  === '' ) newErrors.prop_name = 'cannot be blank!'
    else if ( formState.prop_name.length > 30 ) newErrors.prop_name = 'first name is too long!'

    // last name errors
    if ( !formState.ncit_code || formState.ncit_code === '' ) newErrors.ncit_code = 'cannot be blank!'
    else if ( formState.ncit_code.length > 10 ) newErrors.ncit_code = 'last name is too long!'

    //nci_username erros
    if ( !formState.prop_desc || formState.prop_desc === '' ) newErrors.prop_desc = 'cannot be blank!'
    else if ( formState.prop_desc.length > 50 ) newErrors.prop_desc = 'last name is too long!'

    return newErrors;
  }

  return (
    <>
      <a href="/#" className={`btn btn-outline-primary ${styles.actionLink}`} onClick={handleShow}>Add Property</a>

      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.title}>Add New Property</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Form onSubmit={handleOnSubmitProp} id="form-new-prop">
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formPropName">
              <Form.Label className={styles.formLabel}>Property Name</Form.Label>
              <Form.Control
                className={styles.formControl}
                type="text"
                name="prop_name"
                placeholder="Enter property name"
                onChange={handleFormOnChange}
                isInvalid={!!formErrors.prop_name}
                defaultValue={formState.prop_name}
                required
              />
              <Form.Control.Feedback type='invalid'>{ formErrors.prop_name }</Form.Control.Feedback>
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
                defaultValue={formState.ncit_code}
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
                name="prop_desc"
                placeholder="Enter Property Description"
                onChange={handleFormOnChange}
                isInvalid={!!formErrors.prop_desc}
                defaultValue={formState.prop_desc}
                required
              />
              <Form.Control.Feedback type='invalid'>{ formErrors.prop_desc }</Form.Control.Feedback>
            </Form.Group>
            <Button className={[styles.button, styles.cancelButton]} type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button className={[styles.button, styles.submitButton]} type="submit" form="form-new-prop">
              Add Property
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddNewPropertyModal;
