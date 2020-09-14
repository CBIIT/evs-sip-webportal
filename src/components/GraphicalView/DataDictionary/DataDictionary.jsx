import React from 'react';
import PropTypes from 'prop-types';
import ReduxDataDictionaryTable from './table/DataDictionaryTable';
import DataDictionaryGraph from './graph/DataDictionaryGraph/.';
import ReduxDictionarySearcher from './search/DictionarySearcher/.';
import ReduxDictionarySearchHistory from './search/DictionarySearchHistory/.';
import { apiGraphicalSearch, apiGetGDCDictionary, apiGetICDCDictionary, apiGetCTDCDictionary  } from '../../../api';
import { prepareSearchData, searchKeyword, getSearchSummary, ZERO_RESULT_FOUND_MSG } from './search/DictionarySearcher/searchHelper'; 
import './DataDictionary.css';

class DataDictionary extends React.Component {
  constructor(props) {
    super(props);
    this.dictionarySearcherRef = React.createRef();
    this.state = {
      isSearchFinished: false,
      oldKeyword: "",
    };
  }

  setGraphView = (isGraphView) => {
    this.props.onSetGraphView(isGraphView);
  };

  handleClearSearchResult = () => {
    this.dictionarySearcherRef.current.getWrappedInstance().launchClearSearchFromOutside();
  };

  async componentDidMount() {
    if(this.props.dictionary == null){
      let dict = {};
      if(this.props.graphType == 'gdc'){
        dict = await apiGetGDCDictionary();
      }
      else if(this.props.graphType == 'icdc'){
        dict = await apiGetICDCDictionary();
      }
      else if(this.props.graphType == 'ctdc'){
        dict = await apiGetCTDCDictionary();
      }
      else if(this.props.graphType == 'gdc_readonly'){
        dict = await apiGetGDCDictionary();
      }
      else if(this.props.graphType == 'icdc_readonly'){
        dict = await apiGetICDCDictionary();
      }
      else if(this.props.graphType == 'ctdc_readonly'){
        dict = await apiGetCTDCDictionary();
      }
      else{
        dict = await apiGetGDCDictionary();
      }
      this.props.onInitiateGraph(dict);
    }

    // resume search status after switching back from other pages
    if (this.props.keyword && this.props.graphType.indexOf('readonly') == -1 ) {
      this.search(this.props.keyword);
    }
    else{
      this.setState({
        isSearchFinished: true,
        oldKeyword: "",
      });
    }
  }

  search = (str) => {
    let searchData = prepareSearchData(this.props.dictionary);
    const { result, errorMsg } = searchKeyword(searchData, str);
    if (!result || result.length === 0) {
      this.props.onSearchResultUpdated([], []);
      this.setState({
        isSearchFinished: true,
        oldKeyword: str,
      });
      return;
    }
    const summary = getSearchSummary(result);
    this.setState({
      isSearchFinished: true,
      oldKeyword: str,
    });
    console.log(this.props.source);
    console.log(searchData);
    console.log(result);
    console.log(summary);
    this.props.onSearchResultUpdated(result, summary);
  };

  render() {
    if(this.state.isSearchFinished){
      if(this.state.oldKeyword !== this.props.keyword && this.props.graphType.indexOf('readonly') == -1){
        this.search(this.props.keyword);
      }
      return (
        <div className='data-dictionary'>
          <div
            className='data-dictionary__main'
          >
            <div className='data-dictionary__graph'>
              <DataDictionaryGraph 
                graphType={this.props.graphType}
              />
            </div>
          </div>
        </div>
      );
    }
    else{
      return (
        <div className='data-dictionary'>
          <div
            className='data-dictionary__main'
          >
            <div className='data-dictionary__graph'>
              Loading...
            </div>
          </div>
        </div>
      );
    }
    
  }
}

DataDictionary.propTypes = {
  onSetGraphView: PropTypes.func,
  onInitiateGraph: PropTypes.func,
  isGraphView: PropTypes.bool,
  graphType: PropTypes.string,
  keyword: PropTypes.string,
  source: PropTypes.object,
  dictionary: PropTypes.object,
};

DataDictionary.defaultProps = {
  onSetGraphView: () => {},
  onInitiateGraph: () => {},
  isGraphView: false,
  graphType: "gdc",
  keyword: "",
  source: [],
  dictionary: null,
};


export default DataDictionary;
