import { connect } from 'react-redux';
import { setGraphView } from './action.js';
import DataDictionary from './DataDictionary';

const ReduxDataDictionary = (() => {
  const mapStateToProps = (state, ownProps) => ({
    isGraphView: state.ddgraph[ownProps.graphType].isGraphView,
    graphType: ownProps.graphType,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onSetGraphView: isGraphView => dispatch(setGraphView(ownProps.graphType, isGraphView)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(DataDictionary);
})();

export default ReduxDataDictionary;
