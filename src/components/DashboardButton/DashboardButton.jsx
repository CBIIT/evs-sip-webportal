import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import styles from './DashboardButton.module.css'

const DashboardButton = (props) => {
  return (
    <Button className={`${styles.button} ${props.className}`} onClick={props.onClick}>
      {props.children}
    </Button>
  )
}

DashboardButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default DashboardButton
