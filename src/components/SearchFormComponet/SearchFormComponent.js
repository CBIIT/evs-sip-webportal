import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchFormComponent.module.css';

const SearchFormComponent = ({submitSearch}) => {
  return(
    <Form className={styles.form} onSubmit={submitSearch}>
      <Form.Group className={styles.formGroup} role="form">
        <Form.Control 
          type="text"
          placeholder="Search"
          aria-label="Search"
          className={styles.formControl}
        />
        <Button type="submit" className={styles.searchButton}><FontAwesomeIcon icon={faSearch}/></Button>
      </Form.Group>
    </Form>
  )
}

export default SearchFormComponent;