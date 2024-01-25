import { Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styles from './NavigationBoard.module.css'
import { baseServer } from '../../api'

/**
 * NavigationBoard - A Navigation Board Menu component for Dashboard.
 * @component
 *
 * @returns {JSX.Element} The rendered React NavigationBoard component.
 */

const NavigationBoard = () => {
  return (
    <aside className={styles.aside}>
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link className={styles['nav-link']} as={Link} to="/modelbuilder">
            Model Builder
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link className={styles['nav-link']} as={Link} to="/changereport">
            Change Report
          </Nav.Link>
        </Nav.Item>
        <NavDropdown
          className={styles['nav-dropdown']}
          title="Published Data Sources"
          id="nav-dropdow-published"
          onClick={(e) => {
            e.target.href = ''
          }}
          renderMenuOnMount
        >
          <NavDropdown.Item
            className={styles['nav-dropdown-item']}
            as={Link}
            to="/mainboard/gdc"
          >
            GDC
          </NavDropdown.Item>
          <NavDropdown.Item
            className={styles['nav-dropdown-item']}
            as={Link}
            to="/mainboard/ctdc"
          >
            CTDC
          </NavDropdown.Item>
          <NavDropdown.Item
            className={styles['nav-dropdown-item']}
            as={Link}
            to="/mainboard/icdc"
          >
            ICDC
          </NavDropdown.Item>
          <NavDropdown.Item
            className={styles['nav-dropdown-item']}
            as={Link}
            to="/mainboard/pcdc"
          >
            PCDC
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown
          className={styles['nav-dropdown']}
          title="Unpublished Data Sources"
          id="nav-dropdown-unpublished"
          onClick={(e) => {
            e.target.href = ''
          }}
          renderMenuOnMount
        >
          <NavDropdown.Item
            className={styles['nav-dropdown-item']}
            as={Link}
            to="/mainboard"
          >
            PDC
          </NavDropdown.Item>
          <NavDropdown.Item
            className={styles['nav-dropdown-item']}
            as={Link}
            to="/mainboard"
          >
            IDC
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Item>
          <Nav.Link
            className={styles['nav-link']}
            as={Link}
            to="/usermanagement"
          >
            User Management
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            href={`${baseServer}/auth/logout`}
            className={styles['nav-link']}
          >
            Sign Out
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </aside>
  )
}

export default NavigationBoard
