import styled from 'styled-components';
import { Form, Button} from 'react-bootstrap';

const FormStyled = styled(Form)`
  margin-bottom: 3rem;
`;

const FormLabelStyled = styled(Form.Label)`
  font-weight: 600;
`;

const FormDiff = (props) => {
  return <Form style={{ marginBottom: '3rem' }}>
    <Form.Group>
      <Form style={{ fontWeight: '500' }}>Choose Data Source</Form>
      <Form.Control as="select" disabled >
        <option value="gdc">Genomic Data Commons (GDC)</option>
        <option value="ctdc">Clinical Trial Data Commons (CTDC)</option>
        <option value="icdc">Integrated Canine Data Commons (ICDC)</option>
        <option value="pcdc">Pediatric Cancer Data Commons (PCDC)</option>
      </Form.Control>
    </Form.Group>
    <Form.Group>
      <Form style={{ fontWeight: '500' }}>Select Compare Type</Form>
      <div>
        <Form.Check inline label="Value" name="compare_type" type="radio" id="value" defaultChecked disabled/>
        <Form.Check inline label="Property" name="compare_type" type="radio" id="property" disabled/>
        <Form.Check inline label="Node" name="compare_type" type="radio" id="node" disabled/>
      </div>
    </Form.Group>
    <Form.Group>
      <Form style={{ fontWeight: '500' }}>Source Branch from GDC Dictionary</Form>
      <Form.Control as="select" disabled>
        <option value="2.3.0">Yertle the Turtle 2.3.0</option>
        <option value="2.2.0">Very Bad Fish 2.2.0</option>
        <option value="2.1.0">Thidwick 2.1.0</option>
      </Form.Control>
    </Form.Group>
    <Button variant="primary" onClick={props.reportTrigger} >
      Compare
    </Button>
  </Form>
}

export default FormDiff;
