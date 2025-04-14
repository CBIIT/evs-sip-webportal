import React from 'react';
import { useSelector } from 'react-redux';
import './ActionLayer.css';

/**
 * A layer over the graph using modern React and Redux Toolkit patterns.
 * Put action buttons here.
 */
const ActionLayer = ({ graphType }) => {
  // Get state directly from Redux store with hooks
  const isSearchMode = useSelector(state => state.dataDictionary[graphType].isSearchMode);
  const matchedResult = useSelector(state => state.dataDictionary[graphType].searchResult);

  const found_match = Object.keys(matchedResult).length === 0 && graphType.indexOf('readonly') === -1;
  
  return (
    <div className={found_match ? 'action-layer__empty' : 'action-layer'}>
      {found_match ? "Sorry, no results found." : ""}
    </div>
  );
};

export default ActionLayer;
