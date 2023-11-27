import { Container, Row, Col } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './DashboardContainer.module.css'

// import NavigationBoard from '../NavigationBoard/NavigationBoard'
import NavigationBoard from '../NavigationBoard/NavigationBoard'

const DashboardContainer = ({ children }) => {
  return (
    <>
      <NavigationBoard/>
      <div className={styles.page}>
        <div className={styles['page-container']}>
          <Container className={styles.container}>
            <Row>
            <div className={styles['title-container']}>
              <h1 className={styles.title}>My Dashboard</h1>
            </div>
            </Row>
            <Row>
              {/* <Col sm={3}>
                <NavigationBoard />
              </Col> */}
              <Col sm={12}>{children}</Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  )
}

DashboardContainer.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DashboardContainer
