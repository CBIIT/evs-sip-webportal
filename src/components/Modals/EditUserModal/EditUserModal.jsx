import {useState} from 'react';
import { useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { EditIcon } from '../../ui/icons/Icons';
import styles from './EditUserModal.module.css';

import { baseUrl } from '../../../api';

const optionsProjects = [
  { value: 'GDC', label: 'GDC' },
  { value: 'CTDC', label: 'CTDC' },
  { value: 'ICDC', label: 'ICDC' },
  { value: 'PCDC', label: 'PCDC' }
];

const EditUserModal = ({updateUserList, username}) => {
  const currentUser = useSelector(state => state.currentUser);
  const [userState, setUserState] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = async e => {  
    e.preventDefault();
    setShow(true);
    setIsLoading(true);
    const response = await fetch(`${baseUrl}/user/userprofile?username=${username}`);
    const data = await response.json();
    setUserState(data.results[0]);
    setFormErrors({});
    setIsLoading(false);
  };

  const handleOnSubmitUser = async e => {
    e.preventDefault();
    const errors = findFormErrors();

    if ( Object.keys(errors).length > 0 ) { 
      setFormErrors(errors);
    } else {
      const body = {
          "requester": currentUser.user.userid,
          "user": {
              "role": userState.role,
              "projects": userState.projects,
              "nci_username": userState.nci_username,
              "first_name": userState.first_name,
              "last_name": userState.last_name,
              "active": userState.active,
              "email": userState.email
          }
      };
      const response = await fetch(`${baseUrl}/user/updateuser`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      setUserState(data.user);
      //refresh user list
      updateUserList();
      handleClose();
    }
  }

  const handleFormOnChange = e => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: ''});
  };

  const handleFormOnChangeCheckbox = e => {
    setUserState({ ...userState, [e.target.name]: e.target.checked ? 'Y' : 'N'  });
  };

  const handleMultiOnChange = options => {
    const projects = options.map(e => e.value).join(',');
    setUserState({ ...userState, projects: projects });
  };

  const splitProjects = projects => {
    const sp = projects ? projects.split(',') : [];
    return optionsProjects.filter((op) => {
     return sp.some(pj => pj === op.value);
    });
  };

  const findFormErrors = (fieldName, value) => {
    const newErrors = {}

    // first name errors
    if ( !userState.first_name || userState.first_name  === '' ) newErrors.first_name = 'cannot be blank!'
    else if ( userState.first_name.length > 30 ) newErrors.first_name = 'first name is too long!'

    // last name errors
    if ( !userState.last_name || userState.last_name === '' ) newErrors.last_name = 'cannot be blank!'
    else if ( userState.last_name.length > 30 ) newErrors.last_name = 'last name is too long!'

    //nci_username erros
    if ( !userState.nci_username || userState.nci_username === '' ) newErrors.nci_username = 'cannot be blank!'
    else if ( userState.nci_username.length > 10 ) newErrors.nci_username = 'last name is too long!'

    //email erros
    if ( !userState.email || userState.email === '' ) newErrors.email = 'cannot be blank!'
    else if ( !userState.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ) newErrors.email = 'invalid email!'
    else if ( userState.email.length > 30 ) newErrors.email = 'email is too long!'

    //role erros
    if ( !userState.role || userState.role === '' ) newErrors.role = 'cannot be empty!'

    return newErrors;
  }

  return (
    <>
      <a className={styles.actionLink} href="/#" aria-label="edit"onClick={handleShow}>
        <EditIcon />
      </a>

      <Modal size="lg" show={show} onHide={handleClose} animation={false} className={styles.modal}>
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title className={styles.title}>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          {isLoading === true
          ? <div>Loading...</div>
          : 
          <Form onSubmit={handleOnSubmitUser} id="form-edit-user">
              <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formFirstName">
                <Form.Label className={styles.formLabel}>First Name</Form.Label>
                <Form.Control 
                  className={styles.formControl} 
                  type="text"
                  name="first_name"
                  placeholder="Enter first name"
                  onChange={handleFormOnChange}
                  isInvalid={!!formErrors.first_name}
                  defaultValue={userState.first_name}
                  required
                />
                <Form.Control.Feedback type='invalid'>{formErrors.first_name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formLastName">
                <Form.Label className={styles.formLabel}>Last Name</Form.Label>
                <Form.Control 
                  className={styles.formControl} 
                  type="text"
                  name="last_name"
                  placeholder="Enter last name"
                  onChange={handleFormOnChange}
                  isInvalid={!!formErrors.last_name}
                  defaultValue={userState.last_name}
                  required
                />
                <Form.Control.Feedback type='invalid'>{ formErrors.last_name }</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formNCIUser">
                <Form.Label className={styles.formLabel}>NIH User Name</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="text" name="nci_username"
                  placeholder="Enter user name"
                  onChange={handleFormOnChange}
                  isInvalid={!!formErrors.nci_username}
                  defaultValue={userState.nci_username}
                  required
                />
                <Form.Control.Feedback type='invalid'>{formErrors.nci_username}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formBasicEmail">
                <Form.Label className={styles.formLabel}>Email Address</Form.Label>
                <Form.Control
                  className={styles.formControl}
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleFormOnChange}
                  isInvalid={!!formErrors.email}
                  defaultValue={userState.email}
                  required
                />
                <Form.Control.Feedback type='invalid'>{formErrors.email}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`} controlId="formSelectProject">
                <Form.Label className={styles.formLabel}>Project(s)</Form.Label>
                <Select
                  name="projects"
                  isMulti
                  options={optionsProjects}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleMultiOnChange}
                  defaultValue={splitProjects(userState.projects)}
                />
              </Form.Group>
              <Form.Group className={`mb-3 ${styles.formGroup} ${styles.required}`}>
                <Form.Label className={styles.formLabel}>Role</Form.Label>
                <div>
                  <Form.Check
                    inline
                    id="roleSelectAdmin"
                    type="radio"
                    name="role"
                    value="Admin"
                    label="Admin"
                    isInvalid={!!formErrors.role}
                    onChange={handleFormOnChange}
                    defaultChecked={userState.role === 'Admin'}
                  />
                  <Form.Check
                    inline
                    id="roleSelectUser"
                    type="radio"
                    name="role"
                    value="User"
                    label="User"
                    isInvalid={!!formErrors.role}
                    onChange={handleFormOnChange}
                    defaultChecked={userState.role === 'User'}
                  />
                </div>
                <Form.Control.Feedback type='invalid' style={!!formErrors.role ? {display: 'block'} : {}}>{ formErrors.role }</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formStatusCheckbox">
                <Form.Check 
                  type="checkbox"
                  name="active"
                  label="Active"
                  onChange={handleFormOnChangeCheckbox}
                  defaultChecked={userState.active === 'Y' ? true : false}
                />
              </Form.Group>
              <Button className={[styles.button, styles.cancelButton]} type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button className={[styles.button, styles.submitButton]} type="submit" form="form-edit-user">
                Update User
              </Button>
            </Form>
          }
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUserModal;
