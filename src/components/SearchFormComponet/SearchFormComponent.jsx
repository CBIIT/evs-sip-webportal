import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './SearchFormComponent.module.css'

const SearchFormComponent = ({ submitSearch }) => {
  return (
    <Form className={styles.form} onSubmit={submitSearch}>
      <Form.Group className={styles.formGroup} role="form">
        <Form.Control type="text" placeholder="Search" aria-label="Search" className={styles.formControl} />
        <Button type="submit" className={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form.Group>
    </Form>
  )
}

SearchFormComponent.propTypes = {
  submitSearch: PropTypes.func.isRequired,
}

export default SearchFormComponent
