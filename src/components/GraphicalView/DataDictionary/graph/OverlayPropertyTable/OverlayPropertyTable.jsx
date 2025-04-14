import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setOverlayPropertyTableHidden , setHighlightingMatchedNodeOpened} from '../../action';
import { getCategoryIconSVG, getCategoryColor } from '../../NodeCategories/helper';
import DataDictionaryPropertyTable from '../../table/DataDictionaryPropertyTable/.';
import './OverlayPropertyTable.css';

const getNode = (state, graphType) => {
  if (state.dataDictionary[graphType].isSearchMode) {
    if (state.dataDictionary[graphType].highlightingMatchedNodeID) {
      return state.dictionary["dictionary_" + graphType][state.dataDictionary[graphType].highlightingMatchedNodeID];
    }
    return null;
  }
  if (state.dataDictionary[graphType].highlightingNode) {
    return state.dictionary["dictionary_" + graphType][state.dataDictionary[graphType].highlightingNode.id];
  }
  return null;
};

const getSearchResultItem = (state, graphType) => {
  if (state.dataDictionary[graphType].isSearchMode) {
    return state.dataDictionary[graphType].searchResult;
  }
  return null;
};

const OverlayPropertyTable = ({ graphType }) => {
  const dispatch = useDispatch();
  
  const node = useSelector(state => getNode(state, graphType));
  const hidden = useSelector(state => state.dataDictionary[graphType].overlayPropertyHidden);
  const isSearchMode = useSelector(state => state.dataDictionary[graphType].isSearchMode);
  const matchedResult = useSelector(state => getSearchResultItem(state, graphType));
  const isSearchResultNodeOpened = useSelector(state => state.dataDictionary[graphType].highlightingMatchedNodeOpened);


  const handleClose = () => {
    dispatch(setOverlayPropertyTableHidden(graphType, true));
  };

  const handleOpenAllProperties = () => {
    dispatch(setHighlightingMatchedNodeOpened(graphType, true));
  };

  const handleDisplayOnlyMatchedProperties = () => {
    dispatch(setHighlightingMatchedNodeOpened(graphType, false));
  };

  if (!node || hidden) return null;

  const IconSVG = getCategoryIconSVG(node.category.toLowerCase());
  const itemColor = getCategoryColor(node.category.toLowerCase());
  const searchedNodeNotOpened = isSearchMode && !isSearchResultNodeOpened;
  const needHighlightSearchResult = isSearchMode;

  return (
    <div className='overlay-property-table'>
      <div className='overlay-property-table__background' />
      <div className='overlay-property-table__fixed-container'>
        <div className='overlay-property-table__content'>
          <div className='overlay-property-table__header'>
            <div className='overlay-property-table__category'>
              <IconSVG fill={itemColor} className='overlay-property-table__category-icon' />
              <h4 className='overlay-property-table__category-text'>{node.category} / {node.id}</h4>
              <span
                className='overlay-property-table__close'
                onClick={handleClose}
                onKeyPress={handleClose}
                role='button'
                tabIndex={0}
              >
                Close
                <i className='overlay-property-table__close-icon g3-icon g3-icon--cross g3-icon--sm' />
              </span>
            </div>
          </div>
          <div className='overlay-property-table__property'>
            <DataDictionaryPropertyTable
              properties={node.properties}
              requiredProperties={node.required}
              hasBorder={false}
              onlyShowMatchedProperties={searchedNodeNotOpened}
              needHighlightSearchResult={needHighlightSearchResult}
              hideIsRequired={searchedNodeNotOpened}
              matchedResult={matchedResult}
              nodeID={node.id}
              category={node.category}
              source={graphType}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

OverlayPropertyTable.propTypes = {
  graphType: PropTypes.string.isRequired
};

export default OverlayPropertyTable;
