import React, {useState} from 'react';
import styled from 'styled-components';
import { Button, Modal, Form, FormControl} from 'react-bootstrap';
import Select from 'react-select'

import DButton from '../Button/Button'

// const optionsOrganizations = [
//   { value: 'nci', label: 'National Cancer Institute (NCI)' },
//   { value: 'nih', label: 'National  Institutes of Health (NIH)' }
// ]

const optionsProjects = [
  { value: 'gdc', label: 'GDC' },
  { value: 'ctdc', label: 'CTDC' },
  { value: 'icdc', label: 'ICDC' },
  { value: 'pcdc', label: 'PCDC' }
]

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


const ButtonSubmit = styled(ButtonStyled)`
  background-color: #176bd3;
  border-color: #176bd3;
  margin: 1.5rem 0;
  border: 0.375rem double white;
  border-radius: 2rem;
  text-transform: uppercase;
  padding: 0.5rem 1.5rem;

  &&:hover,
  &&:focus {
    background-color: #0b376d;
  }
`;

// const ButtonBlue = styled(ButtonStyled)`
//   background-color: #6fc0d9;
//   border-color: #34859d;

//   &&:hover,
//   &&:focus {
//     background-color: #5b9baf;
//   }
// `;


const FormGroupStyled = styled(Form.Group)`

  ${props => props.required &&`
    && > .form-label:after {
      content:"*";
      color:red;
      padding: 0 0.2rem;
    }
  `}

`;

const FormControlStyled = styled(FormControl)`
  border-radius: 1rem !important;
`;

const FormLabel = styled(Form.Label)`
  font-size: 14px;
  color: #597f8b;
  font-weight: 600;
  padding-left: 0.2rem;
`;


// const ModalStyled = styled(Modal)`
//   border: 5px solid blue;
// `;


const ModalBodyStyled = styled(Modal.Body)`
  padding: 2rem 5rem;
  border: 5px solid #628CBD;
`;


const TitleContainer = styled.div`
  padding-bottom: 2rem;
`;


const ModelTitleStyled = styled(Modal.Title)`
  font-family: 'Raleway-Bold';
  padding: 0.5rem 0;
  inline-size: 16rem;
  text-transform: uppercase;
  margin: auto;
  text-align: center;
  border-bottom: 1px solid var(--black);
  font-size: 1.25rem;
`;


const AddNewUserModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {  
    setShow(true)
  };

  return (
    <>
      <DButton onClick={handleShow}>
        Add New User
      </DButton>

      <Modal size="lg" show={show} onHide={handleClose}>
        <ModalBodyStyled>
          <TitleContainer>
            <ModelTitleStyled>Add New User</ModelTitleStyled>
          </TitleContainer>
          <Form>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>First Name</FormLabel>
              <FormControlStyled type="text" placeholder="Enter first name" />
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Last Name</FormLabel>
              <FormControlStyled type="text" placeholder="Enter last name" />
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>NIH User Name</FormLabel>
              <FormControlStyled type="text" placeholder="Enter user name" />
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Email Address</FormLabel>
              <FormControlStyled type="email" placeholder="Enter email" />
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Project(s)</FormLabel>
              <Select 
                defaultValue={[]}
                name="organizations"
                isMulti
                options={optionsProjects}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <FormLabel>Role</FormLabel>
              <FormControlStyled as="select" className="form-control" placeholder="Enter Role">
                <option>Enter a role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </FormControlStyled>
            </FormGroupStyled>
            <FormGroupStyled required className="mb-3" controlId="formBasicEmail">
              <Form.Check 
                type='checkbox'
                id='default-checkbox'
                label='Active'
              />
            </FormGroupStyled>
            <ButtonSubmit type="submit">
              Add User
            </ButtonSubmit>
          </Form>

        </ModalBodyStyled>
      </Modal>
    </>
  );
}

export default AddNewUserModal;
