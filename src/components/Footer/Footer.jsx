import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './Footer.module.css'

import logo from '../../assets/img/nih-white-logo.png'

const Footer = () => {
  return (
    <footer className={styles.footer} role="contentinfo">
      <Container className={styles.container}>
        <div className={styles.menu}>
          <Row>
            <Col xs={5}>
              <a href="https://www.cancer.gov/" target="_blank" rel="noopener noreferrer">
                <img className={styles.logo} src={logo} alt="logo-footer" />
              </a>
            </Col>
            <Col xs={7}>
              <Row>
                <Col xs={4}>
                  <h2 className={styles.title}>Contact Information</h2>
                  <ul className={styles.ul}>
                    <li className={styles.li}>
                      <a href="mailto:evssip@mail.nih.gov">Contact Us</a>
                    </li>
                  </ul>
                </Col>
                <Col xs={4}>
                  <h2 className={styles.title}>More Information</h2>
                  <ul className={styles.ul}>
                    <li className={styles.li}>
                      <Link to="/about" aria-label="About EVS-SIP">
                        About EVS-SIP
                      </Link>
                    </li>
                    <li className={styles.li}>
                      <Link to="/datamodel" aria-label="Data Models">
                        Data Models
                      </Link>
                    </li>
                    <li className={styles.li}>
                      <Link to="/apidocs" aria-label="API EVS-SIP">
                        API EVS-SIP
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col xs={4}>
                  <h2 className={styles.title}>NIH Policies</h2>
                  <ul className={styles.ul}>
                    <li className={styles.li}>
                      <a href="https://www.cancer.gov/policies/disclaimer" target="_blank" rel="noopener noreferrer">
                        Disclaimer
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a href="https://www.cancer.gov/policies/accessibility" target="_blank" rel="noopener noreferrer">
                        Accessibility
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a href="https://www.cancer.gov/policies/foia" target="_blank" rel="noopener noreferrer">
                        FOIA
                      </a>
                    </li>
                    <li className={styles.li}>
                      <a
                        href="https://www.hhs.gov/vulnerability-disclosure-policy/index.html"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        HHS Vulnerability Disclosure
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <hr className={styles.hr} />
        <Row>
          <Col xs={12}>
            <div className={styles.caption}>
              <a href="http://www.hhs.gov/" target="_blank" rel="noopener noreferrer">
                U.S. Department of Health and Human Services
              </a>
              <span>|</span>
              <a href="http://www.nih.gov/" target="_blank" rel="noopener noreferrer">
                National Institutes of Health
              </a>
              <span>|</span>
              <a href="http://www.cancer.gov/" target="_blank" rel="noopener noreferrer">
                National Cancer Institute
              </a>
              <span>|</span>
              <a href="http://www.usa.gov/" target="_blank" rel="noopener noreferrer">
                USA.gov
              </a>
            </div>
            <div className={styles.copyright}>
              <span>NIH … Turning Discovery Into Health®</span>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
