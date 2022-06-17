import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './DashboardContainer.module.css'

import NavigationBoard from '../NavigationBoard/NavigationBoard'

const DashboardContainer = ({ children }) => {
  return (
    <div className={styles.page}>
      <div className={styles['page-container']}>
        <div className={styles['title-container']}>
          <h1 className={styles.title}>My Dashboard</h1>
        </div>
        <Container className={styles.container}>
          <Row>
            <Col sm={3}>
              <NavigationBoard />
            </Col>
            <Col sm={9}>{children}</Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

DashboardContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardContainer
