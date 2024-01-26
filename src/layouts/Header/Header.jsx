import { Link } from 'react-router-dom'
import styles from './Header.module.css'

// Import a footer logo asset
import logo from '@/assets/img/nih-evs-sip-logo-color.png'

/**
 * Header - Main layout Header component.
 * @component
 *
 * @returns {JSX.Element} The rendered Header component.
 */

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
