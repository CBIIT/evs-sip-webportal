import { combineReducers } from 'redux';

import ddgraph from './DataDictionary/reducers';

export const getFileNodes = dictionary => Object.keys(dictionary).filter(node => dictionary[node].category === 'data_file');
export const getNodeTypes = dictionary => Object.keys(dictionary).filter(node => node.charAt(0) !== '_');

const versionInfo = (state = {}, action) => {
    switch (action.type) {
    case 'RECEIVE_VERSION_INFO':
        return { ...state,
        dictionaryVersion: action.data.dictionary.version || 'unknown',
        apiVersion: action.data.version || 'unknown',
        };
    default:
        return state;
    }
};

const excludeSystemProperties = (node) => {
    const properties = node.properties && Object.keys(node.properties)
        .filter(key => (node.systemProperties ? !node.systemProperties.includes(key) : true))
        .reduce((acc, key) => {
        acc[key] = node.properties[key];
        return acc;
        }, {});
    return properties;
};

const getDictionaryWithExcludeSystemProperties = (dictionary) => {
    const ret = Object.keys(dictionary)
        .map((nodeID) => {
        const node = dictionary[nodeID];
        if (!node.properties) return node;
        return {
            ...node,
            properties: excludeSystemProperties(node),
        };
        })
        .reduce((acc, node) => {
        acc[node.id] = node;
        return acc;
        }, {});
    return ret;
};

const submission = (state = {}, action) => {
  switch (action.type) {
  case 'RECEIVE_DICTIONARY_GDC':
    return { ...state,
      dictionary_gdc: getDictionaryWithExcludeSystemProperties(action.data),
    };
  case 'RECEIVE_DICTIONARY_ICDC':
    return { ...state,
      dictionary_icdc: getDictionaryWithExcludeSystemProperties(action.data),
    };
  case 'RECEIVE_DICTIONARY_CTDC':
    return { ...state,
      dictionary_ctdc: getDictionaryWithExcludeSystemProperties(action.data),
    };
  case 'RECEIVE_DICTIONARY_GDC_READONLY':
    return { ...state,
      dictionary_gdc_readonly: getDictionaryWithExcludeSystemProperties(action.data),
    };
  case 'RECEIVE_DICTIONARY_ICDC_READONLY':
    return { ...state,
      dictionary_icdc_readonly: getDictionaryWithExcludeSystemProperties(action.data),
    };
  case 'RECEIVE_DICTIONARY_CTDC_READONLY':
    return { ...state,
      dictionary_ctdc_readonly: getDictionaryWithExcludeSystemProperties(action.data),
    };
  default:
    return state;
  }
};

const reducers = combineReducers({ 
   submission,
   ddgraph,
   versionInfo
});

export default reducers;
