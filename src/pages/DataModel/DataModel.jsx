import { useEffect, useState } from 'react';
import styles from './DataModel.module.css'
import { useLocation } from 'react-router-dom'
import TabsController from './TabsController/TabsController'

const DataModel = (props) => {

  const [model, setModel] = useState('gdc');
  const [fromModel, setfromModel] = useState('gdc');
  const location = useLocation();
  const state = location?.state || 'gdc';

  useEffect(()=> {
    window.scrollTo(0, 0);
  });

  if(state?.fromDataModel !== undefined && state.fromDataModel !== fromModel){
    setfromModel(state.fromDataModel);
    setModel(state.fromDataModel);
  }

  return <div className={styles.page}>
    <div className={styles.container}>
      <h1 className={styles.title}>Data Model</h1>
      <TabsController dataModel={model} setDataModel={setModel}/>
    </div>
  </div>
}

export default DataModel;
