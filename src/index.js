import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { apiGetGDCDictionary, apiGetICDCDictionary, apiGetCTDCDictionary  } from './api';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './pages/Search/reducers'
import $RefParser from "@apidevtools/json-schema-ref-parser";

const version = {"commit":"913161064b02bcef024d072873e77c8c79cc1a68","dictionary":{"commit":"520a25999fd183f6c5b7ddef2980f3e839517da5","version":"0.2.1-9-g520a259"},"version":"4.0.0-44-g9131610"};


async function init() {
  const store = createStore(reducers);

  let newDict = await apiGetGDCDictionary();

  let newDataList_icdc = await apiGetICDCDictionary();

  let newDataList_ctdc = await apiGetCTDCDictionary();

  await Promise.all(
    [
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_GDC',
        data: newDict
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_ICDC',
        data: newDataList_icdc
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_CTDC',
        data: newDataList_ctdc
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_GDC_READONLY',
        data: newDict
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_ICDC_READONLY',
        data: newDataList_icdc
      }),
      store.dispatch({
        type: 'RECEIVE_DICTIONARY_CTDC_READONLY',
        data: newDataList_ctdc
      }),
      store.dispatch({
        type: 'RECEIVE_VERSION_INFO',
        data: version
      })
    ],
  );

  ReactDOM.render(
    
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}


init();


serviceWorker.unregister();
