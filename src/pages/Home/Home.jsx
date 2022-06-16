import { useEffect } from 'react';
import styles from './Home.module.css';
import Search from './Search';
import Graph from './Graph/Graph';
import Tools from './Tools/Tools'

const Home = () => {
  return <div className={styles.home}>
      <Search></Search>
      <Graph></Graph>
      <Tools></Tools>
    </div>;
}

export default Home;
