import { configureStore } from '@reduxjs/toolkit'

import ddgraph from './components/GraphicalView/DataDictionary/reducers'
import submission from './components/GraphicalView/reducers'
import userReducer from './reducers/userSlice'
import searchReducer from './reducers/searchSlice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
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
