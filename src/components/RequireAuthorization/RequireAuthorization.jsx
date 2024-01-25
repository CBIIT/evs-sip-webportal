import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Unauthorized from '../Unauthorized/Unauthorized'

/**
 * RequireAuthorization - A Require Authorization React component that check the user authentication.
 * @component
 *
 * @param {React.ReactNode} props.children - The restrict content to be rendered as children.
 *
 * @returns {JSX.Element} The rendered React component.
 */

const RequireAuthorization = ({ children }) => {
  // Using useSelector to get the currentUser login from the User Redux store
  const currentUser = useSelector((state) => state.user.currentUser)

  // Extracting the 'authenticated' property from currentUser
  const isLoggedIn = currentUser?.authenticated

  return isLoggedIn ? <>{children}</> : <Unauthorized />
}

// PropTypes for RequireAuthorization
RequireAuthorization.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RequireAuthorization
