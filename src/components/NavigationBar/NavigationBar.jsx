import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styles from './NavigationBar.module.css'
import { baseServer } from '../../api'
import { setUser } from '../../reducers/currentUser'

const NavigationBar = () => {
  const currentUser = useSelector((state) => state.currentUser)
  //const isLoggedIn = Object.keys(currentUser).length > 0 && !currentUser.error && currentUser.authenticated
  const isLoggedIn = currentUser.authenticated;
  const dispatch = useDispatch()

  // const login = e => {
  //   e.preventDefault();
  //   dispatch(setUser({name: ''}));
  // }

  const logout = async (e) => {
    e.preventDefault()
    dispatch(setUser({}))
    // can not use normal 301 response, since session is not properly cleared
    const response = await fetch(`${baseServer}/auth/logout`)
    window.location.href = response.url;
  }

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
                as={Link}
                to={{
                  pathname: '/datamodel',
                  state: {
                    fromDataModel: 'gdc',
                  },
                }}
              >
                GDC
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles['dropdown-item']}
                as={Link}
                to={{
                  pathname: '/datamodel',
                  state: {
                    fromDataModel: 'ctdc',
                  },
                }}
              >
                CTDC
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles['dropdown-item']}
                as={Link}
                to={{
                  pathname: '/datamodel',
                  state: {
                    fromDataModel: 'icdc',
                  },
                }}
              >
                ICDC
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles['dropdown-item']}
                as={Link}
                to={{
                  pathname: '/datamodel',
                  state: {
                    fromDataModel: 'pcdc',
                  },
                }}
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
            {
              isLoggedIn || currentUser.authenticated ? (
                <NavDropdown className={styles.dropdown} title={`user: ${currentUser.user.userid}`}>
                  <div className={styles.subtitle}>Model Owner</div>
                  <NavDropdown.Item className={styles['dropdown-item']} as={Link} to="#">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles['dropdown-item']} as={Link} to="/mainboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item className={styles['dropdown-item']} onClick={logout}>
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <a href={`${baseServer}/auth/login`} target="_self" className="nav-link">
                  Login
                </a>
              )
              // <a href='/#' onClick={login} target="_self" className="nav-link">Login</a>
            }
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  )
}

export default NavigationBar
