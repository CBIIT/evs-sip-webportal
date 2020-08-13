import { connect } from 'react-redux';
import {
  resetGraphHighlight,
  setOverlayPropertyTableHidden,
} from '../../action';
import NodePopup from './NodePopup';

const ReduxNodePopup = (() => {
  const mapStateToProps = (state, ownProps) => ({
    highlightingNode: state.ddgraph[ownProps.graphType].highlightingNode,
    canvasBoundingRect: state.ddgraph[ownProps.graphType].canvasBoundingRect,
    graphNodesSVGElements: state.ddgraph[ownProps.graphType].graphNodesSVGElements,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onClosePopup: () => dispatch(resetGraphHighlight(ownProps.graphType)),
    onOpenOverlayPropertyTable: () => dispatch(setOverlayPropertyTableHidden(ownProps.graphType, false)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(NodePopup);
})();

export default ReduxNodePopup;
