import PropTypes from 'prop-types'
import styles from './FormDiff.module.css'
import { Form, Button } from 'react-bootstrap'

const FormDiff = (props) => {
  return (
    <Form className={styles.form}>
      <Form.Group>
        <Form.Label className={styles['form-label']}>
          Choose Data Source
        </Form.Label>
        <Form.Control as="select" disabled>
          <option value="gdc">Genomic Data Commons (GDC)</option>
          <option value="ctdc">Clinical Trial Data Commons (CTDC)</option>
          <option value="icdc">Integrated Canine Data Commons (ICDC)</option>
          <option value="pcdc">Pediatric Cancer Data Commons (PCDC)</option>
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label className={styles['form-label']}>
          Select Compare Type
        </Form.Label>
        <div>
          <Form.Check
            inline
            label="Value"
            name="compare_type"
            type="radio"
            id="value"
            defaultChecked
            disabled
          />
          <Form.Check
            inline
            label="Property"
            name="compare_type"
            type="radio"
            id="property"
            disabled
          />
          <Form.Check
            inline
            label="Node"
            name="compare_type"
            type="radio"
            id="node"
            disabled
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label className={styles['form-label']}>
          Source Branch from GDC Dictionary
        </Form.Label>
        <Form.Control as="select" disabled>
          <option value="2.3.0">Yertle the Turtle 2.3.0</option>
          <option value="2.2.0">Very Bad Fish 2.2.0</option>
          <option value="2.1.0">Thidwick 2.1.0</option>
        </Form.Control>
      </Form.Group>
      <Button variant="primary" onClick={props.reportTrigger}>
        Compare
      </Button>
    </Form>
  )
}

FormDiff.propTypes = {
  reportTrigger: PropTypes.func.isRequired,
}

export default FormDiff
