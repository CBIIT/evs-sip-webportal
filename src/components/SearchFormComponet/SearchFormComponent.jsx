import { Form, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { SearchIcon } from '../ui/icons/Icons'
import styles from './SearchFormComponent.module.css'

const SearchFormComponent = ({ submitSearch }) => {
  return (
    <Form className={styles.form} onSubmit={submitSearch}>
      <Form.Group className={styles.formGroup} role="form">
        <Form.Control type="text" placeholder="Search" aria-label="Search" className={styles.formControl} />
        <Button type="submit" className={styles.searchButton}>
          <SearchIcon />
        </Button>
      </Form.Group>
    </Form>
  )
}

SearchFormComponent.propTypes = {
  submitSearch: PropTypes.func.isRequired,
}

export default SearchFormComponent
