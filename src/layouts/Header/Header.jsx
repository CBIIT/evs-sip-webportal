import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import logo from '../../assets/img/nih-evs-sip-logo-color.png'

const Header = () => {
  return (
    <div className={styles.header} role="banner">
      <Link to="/">
        <img className={styles.logo} src={logo} alt="logo" />
      </Link>
    </div>
  )
}

export default Header
