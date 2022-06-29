import { combineReducers } from 'redux'

import ddgraph from '../components/GraphicalView/DataDictionary/reducers'
import submission from '../components/GraphicalView/reducers'
import currentUser from './currentUser'
import searchReducer from './searchReducer'

const rootReducer = combineReducers({
  searchReducer,
  currentUser,
  ddgraph,
  submission,
})

export default rootReducer