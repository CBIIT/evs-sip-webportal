export const baseUrl = import.meta.env.EVSSIP_SEARCH || 'http://localhost:3000/service/search'
export const baseServer = import.meta.env.EVSSIP_SERVER || 'http://localhost:3000'
export const baseHomeUrl = import.meta.env.EVSSIP_HOME_URL || 'http://localhost:3000'

export const apiSuggest = async (keyword) => {
  const encodedKeyword = keyword.replace(/\+/g, '%2B').replace(/&/g, '%26')
  const response = await fetch(`${baseUrl}/suggest?keyword=${encodedKeyword}`)
  return await response.json()
}

export const apiSearchAll = async (keyword, match, options, dataSources) => {
  const opts = `${match}${options.syns === true ? ',syn' : ''}${options.p_syns === true ? ',n_syn,p_syn' : ''}${
    options.desc === true ? ',desc' : ''
  }`
  const sources = []
  for (const key in dataSources) {
    if (dataSources[key]) {
      sources.push(key)
    }
  }
  const encodedKeyword = keyword.replace(/\+/g, '%2B').replace(/&/g, '%26')
  const response = await fetch(`${baseUrl}/all/p?keyword=${encodedKeyword}&options=${opts}&sources=${sources.join()}`)
  return await response.json()
}

export const apiGetGDCDataById = async (id) => {
  const response = await fetch(`${baseUrl}/p/local/vs?id=${id}`)
  return response.json()
}

export const apiGetGDCDictionary = async () => {
  const response = await fetch(`${baseUrl}/graph/gdc`)
  return response.json()
}

export const apiGetICDCDictionary = async () => {
  const response = await fetch(`${baseUrl}/graph/icdc`)
  return response.json()
}

export const apiGetCTDCDictionary = async () => {
  const response = await fetch(`${baseUrl}/graph/ctdc`)
  return response.json()
}

export const apiGetPCDCDictionary = async (project) => {
  const p = project === undefined ? '' : project
  const response = await fetch(`${baseUrl}/graph/pcdc?project=${p}`)
  return response.json()
}

export const apiGetPropertyValues = async (id) => {
  const response = await fetch(`${baseUrl}/graph/p/vs?id=${id}`)
  return response.json()
}

// Reports API's
export const compareAllWithGDCDictionary = async (type = 'all', page = '1', pageSize = '25', search = '') => {
  const response = await fetch(
    `${baseUrl}/compareAllWithGDCDictionary?type=${type}&page=${page}&pageSize=${pageSize}&searchText=${search}`
  )
  return response.json()
}

export const exportCompareResult = async (type = 'all', search = '') => {
  const response = await fetch(`${baseUrl}/exportCompareResult?type=${type}&searchText=${search}`)
  return response.blob()
}

export const exportAllCompareResult = async () => {
  const response = await fetch(`${baseUrl}/exportAllCompareResult`)
  return response.blob()
}
