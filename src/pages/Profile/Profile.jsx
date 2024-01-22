import styles from './Profile.module.css'
import { Container, Form, Row, Button, Col, FormControl } from 'react-bootstrap'
import Select from 'react-select'

const optionsOrganizations = [
  { value: 'nci', label: 'National Cancer Institute (NCI)' },
  { value: 'nih', label: 'National  Institutes of Health (NIH)' },
]

const optionsProjects = [
  { value: 'gdc', label: 'GDC' },
  { value: 'ctdc', label: 'CTDC' },
  { value: 'icdc', label: 'ICDC' },
  { value: 'pcdc', label: 'PCDC' },
]

const Profile = (props) => {
  return (
    <div className={styles.page}>
      <div className={styles['page-container']}>
        <div className={styles['page-title']}>
          <h1 className={styles.title}>My Profile</h1>
        </div>
        <Container className={styles.container}>
          <Row>
            <Col sm={6}>
              <p>
                The EVS-SIP Member Log-in is available only for NIH and ERE
                Commons team members only
              </p>
              <Form>
                <Form.Group
                  required
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label className={styles.label}>First Name</Form.Label>
                  <FormControl
                    className={styles['form-control']}
                    type="text"
                    placeholder="Enter first name"
                  />
                </Form.Group>
                <Form.Group
                  required
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label className={styles.label}>Last Name</Form.Label>
                  <FormControl
                    className={styles['form-control']}
                    type="text"
                    placeholder="Enter last name"
                  />
                </Form.Group>
                <Form.Group
                  required
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label className={styles.label}>
                    Email Address
                  </Form.Label>
                  <FormControl
                    className={styles['form-control']}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group
                  required
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label className={styles.label}>
                    Organization(s)
                  </Form.Label>
                  <Select
                    defaultValue={[optionsOrganizations[0]]}
                    name="organizations"
                    isMulti
                    options={optionsOrganizations}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Form.Group>
                <Form.Group
                  required
                  className="mb-3"
                  controlId="formBasicEmail"
                >
                  <Form.Label className={styles.label}>Project(s)</Form.Label>
                  <Select
                    defaultValue={[optionsProjects[0], optionsProjects[1]]}
                    name="organizations"
                    isMulti
                    options={optionsProjects}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
                </Form.Group>
                <Button
                  className={`${styles.button} ${styles['button-blue']}`}
                  type="submit"
                >
                  Update
                </Button>
              </Form>
            </Col>
            <Col sm={6}></Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Profile
