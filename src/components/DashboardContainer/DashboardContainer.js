import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './DashboardContainer.module.css';

import NavigationBoard from '../NavigationBoard/NavigationBoard'

const DashboardContainer = (props) => {
  return (
    <div className={styles.page}>
      <div className={styles.pagesContainer}>
        <div className={styles.titleContanier}>
          <h1 className={styles.pageTitle}>My Dashboard</h1>
        </div>
        <Container className={styles.container}>
          <Row>
            <Col sm={3}>
              <NavigationBoard/>
            </Col>
            <Col sm={9}>{props.children}</Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default DashboardContainer;
