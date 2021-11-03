import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Button from '../../Button/Button'
import styles from './EditUserModal.module.css';

const optionsProjects = [
  { value: 'gdc', label: 'GDC' },
  { value: 'ctdc', label: 'CTDC' },
  { value: 'icdc', label: 'ICDC' },
  { value: 'pcdc', label: 'PCDC' }
]

const optionsRoles = [
  { value: 'Admin', label: 'Admin' },
  { value: 'User', label: 'User' }
]

const EditUserModal = (props) => {
  const users = useSelector(state => state.usersList.users);

  const [userState, setUserState] = useState({
    first_name: '',
    last_name: '',
    nci_username: '',
    email: '',
    active: 'N'
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = event => {  
    event.preventDefault();
    setShow(true);
    setUserState(getUserValues(props.userid));

  };

  const getUserValues = (id) => {
    return users.find((user) => user.id === id);
  };

  return (
    <>
      <a className={styles.actionLink} href="/#" aria-label="edit"onClick={handleShow}>
        <FontAwesomeIcon icon={faEdit}/>
      </a>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Body className={styles.modalBody}>
          <div className={styles.titleContainer}>
            <Modal.Title className={styles.title}>Edit User</Modal.Title>
          </div>
          <Form>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formFirstName">
              <Form.Label className={styles.formLabel}>First Name</Form.Label>
              <Form.Control className={styles.formControl} type="text" placeholder="Enter first name" defaultValue={userState.first_name} required/>
            </Form.Group>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formLastName">
              <Form.Label className={styles.formLabel}>Last Name</Form.Label>
              <Form.Control className={styles.formControl} type="text" placeholder="Enter last name" defaultValue={userState.last_name} required/>
            </Form.Group>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formNCIUser">
              <Form.Label className={styles.formLabel}>NIH User Name</Form.Label>
              <Form.Control className={styles.formControl} type="text" placeholder="Enter user name" defaultValue={userState.nci_username} required/>
            </Form.Group>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formBasicEmail">
              <Form.Label className={styles.formLabel}>Email Address</Form.Label>
              <Form.Control className={styles.formControl} type="email" placeholder="Enter email" defaultValue={userState.email} required/>
            </Form.Group>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formSelectProject">
              <Form.Label className={styles.formLabel}>Project(s)</Form.Label>
              <Select 
                defaultValue={[]}
                name="organizations"
                isMulti
                options={optionsProjects}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Form.Group>
            <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formSelectRole">
              <Form.Label className={styles.formLabel}>Role</Form.Label>
              <Select
                className="basic-single"
                defaultValue={optionsRoles[0]}
                name="roles"
                options={optionsRoles}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStatusCheckbox">
              <Form.Check 
                type='checkbox'
                id='default-checkbox'
                label='Active'
                defaultChecked={userState.active === 'Y' ? true : false}
              />
            </Form.Group>
            <Button className={styles.submitButton} type="submit">
              Edit User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUserModal;
