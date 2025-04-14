import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import GraphNode from '../GraphNode/GraphNode';
import GraphEdge from '../GraphEdge/GraphEdge';
import {
  hoverNode,
  clickNode,
  setGraphNodesSVGElements,
} from '../../action';
import './GraphDrawer.css';

const GraphDrawer = ({ graphType }) => {
  const dispatch = useDispatch();

  // Select state from Redux store
  const nodes = useSelector(state => state.dataDictionary[graphType].nodes);
  const edges = useSelector(state => state.dataDictionary[graphType].edges);
  const graphBoundingBox = useSelector(state => state.dataDictionary[graphType].graphBoundingBox);
  const layoutInitialized = useSelector(state => state.dataDictionary[graphType].layoutInitialized);
  const highlightingNode = useSelector(state => state.dataDictionary[graphType].highlightingNode);
  const relatedNodeIDs = useSelector(state => state.dataDictionary[graphType].relatedNodeIDs);
  const secondHighlightingNodeID = useSelector(state => state.dataDictionary[graphType].secondHighlightingNodeID);
  const secondHighlightingNodeCandidateIDs = useSelector(state => state.dataDictionary[graphType].secondHighlightingNodeCandidateIDs);
  const pathRelatedToSecondHighlightingNode = useSelector(state => state.dataDictionary[graphType].pathRelatedToSecondHighlightingNode);
  const isGraphView = useSelector(state => state.dataDictionary[graphType].isGraphView);
  const isSearchMode = useSelector(state => state.dataDictionary[graphType].isSearchMode);
  const matchedNodeIDs = useSelector(state => state.dataDictionary[graphType].matchedNodeIDs);
  const matchedNodeIDsInNameAndDescription = useSelector(state => state.dataDictionary[graphType].matchedNodeIDsInNameAndDescription);
  const searchResult = useSelector(state => state.dataDictionary[graphType].searchResult);
  const canvasWidth = useSelector(state => state.dataDictionary[graphType].canvasWidth);
  const canvasHeight = useSelector(state => state.dataDictionary[graphType].canvasHeight);

  const graphDomRef = useRef();
  const graphNodeRefs = useRef({});
  const nodeSVGElementInitialized = useRef(false);

  const getNodeRef = useCallback((nodeID) => {
    if (!graphNodeRefs.current[nodeID]) {
      graphNodeRefs.current[nodeID] = React.createRef();
    }
    return graphNodeRefs.current[nodeID];
  }, []);

  useEffect(() => {
    if (isGraphView && layoutInitialized && !nodeSVGElementInitialized.current) {
      const graphNodesSVGElements = nodes.reduce((acc, node) => ({
        ...acc,
        [node.id]: getNodeRef(node.id).current?.getSVGElement(),
      }), {});
      
      nodeSVGElementInitialized.current = true;
      dispatch(setGraphNodesSVGElements(graphType, graphNodesSVGElements));
    }
  }, [isGraphView, layoutInitialized, nodes, dispatch, graphType, getNodeRef]);

  const onMouseOverNode = useCallback((node) => {
    dispatch(hoverNode(graphType, node.id));
  }, [dispatch, graphType]);

  const onMouseOutNode = useCallback(() => {
    dispatch(hoverNode(graphType, null));
  }, [dispatch, graphType]);

  const onClickNode = useCallback((node) => {
    dispatch(clickNode(graphType, node.id));
  }, [dispatch, graphType]);

  if (!layoutInitialized) return null;

  const boundingBoxLength = graphBoundingBox[2][0];
  let fittingScale = Math.min(canvasWidth, canvasHeight) / boundingBoxLength;
  if(graphType.indexOf('pcdc') === 0){
    fittingScale = fittingScale * 0.8;
  }
  const fittingTransX = Math.abs(
    (boundingBoxLength - (canvasWidth / fittingScale)) / 2,
  );
  const fittingTransY = Math.abs(
    (boundingBoxLength - (canvasHeight / fittingScale)) / 2,
  );
  if (isNaN(fittingTransX) || isNaN(fittingTransY) || isNaN(fittingScale)) return <g />;

  return (
    <g
      className='graph-drawer'
      transform={`scale(${fittingScale}) translate(${fittingTransX}, ${fittingTransY})`}
      ref={graphDomRef}
    >
      {
        nodes.map((node) => {
          let isNodeFaded = false;
          let isNodeClickable = true;
          let isHighlightingNode = false;
          let isNodeHalfFaded = false;
          let isNodeDashed = false;
          if (isSearchMode) {
            isNodeFaded = !matchedNodeIDs.includes(node.id);
            isNodeDashed = matchedNodeIDsInNameAndDescription.length > 0
              && !isNodeFaded && !matchedNodeIDsInNameAndDescription.includes(node.id);
            isNodeClickable = !isNodeFaded;
          } else if (highlightingNode) {
            isHighlightingNode = (highlightingNode.id === node.id);
            isNodeClickable =
              highlightingNode.id === node.id
              || (secondHighlightingNodeCandidateIDs.length > 1
                && secondHighlightingNodeCandidateIDs.includes(node.id));

            isNodeFaded = !relatedNodeIDs.includes(node.id);

            if(graphType.indexOf("pcdc") === 0){
              isNodeFaded = highlightingNode.id !== node.id;
            }
            if (secondHighlightingNodeID) {
              isNodeHalfFaded = !isNodeFaded && !pathRelatedToSecondHighlightingNode
                .find(e => (e.source === node.id || e.target === node.id));
            }
          }
          let matchedNodeNameIndices = [];
          /*
          searchResult.forEach((item) => {
            if (item.item.id === node.id) {
              item.matches.forEach((matchItem) => {
                if (matchItem.key === 'title') {
                  matchedNodeNameIndices = matchItem.indices;
                }
              });
            }
          });
          */
          return (
            <GraphNode
              key={node.id}
              node={node}
              isHighlightingNode={isHighlightingNode}
              isFaded={isNodeFaded}
              isHalfFaded={isNodeHalfFaded}
              isDashed={isNodeDashed}
              isClickable={isNodeClickable}
              onMouseOver={() => onMouseOverNode(node)}
              onMouseOut={onMouseOutNode}
              onClick={() => onClickNode(node)}
              ref={getNodeRef(node.id)}
              matchedNodeNameIndices={matchedNodeNameIndices}
            />
          );
        })
      }
      {
        edges.map((edge, i) => {
          let isEdgeFaded = false;
          let isEdgeHalfFaded = false;
          let isEdgeHighlighted = false;
          if (isSearchMode) {
            isEdgeFaded = true;
          } else if (highlightingNode) {
            const isEdgeRelatedToHighlightedNode =
              relatedNodeIDs.includes(edge.source)
              && relatedNodeIDs.includes(edge.target);
            if (secondHighlightingNodeID) {
              const isEdgeAlongPathRelatedToSecondHighlightNode =
                !!pathRelatedToSecondHighlightingNode
                  .find(e => (e.source === edge.source && e.target === edge.target));
              isEdgeHalfFaded = isEdgeRelatedToHighlightedNode
                && !isEdgeAlongPathRelatedToSecondHighlightNode;
              isEdgeFaded = !isEdgeRelatedToHighlightedNode;
              isEdgeHighlighted = isEdgeAlongPathRelatedToSecondHighlightNode;
            } else {
              isEdgeFaded = !isEdgeRelatedToHighlightedNode;
              isEdgeHighlighted = isEdgeRelatedToHighlightedNode;
            }
          }
          return (
            <GraphEdge
              key={`${edge.source}-${edge.target}-${i}`}
              edge={edge}
              isRequired={edge.required}
              isFaded={isEdgeFaded}
              isHalfFaded={isEdgeHalfFaded}
              isHighlighted={isEdgeHighlighted}
              graphType={graphType}
            />
          );
        })
      }
    </g>
  );
};

GraphDrawer.propTypes = {
  graphType: PropTypes.string.isRequired,
};

export default React.memo(GraphDrawer);
