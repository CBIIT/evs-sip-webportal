import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import DataDictionaryGraph from './graph/DataDictionaryGraph/.';
import { apiGetGDCDictionary, apiGetICDCDictionary, apiGetCTDCDictionary, apiGetPCDCDictionary } from '../../../api';
import { getSearchResult, getSearchSummary } from './search/DictionarySearcher/searchHelper';
import { 
  receiveDictionaryGDC,
  receiveDictionaryICDC,
  receiveDictionaryCTDC,
  receiveDictionaryPCDC,
  receiveDictionaryGDCReadonly,
  receiveDictionaryICDCReadonly,
  receiveDictionaryCTDCReadonly,
  receiveDictionaryPCDCReadonly,
} from '../reducers';
import './DataDictionary.css';

const DataDictionary = ({
  onSetGraphView,
  onInitiateGraph,
  onSearchResultUpdated,
  graphType,
  keyword,
  source,
  dictionary,
}) => {
  const [isSearchFinished, setIsSearchFinished] = useState(false);
  const dictionarySearcherRef = useRef();
  const dispatch = useDispatch();

  const setGraphView = (isGraphView) => {
    onSetGraphView(isGraphView);
  };

  const handleClearSearchResult = () => {
    dictionarySearcherRef.current?.getWrappedInstance()?.launchClearSearchFromOutside();
  };

  const search = (str) => {
    const result = getSearchResult(graphType, source);
    if (!result || result.length === 0) {
      onSearchResultUpdated([], []);
      return;
    }
    const summary = getSearchSummary(result);
    onSearchResultUpdated(result, summary);
  };

  useEffect(() => {
    const initiateDictionary = async () => {
      if (dictionary === null) {
        let dict = {};
        let action;
        
        switch(graphType) {
          case 'gdc':
            dict = await apiGetGDCDictionary();
            dispatch(receiveDictionaryGDC(dict));
            break;
          case 'icdc':
            dict = await apiGetICDCDictionary();
            dispatch(receiveDictionaryICDC(dict));
            break;
          case 'ctdc':
            dict = await apiGetCTDCDictionary();
            dispatch(receiveDictionaryCTDC(dict));
            break;
          case 'pcdc':
            dict = await apiGetPCDCDictionary();
            dispatch(receiveDictionaryPCDC(dict));
            break;
          case 'gdc_readonly':
            dict = await apiGetGDCDictionary();
            dispatch(receiveDictionaryGDCReadonly(dict));
            break;
          case 'icdc_readonly':
            dict = await apiGetICDCDictionary();
            dispatch(receiveDictionaryICDCReadonly(dict));
            break;
          case 'ctdc_readonly':
            dict = await apiGetCTDCDictionary();
            dispatch(receiveDictionaryCTDCReadonly(dict));
            break;
          case 'pcdc_readonly':
            dict = await apiGetPCDCDictionary();
            dispatch(receiveDictionaryPCDCReadonly(dict));
            break;
          default:
            dict = await apiGetGDCDictionary();
            dispatch(receiveDictionaryGDC(dict));
        }
        
        onInitiateGraph(dict);
      }
      setIsSearchFinished(true);
    };

    initiateDictionary();
  }, [dictionary, graphType, dispatch, onInitiateGraph]);

  useEffect(() => {
    if (isSearchFinished && keyword && graphType.indexOf('readonly') === -1) {
      search(keyword);
    }
  }, [isSearchFinished, keyword, graphType]);

  if (!isSearchFinished) {
    return (
      <div className='data-dictionary'>
        <div className='data-dictionary__main'>
          <div className='data-dictionary__graph graph-loading-info'>
            <div className="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='data-dictionary'>
      <div className='data-dictionary__main'>
        <div className='data-dictionary__graph'>
          <DataDictionaryGraph 
            graphType={graphType}
            source={source}
          />
        </div>
      </div>
    </div>
  );
};

DataDictionary.propTypes = {
  onSetGraphView: PropTypes.func,
  onInitiateGraph: PropTypes.func,
  onSearchResultUpdated: PropTypes.func,
  isGraphView: PropTypes.bool,
  graphType: PropTypes.string,
  keyword: PropTypes.string,
  source: PropTypes.array,
  dictionary: PropTypes.object,
};

DataDictionary.defaultProps = {
  onSetGraphView: () => {},
  onInitiateGraph: () => {},
  onSearchResultUpdated: () => {},
  isGraphView: false,
  graphType: "gdc",
  keyword: "",
  source: [],
  dictionary: null,
};

export default DataDictionary;
