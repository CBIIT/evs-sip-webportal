import React from 'react';
import styled from 'styled-components';
import { Form, Button} from 'react-bootstrap';

const FornStyled = styled(Form)`
  margin-bottom: 3rem;
`;

const FormDiff = () => {
  return <FornStyled>
    <Form.Group>
      <Form.File label="Select Excel File"/>
    </Form.Group>
    {/* <Form.Group>
      <Form.Label>Choose Source</Form.Label>
      <Form.Control as="select" defaultValue="gdc">
      <option value="gdc">GDC</option>
        <option value="icdc">ICDC</option>
        <option value="ctdc">CTDC</option>
      </Form.Control>
    </Form.Group> */}
    <Form.Group>
      <Form.Label>Source Branch from GDC Dictionary</Form.Label>
      <Form.Control as="select">
        <option value="2.3.0">Yertle the Turtle 2.3.0</option>
        <option value="2.2.0">Very Bad Fish 2.2.0</option>
        <option value="2.1.0">Thidwick 2.1.0</option>
      </Form.Control>
    </Form.Group>
    <Button variant="primary" type="submit">
      Compare
    </Button>
  </FornStyled>
}

export default FormDiff;
