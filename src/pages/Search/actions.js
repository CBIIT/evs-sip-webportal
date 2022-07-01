export const setKeyword = keyword => ({
  type: 'SET_KEYWORD',
  payload: keyword
});

export const setResult = result => ({
  type: 'SET_RESULT',
  payload: result
});

export const setError = error => ({
  type: 'SET_ERROR',
  payload: error
});

export const setMatchOptions = match => ({
  type: 'SET_MATCH_OPTIONS',
  payload: match
});

export const setOptionsSearch = options => ({
  type: 'SET_OPTIONS_SEARCH',
  payload: options
});

export const setDataSources = dataSources => ({
  type: 'SET_DATA_SOURCES',
  payload: dataSources
});

export const setSearchTerm = searchTerm => ({
  type: 'SET_SEARCH_TERM',
  payload: searchTerm
});

export const setIsLoading = isLoading => ({
  type: 'IS_LOADING',
  payload: isLoading
});

export const setIsSearching = isSearching => ({
  type: 'IS_SERCHING',
  payload: isSearching
});
