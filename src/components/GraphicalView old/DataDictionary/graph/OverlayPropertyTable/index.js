import { connect } from 'react-redux';
import {
  setOverlayPropertyTableHidden,
  setHighlightingMatchedNodeOpened,
} from '../../action';
import OverlayPropertyTable from './OverlayPropertyTable';

const getNode = (state, graphType) => {
  if (state.ddgraph[graphType].isSearchMode) {
    if (state.ddgraph[graphType].highlightingMatchedNodeID) {
      return state.submission["dictionary_" + graphType][state.ddgraph[graphType].highlightingMatchedNodeID];
    }

    return null;
  }
  if (state.ddgraph[graphType].highlightingNode) {
    return state.submission["dictionary_" + graphType][state.ddgraph[graphType].highlightingNode.id];
  }
  return null;
};

const getSearchResultItem = (state, graphType) => {
  if (state.ddgraph[graphType].isSearchMode) {
    return state.ddgraph[graphType].searchResult;
  }
  return null;
};

const ReduxOverlayPropertyTable = (() => {
  const mapStateToProps = (state, ownProps) => ({
    hidden: state.ddgraph[ownProps.graphType].overlayPropertyHidden,
    node: getNode(state, ownProps.graphType),
    isSearchMode: state.ddgraph[ownProps.graphType].isSearchMode,
    matchedResult: getSearchResultItem(state, ownProps.graphType),
    isSearchResultNodeOpened: state.ddgraph[ownProps.graphType].highlightingMatchedNodeOpened,
    graphType: ownProps.graphType
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onCloseOverlayPropertyTable: () => dispatch(setOverlayPropertyTableHidden(ownProps.graphType, true)),
    onOpenMatchedProperties: () => dispatch(setHighlightingMatchedNodeOpened(ownProps.graphType, true)),
    onCloseMatchedProperties: () => dispatch(setHighlightingMatchedNodeOpened(ownProps.graphType, false)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(OverlayPropertyTable);
})();

export default ReduxOverlayPropertyTable;
