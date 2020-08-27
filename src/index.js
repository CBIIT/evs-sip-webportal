import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { apiGetGDCDictionary, apiGetICDCDictionary, apiGetCTDCDictionary  } from './api';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import reducers from './components/GraphicalView/reducers'

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
