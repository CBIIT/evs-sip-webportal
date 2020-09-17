import { connect } from 'react-redux';
import { initiateGraph, setGraphView, setSearchResult } from './action.js';
import DataDictionary from './DataDictionary';

const ReduxDataDictionary = (() => {
  const mapStateToProps = (state, ownProps) => ({
    isGraphView: state.ddgraph[ownProps.graphType].isGraphView,
    dictionary: state.submission["dictionary_" + ownProps.graphType],
    graphType: ownProps.graphType,
    keyword: ownProps.keyword,
    source: ownProps.source
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onSetGraphView: isGraphView => dispatch(setGraphView(ownProps.graphType, isGraphView)),
    onSearchResultUpdated: (result, summary) => dispatch(setSearchResult(ownProps.graphType, result, summary)),
    onInitiateGraph: dictionary => dispatch(initiateGraph(ownProps.graphType, dictionary))
  });

  return connect(mapStateToProps, mapDispatchToProps)(DataDictionary);
})();

export default ReduxDataDictionary;
