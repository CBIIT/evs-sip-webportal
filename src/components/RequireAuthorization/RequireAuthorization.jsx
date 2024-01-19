import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Unauthorized from '../Unauthorized/Unauthorized'

const RequireAuthorization = ({ children }) => {
  const currentUser = useSelector((state) => state.currentUser)
  const isLoggedIn = currentUser.authenticated

  return isLoggedIn ? <>{children}</> : <Unauthorized />
}

RequireAuthorization.propTypes = {
  children: PropTypes.element.isRequired,
}

export default RequireAuthorization
