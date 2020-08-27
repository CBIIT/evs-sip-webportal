import React from 'react';
import PropTypes from 'prop-types';
import ReduxDataDictionaryTable from './table/DataDictionaryTable';
import DataDictionaryGraph from './graph/DataDictionaryGraph/.';
import ReduxDictionarySearcher from './search/DictionarySearcher/.';
import ReduxDictionarySearchHistory from './search/DictionarySearchHistory/.';
import './DataDictionary.css';

class DataDictionary extends React.Component {
  constructor(props) {
    super(props);
    this.dictionarySearcherRef = React.createRef();
  }

  setGraphView = (isGraphView) => {
    this.props.onSetGraphView(isGraphView);
  };

  handleClickSearchHistoryItem = (keyword) => {
    this.dictionarySearcherRef.current.getWrappedInstance().launchSearchFromOutside(keyword);
  };

  handleClearSearchResult = () => {
    this.dictionarySearcherRef.current.getWrappedInstance().launchClearSearchFromOutside();
  };

  render() {
    return (
      <div className='data-dictionary'>
        <div
          className='data-dictionary__main'
        >
          <div className='data-dictionary__graph'>
            <DataDictionaryGraph
              onClearSearchResult={this.handleClearSearchResult} 
              graphType={this.props.graphType}
            />
          </div>
        </div>
      </div>
    );
  }
}

DataDictionary.propTypes = {
  onSetGraphView: PropTypes.func,
  isGraphView: PropTypes.bool,
  graphType: PropTypes.string,
};

DataDictionary.defaultProps = {
  onSetGraphView: () => {},
  isGraphView: false,
  graphType: "gdc",
};


export default DataDictionary;
