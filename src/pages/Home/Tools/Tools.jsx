import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import styles from './Tools.module.css'
import {
  DataCommonsIcon,
  SemanticIntegrationIcon,
  ToolsIcon,
  SupportIcon,
} from './Icons/Icons'

const Tools = () => {
  return (
    <section className={styles.section}>
      <Container className={styles.container}>
        <Row className={styles.row}>
          <Col xs={9}>
            <div className={styles.tools}>
              <div className={styles['tools-container']}>
                <div className={styles.toolbox}>
                  <div className={styles['toolbox-container']}>
                    <DataCommonsIcon className={styles['toolbox-icon']} />
                    <div className={styles['toolbox-title-container']}>
                      <strong className={styles['toolbox-title']}>
                        Data Commons
                      </strong>
                    </div>
                  </div>

                  <div className={styles['toolbox-link-container']}>
                    <Link
                      className={`btn ${styles['toolbox-link']}`}
                      to="/datamodel"
                      aria-label="Read More About Data Commons"
                      title="Read More About Data Commons"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
                <div className={styles.toolbox}>
                  <div className={styles['toolbox-container']}>
                    <SemanticIntegrationIcon
                      className={styles['toolbox-icon']}
                    />
                    <div className={styles['toolbox-title-container']}>
                      <strong className={styles['toolbox-title']}>
                        Semantic Integration
                      </strong>
                    </div>
                  </div>
                  <div className={styles['toolbox-link-container']}>
                    <Link
                      className={`btn ${styles['toolbox-link']}`}
                      to="/about"
                      aria-label="Read More About Semantic Integration"
                      title="Read More About Semantic Integration"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
                <div className={styles.toolbox}>
                  <div className={styles['toolbox-container']}>
                    <ToolsIcon className={styles['toolbox-icon']} />
                    <div className={styles['toolbox-title-container']}>
                      <strong className={styles['toolbox-title']}>Tools</strong>
                    </div>
                  </div>
                  <div className={styles['toolbox-link-container']}>
                    <Link
                      className={`btn ${styles['toolbox-link']}`}
                      to="/about"
                      aria-label="Read More About Tools"
                      title="Read More About Tools"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
                <div className={styles.toolbox}>
                  <div className={styles['toolbox-container']}>
                    <SupportIcon className={styles['toolbox-icon']} />
                    <div className={styles['toolbox-title-container']}>
                      <strong className={styles['toolbox-title']}>
                        Support
                      </strong>
                    </div>
                  </div>
                  <div className={styles['toolbox-link-container']}>
                    <Link
                      className={`btn ${styles['toolbox-link']}`}
                      to="/about"
                      aria-label="Read More About Support"
                      title="Read More About Support"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className={styles['tools-title-container']}>
              <h2 className={styles['tools-title']}>Data Transfer Tools</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Tools
