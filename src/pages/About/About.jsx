import { useEffect } from 'react'
import styles from './About.module.css'

import Description from './Description/Description'
import DataSources from './DataSources/DataSources'
import Integrate from './Integrate/Integrate'
import Contacts from './Contacts/Contacts'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>About</h1>
        <Description />
        <DataSources />
        <Integrate />
        <Contacts />
      </div>
    </div>
  )
}

export default About
