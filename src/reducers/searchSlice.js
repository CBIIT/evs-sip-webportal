import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  keyword: '',
  match: 'partial',
  options: {
    desc: false,
    syns: false,
    npsyns: false,
  },
  dataSources: {
    ctdc: false,
    gdc: false,
    icdc: false,
    pcdc: false,
  },
  result: {},
  searchTerm: '',
  error: false,
  isLoading: false,
  isSerching: false,
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload
    },
    setResult: (state, action) => {
      state.result = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setMatchOptions: (state, action) => {
      state.match = action.payload
    },
    setOptionsSearch: (state, action) => {
      state.options = action.payload
    },
    setDataSources: (state, action) => {
      state.dataSources = action.payload
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsSearching: (state, action) => {
      state.isSearching = action.payload
    },
  },
})

export const {
  setKeyword,
  setResult,
  setError,
  setMatchOptions,
  setOptionsSearch,
  setDataSources,
  setSearchTerm,
  setIsLoading,
  setIsSearching,
} = searchSlice.actions

export default searchSlice.reducer