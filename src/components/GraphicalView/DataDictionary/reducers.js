import { createSlice } from '@reduxjs/toolkit';
import {
  getSearchHistoryItems,
  clearSearchHistoryItems,
  addSearchHistoryItems,
} from "./utils";

const ddgraphInitialState = {
  isGraphView: true,
  layoutInitialized: false,
  nodes: [],
  edges: [],
  graphBoundingBox: [],
  legendItems: [],
  hoveringNode: null,
  highlightingNode: null,
  relatedNodeIDs: [],
  secondHighlightingNodeID: null,
  dataModelStructure: null,
  overlayPropertyHidden: true,
  canvasBoundingRect: { top: 0, left: 0 },
  needReset: false,
  tableExpandNodeID: null,
  searchHistoryItems: getSearchHistoryItems(),
  graphNodesSVGElements: null,
  currentSearchKeyword: "",
  searchResult: [],
  matchedNodeIDs: [],
  matchedNodeIDsInProperties: [],
  matchedNodeIDsInNameAndDescription: [],
  isSearchMode: false,
  isSearching: false,
  highlightingMatchedNodeID: null,
  highlightingMatchedNodeOpened: false,
  currentProject: "",
};

const initialState = {
  gdc: ddgraphInitialState,
  icdc: ddgraphInitialState,
  ctdc: ddgraphInitialState,
  pcdc: ddgraphInitialState,
  gdc_readonly: ddgraphInitialState,
  icdc_readonly: ddgraphInitialState,
  ctdc_readonly: ddgraphInitialState,
  pcdc_readonly: ddgraphInitialState,
};

