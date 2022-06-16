
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"
import styles from "./SwaggerUIContainer.module.css"

import { baseHomeUrl } from '../../../api';

const SwaggerUIContainer = () => {
  return <div className={styles.box}>
      <SwaggerUI url={baseHomeUrl + '/api/swaggerjson/'}/>
  </div>
}

export default SwaggerUIContainer;
