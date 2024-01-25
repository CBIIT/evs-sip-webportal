import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styles from './NavigationBar.module.css'
import { baseServer } from '../../api'

/**
 * NavigationBar - Main layout NavigationBar component.
 * @component
 *
 * @returns {JSX.Element} The rendered NavigationBar component.
 */

const NavigationBar = () => {
  // Using useSelector to get the currentUser login from the User Redux store
  const currentUser = useSelector((state) => state.user.currentUser)
  // Extracting the 'authenticated' property from currentUser
  const isLoggedIn = currentUser.authenticated
  // useNavigate hook from React Router
  const navigate = useNavigate()

  return (
    <Navbar className={styles.navbar} bg="dark" role="navigation">
      <div className={styles.container}>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/search">
              Search
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link as={Link} to="/mainboard">
                Dashboard
              </Nav.Link>
            )}
            <NavDropdown className={styles.dropdown} title="Data Model">
              <NavDropdown.Item
                className={styles['dropdown-item']}
                onClick={() =>
                  navigate('/datamodel', {
                    state: {
                      fromDataModel: 'gdc',
                    },
                  })
                }
              >
                GDC
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles['dropdown-item']}
                onClick={() =>
                  navigate('/datamodel', {
                    state: {
                      fromDataModel: 'ctdc',
                    },
                  })
                }
              >
                CTDC
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles['dropdown-item']}
                onClick={() =>
                  navigate('/datamodel', {
                    state: {
                      fromDataModel: 'icdc',
                    },
                  })
                }
              >
                ICDC
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles['dropdown-item']}
                onClick={() =>
                  navigate('/datamodel', {
                    state: {
                      fromDataModel: 'pcdc',
                    },
                  })
                }
              >
                PCDC
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/apidocs">
              API
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            {isLoggedIn ? (
              <NavDropdown
                className={styles.dropdown}
                title={currentUser.user?.userid}
              >
                <div className={styles.subtitle}>Model Owner</div>
                <NavDropdown.Item
                  className={styles['dropdown-item']}
                  as={Link}
                  to="#"
                >
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={styles['dropdown-item']}
                  as={Link}
                  to="/mainboard"
                >
                  Dashboard
                </NavDropdown.Item>
                <NavDropdown.Item
                  href={`${baseServer}/auth/logout`}
                  className={styles['dropdown-item']}
                >
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <a
                href={`${baseServer}/auth/login`}
                target="_self"
                className="nav-link"
              >
                Login
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default NavigationBar
