import { configureStore } from '@reduxjs/toolkit'

import ddgraph from './components/GraphicalView/DataDictionary/reducers'
import submission from './components/GraphicalView/reducers'
import currentUser from './reducers/currentUser'
import searchReducer from './reducers/searchSlice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    currentUser,
    ddgraph,
    submission,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export default store
