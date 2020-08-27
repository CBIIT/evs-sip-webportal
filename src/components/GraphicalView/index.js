import React, { Component } from 'react';
import ReduxDataDictionary from './DataDictionary';

const GraphicalView = (props) => {

  	let graphType = props.type;
	return (
	    <ReduxDataDictionary graphType={graphType}/>
	);
}

export default GraphicalView;