import { createSlice } from '@reduxjs/toolkit';

//import { combineReducers } from 'redux';

//import ddgraph from './DataDictionary/reducers';

export const getFileNodes = dictionary => Object.keys(dictionary).filter(node => dictionary[node].category === 'data_file');
export const getNodeTypes = dictionary => Object.keys(dictionary).filter(node => node.charAt(0) !== '_');

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

const initialState = {
    dictionary_gdc: null,
    dictionary_icdc: null,
    dictionary_ctdc: null,
    dictionary_pcdc: null,
    dictionary_gdc_readonly: null,
    dictionary_icdc_readonly: null,
    dictionary_ctdc_readonly: null,
    dictionary_pcdc_readonly: null,
};

const dictionarySlice = createSlice({
    name: 'dictionary',
    initialState,
    reducers: {
        receiveDictionaryGDC: (state, action) => {
            state.dictionary_gdc = getDictionaryWithExcludeSystemProperties(action.payload);
        },
        receiveDictionaryICDC: (state, action) => {
            state.dictionary_icdc = getDictionaryWithExcludeSystemProperties(action.payload);
        },
        receiveDictionaryCTDC: (state, action) => {
            state.dictionary_ctdc = getDictionaryWithExcludeSystemProperties(action.payload);
        },
        receiveDictionaryPCDC: (state, action) => {
            state.dictionary_pcdc = action.payload;
        },
        receiveDictionaryGDCReadonly: (state, action) => {
            state.dictionary_gdc_readonly = getDictionaryWithExcludeSystemProperties(action.payload);
        },
        receiveDictionaryICDCReadonly: (state, action) => {
            state.dictionary_icdc_readonly = getDictionaryWithExcludeSystemProperties(action.payload);
        },
        receiveDictionaryCTDCReadonly: (state, action) => {
            state.dictionary_ctdc_readonly = getDictionaryWithExcludeSystemProperties(action.payload);
        },
        receiveDictionaryPCDCReadonly: (state, action) => {
            state.dictionary_pcdc_readonly = action.payload;
        },
    },
});

export const {
    receiveDictionaryGDC,
    receiveDictionaryICDC,
    receiveDictionaryCTDC,
    receiveDictionaryPCDC,
    receiveDictionaryGDCReadonly,
    receiveDictionaryICDCReadonly,
    receiveDictionaryCTDCReadonly,
    receiveDictionaryPCDCReadonly,
} = dictionarySlice.actions;

export default dictionarySlice.reducer;

