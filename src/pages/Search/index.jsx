import React from 'react';
import styles from './index.module.css';

import ReduxSearchBox from './SearchBox';
import ReduxMainTabsController from './MainTabsController';

const Search = (props) => {
  return <div className={styles['page']}>
    <h1 className={styles['page-title']}>Search EVS-SIP</h1>
    <ReduxSearchBox />
    <ReduxMainTabsController/>
  </div>;
}

export default Search;
