import {
  toggleGraphTableView,
  updateGraphLayout,
  updateGraphLegend,
  updateHoveringNode,
  updateCanvasBoundingRect,
  updateRelatedHighlightingNode,
  updateSecondHighlightingNodeCandidates,
  updatePathRelatedToSecondHighlightingNode,
  updateDataModelStructure,
  updateOverlayPropertyTableHidden,
  setCanvasResetRequired,
  resetHighlight,
  clickNodeAction,
  setSearching,
  updateSearchResult,
  clearSearchHistory,
  addSearchHistory,
  updateGraphNodesSVGElements,
  clearSearch,
  saveSearchKeyword,
  applyHighlightingMatchedNodeOpened,
  saveAsCurrentProject,
} from './reducers';

export const initiateGraph = (graphType, dictionary) => ({
  type: "RECEIVE_DICTIONARY_" + graphType.toUpperCase(),
  graphType: graphType,
  dictionary: dictionary,
});

export const clickBlankSpace = (graphType) => 
  resetHighlight({ graphType });

export const setCanvasBoundingRect = (graphType, canvasBoundingRect) => 
  updateCanvasBoundingRect({ graphType, canvasBoundingRect });

export const setSecondHighlightingNodeCandidateIDs = (graphType, secondHighlightingNodeCandidateIDs) => 
  updateSecondHighlightingNodeCandidates({ graphType, secondHighlightingNodeCandidateIDs });

export const setPathRelatedToSecondHighlightingNode = (graphType, pathRelatedToSecondHighlightingNode) => 
  updatePathRelatedToSecondHighlightingNode({ graphType, pathRelatedToSecondHighlightingNode });

export const setDataModelStructure = (graphType, dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes) => 
  updateDataModelStructure({ graphType, dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes });

export const setRelatedNodeIDs = (graphType, relatedNodeIDs) => 
  updateRelatedHighlightingNode({ graphType, relatedNodeIDs });

export const setGraphLayout = (graphType, layout) => 
  setGraphLayout({ graphType, ...layout });

export const setGraphLegend = (graphType, legendItems) => 
  setGraphLegend({ graphType, legendItems });

export const hoverNode = (graphType, nodeID) => 
  updateHoveringNode({ graphType, nodeID });

export const clickNode = (graphType, nodeID) => 
  clickNodeAction({ graphType, nodeID });

export const resetGraphHighlight = (graphType) => 
  resetHighlight({ graphType });

export const setOverlayPropertyTableHidden = (graphType, isHidden) => 
  updateOverlayPropertyTableHidden({ graphType, isHidden });

export const setExpandNode = (graphType, nodeID) => 
  clickNode({ graphType, nodeID });

export const setGraphView = (graphType, isGraphView) => 
  toggleGraphTableView({ graphType, isGraphView });

export const setNeedReset = (graphType, needReset) => 
  setCanvasResetRequired({ graphType, needReset });

export const setIsSearching = (graphType, isSearching) => 
  setSearching({ graphType, isSearching });

export const setSearchResult = (graphType, searchResult, searchResultSummary) => 
  updateSearchResult({ graphType, searchResult, searchResultSummary });

export const clearSearchHistoryItems = (graphType) => 
  clearSearchHistory({ graphType });

export const addSearchHistoryItem = (graphType, searchHistoryItem) => 
  addSearchHistory({ graphType, searchHistoryItem });

export const setGraphNodesSVGElements = (graphType, graphNodesSVGElements) => 
  updateGraphNodesSVGElements({ graphType, graphNodesSVGElements });

export const clearSearchResult = (graphType) => 
  clearSearch({ graphType });

export const saveCurrentSearchKeyword = (graphType, keyword) => 
  saveSearchKeyword({ graphType, keyword });

export const setHighlightingMatchedNodeOpened = (graphType, opened) => 
  applyHighlightingMatchedNodeOpened({ graphType, opened });

export const saveCurrentProject = (graphType, currentProject) => 
  saveAsCurrentProject({ graphType, currentProject });