const dataDictionarySlice = createSlice({
  name: 'dataDictionary',
  initialState,
  reducers: {
    toggleGraphTableView: (state, action) => {
      const { graphType, isGraphView } = action.payload;
      state[graphType].isGraphView = isGraphView;
      state[graphType].overlayPropertyHidden = true;
    },
    updateGraphLayout: (state, action) => {
      const { graphType, nodes, edges, graphBoundingBox } = action.payload;
      state[graphType].nodes = nodes;
      state[graphType].edges = edges;
      state[graphType].graphBoundingBox = graphBoundingBox;
      state[graphType].layoutInitialized = true;
    },
    updateGraphLegend: (state, action) => {
      const { graphType, legendItems } = action.payload;
      state[graphType].legendItems = legendItems;
    },
    updateHoveringNode: (state, action) => {
      const { graphType, nodeID } = action.payload;
      state[graphType].hoveringNode = state[graphType].nodes.find(n => n.id === nodeID);
    },
    updateCanvasBoundingRect: (state, action) => {
      const { graphType, canvasBoundingRect } = action.payload;
      state[graphType].canvasBoundingRect = canvasBoundingRect;
    },
    updateRelatedHighlightingNode: (state, action) => {
      const { graphType, relatedNodeIDs } = action.payload;
      state[graphType].relatedNodeIDs = relatedNodeIDs;
    },
    updateSecondHighlightingNodeCandidates: (state, action) => {
      const { graphType, secondHighlightingNodeCandidateIDs } = action.payload;
      state[graphType].secondHighlightingNodeCandidateIDs = secondHighlightingNodeCandidateIDs;
    },
    updatePathRelatedToSecondHighlightingNode: (state, action) => {
      const { graphType, pathRelatedToSecondHighlightingNode } = action.payload;
      state[graphType].pathRelatedToSecondHighlightingNode = pathRelatedToSecondHighlightingNode;
    },
    updateDataModelStructure: (state, action) => {
      const { graphType, dataModelStructure, dataModelStructureRelatedNodeIDs, routesBetweenStartEndNodes } = action.payload;
      state[graphType].dataModelStructure = dataModelStructure;
      state[graphType].dataModelStructureRelatedNodeIDs = dataModelStructureRelatedNodeIDs;
      state[graphType].dataModelStructureAllRoutesBetween = routesBetweenStartEndNodes;
    },
    updateOverlayPropertyTableHidden: (state, action) => {
      const { graphType, isHidden } = action.payload;
      state[graphType].overlayPropertyHidden = isHidden;
    },
    setCanvasResetRequired: (state, action) => {
      const { graphType, needReset } = action.payload;
      state[graphType].needReset = needReset;
    },
    resetHighlight: (state, action) => {
      const { graphType } = action.payload;
      state[graphType].highlightingNode = null;
      state[graphType].secondHighlightingNodeID = null;
      state[graphType].tableExpandNodeID = null;
    },
    clickNodeAction: (state, action) => {
      const { graphType, nodeID } = action.payload;
      const currentState = state[graphType];

      if (currentState.isSearchMode) {
        currentState.highlightingMatchedNodeID = nodeID;
        currentState.highlightingMatchedNodeOpened = false;
        currentState.overlayPropertyHidden = false;
        return;
      }

      let newHighlightingNode = null;
      let newSecondHighlightingNodeID = null;

      if (nodeID) {
        if (!currentState.highlightingNode) {
          newHighlightingNode = currentState.nodes.find(n => n.id === nodeID);
        } else {
          newHighlightingNode = currentState.highlightingNode;

          if (currentState.highlightingNode.id === nodeID) {
            if (!currentState.secondHighlightingNodeID) {
              newHighlightingNode = null;
            }
          } else if (
            currentState.secondHighlightingNodeCandidateIDs?.length > 1 &&
            currentState.secondHighlightingNodeCandidateIDs.includes(nodeID)
          ) {
            if (currentState.secondHighlightingNodeID === nodeID) {
              newSecondHighlightingNodeID = null;
            } else {
              newSecondHighlightingNodeID = nodeID;
            }
          }
        }
      }

      currentState.highlightingNode = newHighlightingNode;
      currentState.secondHighlightingNodeID = newSecondHighlightingNodeID;
      currentState.tableExpandNodeID = newHighlightingNode ? newHighlightingNode.id : null;
    },
    setSearching: (state, action) => {
      const { graphType, isSearching } = action.payload;
      state[graphType].isSearching = isSearching;
    },
    updateSearchResult: (state, action) => {
      const { graphType, searchResult, searchResultSummary } = action.payload;
      const currentState = state[graphType];
      currentState.searchResult = searchResult;
      currentState.isSearchMode = true;
      currentState.matchedNodeIDs = searchResultSummary.matchedNodeIDs;
      currentState.matchedNodeIDsInProperties = searchResultSummary.matchedNodeIDsInProperties;
      currentState.matchedNodeIDsInNameAndDescription = searchResultSummary.matchedNodeIDsInNameAndDescription;
    },
    clearSearchHistory: (state, action) => {
      const { graphType } = action.payload;
      state[graphType].searchHistoryItems = [];
      clearSearchHistoryItems();
    },
    addSearchHistory: (state, action) => {
      const { graphType, searchHistoryItem } = action.payload;
      state[graphType].searchHistoryItems = addSearchHistoryItems(searchHistoryItem);
    },
    updateGraphNodesSVGElements: (state, action) => {
      const { graphType, graphNodesSVGElements } = action.payload;
      state[graphType].graphNodesSVGElements = graphNodesSVGElements;
    },
    clearSearch: (state, action) => {
      const { graphType } = action.payload;
      const currentState = state[graphType];
      currentState.searchResult = [];
      currentState.isSearchMode = false;
      currentState.matchedNodeIDs = [];
      currentState.matchedNodeIDsInProperties = [];
      currentState.matchedNodeIDsInNameAndDescription = [];
      currentState.highlightingMatchedNodeID = null;
      currentState.currentSearchKeyword = "";
    },
    saveSearchKeyword: (state, action) => {
      const { graphType, keyword } = action.payload;
      state[graphType].currentSearchKeyword = keyword;
    },
    applyHighlightingMatchedNodeOpened: (state, action) => {
      const { graphType, opened } = action.payload;
      state[graphType].highlightingMatchedNodeOpened = opened;
    },
    saveAsCurrentProject: (state, action) => {
      const { graphType, currentProject } = action.payload;
      state[graphType].currentProject = currentProject;
    },
  },
});

export const {
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
} = dataDictionarySlice.actions;

export default dataDictionarySlice.reducer;
