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

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_KEYWORD':
      return {
        ...state,
        keyword: action.payload,
      }
    case 'SET_RESULT':
      return {
        ...state,
        result: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    case 'SET_MATCH_OPTIONS':
      return {
        ...state,
        match: action.payload,
      }
    case 'SET_OPTIONS_SEARCH':
      return {
        ...state,
        options: action.payload,
      }
    case 'SET_DATA_SOURCES':
      return {
        ...state,
        dataSources: action.payload,
      }
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchTerm: action.payload,
      }
    case 'IS_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      }
    case 'IS_SERCHING':
      return {
        ...state,
        isSearching: action.payload,
      }
    default:
      return state
  }
}

export default searchReducer
