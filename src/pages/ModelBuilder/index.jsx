import React from 'react';
import { Button, Table, Pagination, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './index.module.css';

import DashboardContainer from '../../components/DashboardContainer/DashboardContainer';


const ModelBuilder = (props) => {

  return (
    <DashboardContainer>
      <div className={styles['section-container']}>
        <div className={styles['section-header']}>
          <h2 className={styles['section-title']}>Model Builder</h2>
          <div>
            <Button className={styles['button-blue']}>Create Model</Button>
          </div>
        </div>
        <div className={styles['table-container']}>

          <InputGroup className={styles['input-group-styled']}>
            <FormControl
              className={styles['form-control-styled']}
              type="text"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="btnGroupAddon"
            />
            <InputGroup.Text className={styles['input-group-styled']} id="btnGroupAddon">
              <FontAwesomeIcon className={styles['input-group-icon']} icon={faSearch} />
            </InputGroup.Text>
          </InputGroup>
          <Table bordered>
            <thead>
              <tr>
                <th>Model Name</th>
                <th>Description</th>
                <th>Created By</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GDC 2.3.0</td>
                <td>Model 1</td>
                <td>Otto</td>
                <td>6/15/2020</td>
              </tr>
              <tr>
                <td>Model 1</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>6/15/2020</td>
              </tr>
              <tr>
                <td>ICDC</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
                <td>6/15/2020</td>
              </tr>
              <tr>
                <td>PCDC</td>
                <td>Larry the Bird</td>
                <td>Thornton</td>
                <td>6/15/2020</td>
              </tr>
            </tbody>
          </Table>
          <div className={styles['pagination-container']}>
            <Pagination>
              <Pagination.First />
              <Pagination.Item active>{1}</Pagination.Item>
              <Pagination.Item>{2}</Pagination.Item>
              <Pagination.Item>{3}</Pagination.Item>
              <Pagination.Item>{4}</Pagination.Item>
              <Pagination.Item>{5}</Pagination.Item>
              <Pagination.Last />
            </Pagination>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
}

export default ModelBuilder;
