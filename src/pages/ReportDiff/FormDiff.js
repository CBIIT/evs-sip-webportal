import React from 'react';
import styled from 'styled-components';
import { Form, Button} from 'react-bootstrap';

const FornStyled = styled(Form)`
  margin-bottom: 1rem;
`;

const FormDiff = () => {
  return <FornStyled>
    <Form.Group>
      <Form.File label="Select File"/>
    </Form.Group>
    <Form.Group>
      <Form.Label>Choose Source</Form.Label>
      <Form.Control as="select" defaultValue="gdc">
      <option value="gdc">GDC</option>
        <option value="icdc">ICDC</option>
        <option value="ctdc">CTDC</option>
      </Form.Control>
    </Form.Group>
    <Button variant="primary" type="submit">
      Compare
    </Button>
  </FornStyled>
}

export default FormDiff;
