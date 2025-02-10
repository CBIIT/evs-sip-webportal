import { connect } from 'react-redux';
import NodeTooltip from './NodeTooltip';

const ReduxNodeTooltip = (() => {
  const mapStateToProps = (state, ownProps) => ({
    hoveringNode: state.ddgraph[ownProps.graphType].hoveringNode,
    canvasBoundingRect: state.ddgraph[ownProps.graphType].canvasBoundingRect,
    graphNodesSVGElements: state.ddgraph[ownProps.graphType].graphNodesSVGElements,
  });

  return connect(mapStateToProps)(NodeTooltip);
})();

export default ReduxNodeTooltip;

