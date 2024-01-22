import PropTypes from 'prop-types'

const Layout = ({ children }) => <div role="main">{children}</div>

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
