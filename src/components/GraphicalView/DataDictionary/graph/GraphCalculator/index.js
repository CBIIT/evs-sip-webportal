import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import GraphCalculator from './GraphCalculator';
import {
  setGraphLayout,
  setGraphLegend,
  setRelatedNodeIDs,
  setSecondHighlightingNodeCandidateIDs,
  setPathRelatedToSecondHighlightingNode,
  setDataModelStructure,
  resetGraphHighlight,
} from '../../action';

const ReduxGraphCalculator = ({ graphType }) => {
  const dispatch = useDispatch();
  
  const dictionary = useSelector(state => state.dictionary[`dictionary_${graphType}`]);
  const countsSearch = useSelector(state => state.dictionary.counts_search ?? []);
  const linksSearch = useSelector(state => state.dictionary.links_search ?? []);
  const highlightingNode = useSelector(state => state.dataDictionary[graphType].highlightingNode);
  const nodes = useSelector(state => state.dataDictionary[graphType].nodes);
  const edges = useSelector(state => state.dataDictionary[graphType].edges);
  const secondHighlightingNodeID = useSelector(state => state.dataDictionary[graphType].secondHighlightingNodeID);
  const layoutInitialized = useSelector(state => state.dataDictionary[graphType].layoutInitialized);

  const handleGraphLayoutCalculated = (layout) => {
    dispatch(setGraphLayout(graphType, layout));
  };

  const handleGraphLegendCalculated = (legendItems) => {
    dispatch(setGraphLegend(graphType, legendItems));
  };

  const handleHighlightRelatedNodesCalculated = (relatedNodeIDs) => {
    dispatch(setRelatedNodeIDs(graphType, relatedNodeIDs));
  };

  const handleSecondHighlightingNodeCandidateIDsCalculated = (secondHighlightingNodeCandidateIDs) => {
    dispatch(setSecondHighlightingNodeCandidateIDs(graphType, secondHighlightingNodeCandidateIDs));
  };

  const handlePathRelatedToSecondHighlightingNodeCalculated = (pathRelatedToSecondHighlightingNode) => {
    dispatch(setPathRelatedToSecondHighlightingNode(graphType, pathRelatedToSecondHighlightingNode));
  };

  const handleClearGraphHighlight = () => {
    dispatch(resetGraphHighlight(graphType));
  };

  const handleDataModelStructureCalculated = (
    dataModelStructure,
    dataModelStructureRelatedNodeIDs,
    routesBetweenStartEndNodes
  ) => {
    dispatch(setDataModelStructure(
      graphType,
      dataModelStructure,
      dataModelStructureRelatedNodeIDs,
      routesBetweenStartEndNodes
    ));
  };

  return (
    <GraphCalculator
      graphType={graphType}
      dictionary={dictionary}
      countsSearch={countsSearch}
      linksSearch={linksSearch}
      highlightingNode={highlightingNode}
      nodes={nodes}
      edges={edges}
      secondHighlightingNodeID={secondHighlightingNodeID}
      layoutInitialized={layoutInitialized}
      onGraphLayoutCalculated={handleGraphLayoutCalculated}
      onGraphLegendCalculated={handleGraphLegendCalculated}
      onHighlightRelatedNodesCalculated={handleHighlightRelatedNodesCalculated}
      onSecondHighlightingNodeCandidateIDsCalculated={handleSecondHighlightingNodeCandidateIDsCalculated}
      onPathRelatedToSecondHighlightingNodeCalculated={handlePathRelatedToSecondHighlightingNodeCalculated}
      onClearGraphHighlight={handleClearGraphHighlight}
      onDataModelStructureCalculated={handleDataModelStructureCalculated}
    />
  );
};

export default ReduxGraphCalculator;
