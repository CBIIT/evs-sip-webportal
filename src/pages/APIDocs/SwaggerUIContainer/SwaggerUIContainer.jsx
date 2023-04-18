
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import styles from "./SwaggerUIContainer.module.css"

import { baseServer } from '../../../api';

const SwaggerUIContainer = () => {
  return <div className={styles.box}>
      <SwaggerUI url={baseServer + '/api/swagger/'}/>
  </div>
}

export default SwaggerUIContainer;
