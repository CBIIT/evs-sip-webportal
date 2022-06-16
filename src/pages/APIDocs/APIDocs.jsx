import { useEffect } from 'react';
import styles from './APIDocs.module.css'

import SwaggerUIContainer from './SwaggerUIContainer/SwaggerUIContainer';

const APIDocs = () => {
  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  return <div className={styles.page}>
    <div className={styles.container}>
      <div className={styles.title}>EVSSIP RESTful API</div>
      <SwaggerUIContainer/>
    </div>
  </div>
}

export default APIDocs;
