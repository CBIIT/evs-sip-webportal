import { configureStore } from '@reduxjs/toolkit'

import dataDictionaryReducer from './components/GraphicalView/DataDictionary/reducers'
import dictionaryReducer from './components/GraphicalView/reducers'
import userReducer from './reducers/userSlice'
import searchReducer from './reducers/searchSlice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    user: userReducer,
    dataDictionary: dataDictionaryReducer,
    dictionary: dictionaryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
      immutableCheck: false,
    }),
})

export default store
