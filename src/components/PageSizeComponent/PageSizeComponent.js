import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './PageSizeComponent.module.css';

const PageSizeComponent = props => {
  return(
    <div>
      <Form.Label className={styles.label}>Page Size:</Form.Label>
      <Form.Control className={styles.control} as="select" value={props.pageSize[props.type]} onChange={props.pageSizeChange}>
        <option value="3">3</option>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </Form.Control>
    </div>
  )
}

export default PageSizeComponent;