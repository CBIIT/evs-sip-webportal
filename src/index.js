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
