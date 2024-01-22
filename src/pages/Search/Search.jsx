import React from 'react';
import styles from './Search.module.css';

import SearchBox from './SearchBox/SearchBox';
import MainTabsController from './MainTabsController/MainTabsController';

const Search = (props) => {
  return <div className={styles['page']}>
    <h1 className={styles['page-title']}>Search EVS-SIP</h1>
    <SearchBox />
    <MainTabsController/>
  </div>;
}

export default Search
