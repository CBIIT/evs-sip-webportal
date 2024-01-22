import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './SuggestBox.module.css'
import SuggestItem from './SuggestItem/SuggestItem'

const SuggestBox = (props) => {
  const node = useRef()

  useEffect(() => {
    const clickHandler = (event) => {
      // click inside component
      if (node.current?.contains(event.target)) return
      // click ooutside component
      props.cleanSuggest()
    }

    document.body.addEventListener('click', clickHandler)
    return () => document.body.removeEventListener('click', clickHandler)
  }, [props])

  return (
    <div className={styles.suggest}>
      <div
        className={styles.content}
        ref={node}
        style={props.suggest.length === 0 ? {} : { display: 'block' }}
      >
        {props.suggest.length !== 0 &&
          props.suggest.map((item, index) => (
            <SuggestItem
              item={item}
              key={index}
              suggestClick={props.suggestClick}
              index={index}
              selected={props.suggestSelected}
            />
          ))}
      </div>
    </div>
  )
}

SuggestBox.propTypes = {
  suggest: PropTypes.array,
  cleanSuggest: PropTypes.func.isRequired,
  suggestClick: PropTypes.func.isRequired,
  suggestSelected: PropTypes.number,
}

export default SuggestBox
