import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import { useSelector, useDispatch } from 'react-redux';
import { resetGraphHighlight } from '../../action';
import './NodePopup.css';

const NodePopup = ({ graphType }) => {
  const dispatch = useDispatch();
  
  const highlightingNode = useSelector(state => state.dataDictionary[graphType].highlightingNode);
  const graphNodesSVGElements = useSelector(state => state.dataDictionary[graphType].graphNodesSVGElements);
  const canvasBoundingRect = useSelector(state => state.dataDictionary[graphType].canvasBoundingRect);

  const handleClickPropertyButton = () => {
    dispatch({ type: 'dataDictionary/updateOverlayPropertyTableHidden', payload: { graphType, isHidden: false } });
  };

  const handleClosePopup = () => {
    dispatch(resetGraphHighlight(graphType));
  };

  if (!highlightingNode) {
    return null;
  }

  const highlightingNodeSVGElement = graphNodesSVGElements && graphNodesSVGElements[highlightingNode.id];
  const svgBoundingBox = highlightingNodeSVGElement?.getBoundingClientRect() || { 
    top: 0, 
    left: 0, 
    width: 0, 
    bottom: 0 
  };

  const popupLeft = (svgBoundingBox.left - canvasBoundingRect.left) + (svgBoundingBox.width / 2) + 50;
  const popupTop = svgBoundingBox.bottom - canvasBoundingRect.top;

  return (
    <div
      className='node-popup'
      style={{
        top: popupTop,
        left: popupLeft,
      }}
    >
      <div className='node-popup__wrapper'>
        <div className='node-popup__content'>
          <li className='node-popup__list-item'>{highlightingNode.requiredPropertiesCount} required properties</li>
          <li className='node-popup__list-item'>{highlightingNode.optionalPropertiesCount} optional properties</li>
          <Button
            className='node-popup__button'
            onClick={handleClickPropertyButton}
            type='button'
          >
            Open properties
          </Button>
        </div>
        <span className='node-popup__arrow node-popup__arrow--outer' />
        <span className='node-popup__arrow node-popup__arrow--inner' />
        <i
          className='node-popup__close g3-icon g3-icon--cross'
          onClick={handleClosePopup}
          onKeyPress={handleClosePopup}
          role='button'
          tabIndex={0}
        />
      </div>
    </div>
  );
};

NodePopup.propTypes = {
  graphType: PropTypes.string.isRequired
};

export default NodePopup;
