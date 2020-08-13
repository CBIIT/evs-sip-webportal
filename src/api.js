//const baseUrl = 'http://localhost:3000/api/search';
const baseUrl = 'https://gdc-mvs-dev.nci.nih.gov/gdc/search';

export const apiSuggest = async keyword => {
  const response = await fetch(`${baseUrl}/suggest?keyword=${keyword}`);
  return response.json();
};

export const apiSearchAll = async(keyword, options) => {
  const opts = `${options.match === true ? `exact` : `partial`}${options.syns === true ? `,syn` : ``}${options.desc === true ? `,desc` : ``}`;
  const response = await fetch(`${baseUrl}/all/p?keyword=${keyword}&options=${opts}`);
  return response.json();
};

export const apiGetGDCDataById = async(id) => {
  const response = await fetch(`${baseUrl}/p/local/vs?id=${id}`);
  return response.json();
};

export const apiGetGDCDictionary = async(keyword) => {
  const response = await fetch(`http://localhost:3000/api/search/graph/gdc`);
  return response.json();
};

export const apiGetICDCDictionary = async(keyword) => {
  const response = await fetch(`http://localhost:3000/api/search/graph/icdc`);
  return response.json();
};

export const apiGetCTDCDictionary = async(keyword) => {
  const response = await fetch(`http://localhost:3000/api/search/graph/ctdc`);
  return response.json();
};
