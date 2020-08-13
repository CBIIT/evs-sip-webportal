import React, { Component } from 'react';
import ReduxDataDictionary from './DataDictionary';


class GraphicalView_D3 extends Component {

	constructor(props){
		super(props);
		
	}

	render() {
		let graphType = this.props.type;
		return (
		    <ReduxDataDictionary graphType={graphType}/>
		);
	}

}

export default GraphicalView_D3;