import PropTypes from 'prop-types'

/**
 * Layout - Main Layout component to the website.
 * @component
 *
 * @param {React.ReactNode} props.children - The componet to be rendered as children.
 *
 * @returns {JSX.Element} The rendered Layout React component.
 */

const Layout = ({ children }) => {
  return <div role="main">{children}</div>
}

// PropTypes for Layout
Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
