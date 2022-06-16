import { Container, Row, Col } from 'react-bootstrap'
import styles from './Graph.module.css'

import graphImg from '../../../assets/img/graph-diagram.png'

const Graph = () => {
  return (
    <section className={styles.section}>
      <div className={styles['wrap-bkgd']}>
        <div className={styles.bkgd}>
          <div className={styles['bkgd-left']} />
          <div className={styles['bkgd-right']} />
        </div>
      </div>
      <Container className={styles.container}>
        <Row className={styles.row}>
          <Col xs={7}>
            <div className={styles.diagram}>
              <img className={styles['diagram-img']} alt="Graphic Background" src={graphImg} />
            </div>
          </Col>
          <Col xs={5}>
            <div className={styles['graph-container']}>
              <h2 className={styles['graph-title']}>
                The EVS Semantic Integration Platform supports standardization of vocabulary for the NCI Cancer Research
                Data Commons (CRDC) and beyond.
              </h2>
              <p className={styles['graph-paragraph']}>
                The EVS-SIP provides programmatic semantic tools to facilitate querying, downloading and submitting data
                and metadata.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Graph
