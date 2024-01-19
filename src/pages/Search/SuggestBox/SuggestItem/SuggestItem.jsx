import PropTypes from 'prop-types'
import styles from './SuggestItem.module.css'

const SuggestItem = (props) => {
  return (
    <div
      onClick={(e) => props.suggestClick(props.item.id, e)}
      className={`${styles.object}${props.index === props.selected ? ' selected' : ''}`}
    >
      <div className={styles.name}>{props.item.id}</div>
      <div className={styles.type}>{props.item.type.join(', ')}</div>
    </div>
  )
}

SuggestItem.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
  selected: PropTypes.number,
  suggestClick: PropTypes.func.isRequired,
}

export default SuggestItem
