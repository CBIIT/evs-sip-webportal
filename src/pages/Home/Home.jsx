import Search from './Search/Search'
import Graph from './Graph/Graph'
import Tools from './Tools/Tools'

import styles from './Home.module.css'

const Home = () => {
  return (
    <div className={styles.home}>
      <Search></Search>
      <Graph></Graph>
      <Tools></Tools>
    </div>
  )
}

export default Home
