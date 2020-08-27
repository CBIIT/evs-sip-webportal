import { connect } from 'react-redux';
import {
  hoverNode,
  clickNode,
  setGraphNodesSVGElements,
} from '../../action';
import GraphDrawer from './GraphDrawer';

const ReduxGraphDrawer = (() => {
  const mapStateToProps = (state, ownProps) => ({
    nodes: state.ddgraph[ownProps.graphType].nodes,
    edges: state.ddgraph[ownProps.graphType].edges,
    graphBoundingBox: state.ddgraph[ownProps.graphType].graphBoundingBox,
    layoutInitialized: state.ddgraph[ownProps.graphType].layoutInitialized,
    highlightingNode: state.ddgraph[ownProps.graphType].highlightingNode,
    relatedNodeIDs: state.ddgraph[ownProps.graphType].relatedNodeIDs,
    secondHighlightingNodeCandidateIDs: state.ddgraph[ownProps.graphType].secondHighlightingNodeCandidateIDs,
    pathRelatedToSecondHighlightingNode: state.ddgraph[ownProps.graphType].pathRelatedToSecondHighlightingNode,
    secondHighlightingNodeID: state.ddgraph[ownProps.graphType].secondHighlightingNodeID,
    isGraphView: state.ddgraph[ownProps.graphType].isGraphView,
    matchedNodeIDs: state.ddgraph[ownProps.graphType].matchedNodeIDs,
    matchedNodeIDsInNameAndDescription: state.ddgraph[ownProps.graphType].matchedNodeIDsInNameAndDescription,
    searchResult: state.ddgraph[ownProps.graphType].searchResult,
    isSearchMode: state.ddgraph[ownProps.graphType].isSearchMode,
    graphType: ownProps.graphType,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onHoverNode: nodeID => dispatch(hoverNode(ownProps.graphType, nodeID)),
    onCancelHoverNode: () => dispatch(hoverNode(ownProps.graphType, null)),
    onClickNode: nodeID => dispatch(clickNode(ownProps.graphType, nodeID)),
    onGraphNodesSVGElementsUpdated: graphNodesSVGElements =>
      dispatch(setGraphNodesSVGElements(ownProps.graphType, graphNodesSVGElements)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(GraphDrawer);
})();

export default ReduxGraphDrawer;
