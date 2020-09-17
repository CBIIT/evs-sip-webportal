const baseUrl = './api/search';
//const baseUrl = 'http://localhost:3000/api/search';

export const apiSuggest = async keyword => {
  const response = await fetch(`${baseUrl}/suggest?keyword=${keyword}`);
  return response.json();
};

export const apiSearchAll = async(keyword, options, dataSources) => {
  const opts = `${options.match === true ? `exact` : `partial`}${options.syns === true ? `,syn` : ``}${options.desc === true ? `,desc` : ``}`;
  let sources = [];
  for(let key in dataSources){
    if(dataSources[key]){
      sources.push(key);
    }
  }
  const response = await fetch(`${baseUrl}/all/p?keyword=${keyword}&options=${opts}&sources=${sources.join()}`);
  return response.json();
};

export const apiGetGDCDataById = async(id) => {
  const response = await fetch(`${baseUrl}/p/local/vs?id=${id}`);
  return response.json();
};

export const apiGraphicalSearch = async(keyword, options, dataSources) => {
  const opts = `${options.match === true ? `exact` : `partial`}${options.syns === true ? `,syn` : ``}${options.desc === true ? `,desc` : ``}`;
  let sources = [];
  for(let key in dataSources){
    if(dataSources[key]){
      sources.push(key);
    }
  }
  const response = await fetch(`${baseUrl}/graph/search?keyword=${keyword}&options=${opts}&sources=${sources.join()}`);
  return response.json();
};

export const apiGetGDCDictionary = async() => {
  const response = await fetch(`${baseUrl}/graph/gdc`);
  return response.json();
};

export const apiGetICDCDictionary = async() => {
  const response = await fetch(`${baseUrl}/graph/icdc`);
  return response.json();
};

export const apiGetCTDCDictionary = async() => {
  const response = await fetch(`${baseUrl}/graph/ctdc`);
  return response.json();
};

export const apiGetPropertyValues = async(id) => {
  const response = await fetch(`${baseUrl}/graph/p/vs?id=${id}`);
  return response.json();
};

