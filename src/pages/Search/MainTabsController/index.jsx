import { connect } from 'react-redux'
import MainTabsController from './MainTabsController'

const ReduxMainTabsController = (() => {
  const mapStateToProps = (state) => ({
    searchTerm: state.searchReducer.searchTerm,
    result: state.searchReducer.result,
    error: state.searchReducer.error,
  })

  return connect(mapStateToProps)(MainTabsController)
})()

export default ReduxMainTabsController
