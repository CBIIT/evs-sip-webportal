import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllTypes,
  calculateGraphLayout,
  calculatePathRelatedToSecondHighlightingNode,
  calculateHighlightRelatedNodeIDs,
  calculateDataModelStructure,
} from './graphCalculatorHelper';
import {
  setGraphLayout,
  setGraphLegend,
  setRelatedNodeIDs,
  setSecondHighlightingNodeCandidateIDs,
  setPathRelatedToSecondHighlightingNode,
  setDataModelStructure,
  resetGraphHighlight,
} from '../../action';

const GraphCalculator = ({ graphType }) => {
  const dispatch = useDispatch();
  const oldHighlightingNodeRef = useRef(null);
  const oldSecondHighlightingNodeIDRef = useRef(null);

  // Select state from Redux store
  const dictionary = useSelector(state => state.dictionary[`dictionary_${graphType}`]);
  const countsSearch = useSelector(state => state.dictionary.counts_search);
  const linksSearch = useSelector(state => state.dictionary.links_search);
  const highlightingNode = useSelector(state => state.dataDictionary[graphType].highlightingNode);
  const nodes = useSelector(state => state.dataDictionary[graphType].nodes);
  const edges = useSelector(state => state.dataDictionary[graphType].edges);
  const secondHighlightingNodeID = useSelector(state => state.dataDictionary[graphType].secondHighlightingNodeID);
  const layoutInitialized = useSelector(state => state.dataDictionary[graphType].layoutInitialized);

  const getDataModelStructureForHighlightedNodes = (newHighlightingNode) => {
    const relatedHighlightedNodeIDs = calculateHighlightRelatedNodeIDs(
      newHighlightingNode,
      nodes,
    );
    const subgraphEdges = edges
      .filter(e => (relatedHighlightedNodeIDs.includes(e.source)
        && relatedHighlightedNodeIDs.includes(e.target)))
      .map(e => ({ source: e.source, target: e.target }));
    const {
      dataModelStructure,
      routesBetweenStartEndNodes,
    } = calculateDataModelStructure(
      newHighlightingNode,
      relatedHighlightedNodeIDs,
      subgraphEdges,
      nodes,
    );
    return {
      dataModelStructure,
      dataModelStructureRelatedNodeIDs: relatedHighlightedNodeIDs,
      routesBetweenStartEndNodes,
    };
  };

  const getDataModelStructureForSecondHighlightingNodes = (
    newHighlightingNode,
    newSecondHighlightingNodeID,
  ) => {
    const subgraphNodeIDs = [];
    const pathRelatedToSecondHighlightingNode = calculatePathRelatedToSecondHighlightingNode(
      newHighlightingNode,
      newSecondHighlightingNodeID,
      nodes,
    );
    pathRelatedToSecondHighlightingNode.forEach((e) => {
      if (!subgraphNodeIDs.includes(e.source)) subgraphNodeIDs.push(e.source);
      if (!subgraphNodeIDs.includes(e.target)) subgraphNodeIDs.push(e.target);
    });
    const {
      dataModelStructure,
      routesBetweenStartEndNodes,
    } = calculateDataModelStructure(
      newHighlightingNode,
      subgraphNodeIDs,
      pathRelatedToSecondHighlightingNode,
      nodes,
    );
    return {
      dataModelStructure,
      dataModelStructureRelatedNodeIDs: subgraphNodeIDs,
      routesBetweenStartEndNodes,
    };
  };

  // Initial layout calculation
  useEffect(() => {
    if (!layoutInitialized) {
      calculateGraphLayout(
        dictionary,
        countsSearch,
        linksSearch,
        graphType,
      ).then((layoutResult) => {
        dispatch(setGraphLayout(graphType, layoutResult));
        const legendItems = getAllTypes(layoutResult.nodes);
        dispatch(setGraphLegend(graphType, legendItems));
      });
    }
  }, [layoutInitialized, dictionary, countsSearch, linksSearch, graphType, dispatch]);

  // Handle PCDC dictionary updates
  useEffect(() => {
    if (graphType.indexOf("pcdc") === 0 && dictionary) {
      const currentNodes = Object.keys(dictionary);
      if (currentNodes.length > 0) {
        calculateGraphLayout(
          dictionary,
          countsSearch,
          linksSearch,
          graphType,
        ).then((layoutResult) => {
          dispatch(setGraphLayout(graphType, layoutResult));
          const legendItems = getAllTypes(layoutResult.nodes);
          dispatch(setGraphLegend(graphType, legendItems));
          dispatch(resetGraphHighlight(graphType));
        });
      }
    }
  }, [dictionary, graphType, countsSearch, linksSearch, dispatch]);

  // Handle highlighting node updates
  useEffect(() => {
    if (oldHighlightingNodeRef.current !== highlightingNode) {
      const relatedHighlightedNodeIDs = calculateHighlightRelatedNodeIDs(
        highlightingNode,
        nodes,
      );
      dispatch(setRelatedNodeIDs(graphType, relatedHighlightedNodeIDs));
      const secondHighlightingNodeCandidateIDs = highlightingNode
        ? highlightingNode.outLinks : [];
      dispatch(setSecondHighlightingNodeCandidateIDs(graphType, secondHighlightingNodeCandidateIDs));
    }

    if (oldSecondHighlightingNodeIDRef.current !== secondHighlightingNodeID) {
      const pathRelatedToSecondHighlightingNode = calculatePathRelatedToSecondHighlightingNode(
        highlightingNode,
        secondHighlightingNodeID,
        nodes,
      );
      dispatch(setPathRelatedToSecondHighlightingNode(graphType, pathRelatedToSecondHighlightingNode));
    }

    if (oldHighlightingNodeRef.current !== highlightingNode
      || oldSecondHighlightingNodeIDRef.current !== secondHighlightingNodeID
    ) {
      if (secondHighlightingNodeID) {
        const {
          dataModelStructure,
          dataModelStructureRelatedNodeIDs,
          routesBetweenStartEndNodes,
        } = getDataModelStructureForSecondHighlightingNodes(
          highlightingNode,
          secondHighlightingNodeID,
        );
        dispatch(setDataModelStructure(
          graphType,
          dataModelStructure,
          dataModelStructureRelatedNodeIDs,
          routesBetweenStartEndNodes,
        ));
      } else {
        dispatch(setDataModelStructure(graphType, null));
      }
    }

    oldHighlightingNodeRef.current = highlightingNode;
    oldSecondHighlightingNodeIDRef.current = secondHighlightingNodeID;
  }, [highlightingNode, secondHighlightingNodeID, nodes, graphType, dispatch]);

  return null;
};

GraphCalculator.propTypes = {
  graphType: PropTypes.string.isRequired,
};

export default GraphCalculator;
