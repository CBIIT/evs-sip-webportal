import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import './NodeTooltip.css';

const NodeTooltip = ({ graphType }) => {
  const hoveringNode = useSelector(state => state.dataDictionary[graphType].hoveringNode);
  const canvasBoundingRect = useSelector(state => state.dataDictionary[graphType].canvasBoundingRect);
  const graphNodesSVGElements = useSelector(state => state.dataDictionary[graphType].graphNodesSVGElements);

  if (!hoveringNode) return null;

  const hoveringNodeSVGElement = graphNodesSVGElements && graphNodesSVGElements[hoveringNode.id];
  const svgBoundingBox = hoveringNodeSVGElement
    ? hoveringNodeSVGElement.getBoundingClientRect() 
    : { top: 0, left: 0, width: 0 };
  
  const gap = 10;
  const tooltipLeft = (svgBoundingBox.left - canvasBoundingRect.left) + (svgBoundingBox.width / 2) + 50;
  const tooltipBottom = (canvasBoundingRect.bottom - svgBoundingBox.top) + gap;
  
  return (
    <div
      className='node-tooltip'
      style={{
        bottom: tooltipBottom,
        left: tooltipLeft,
      }}
    >
      {hoveringNode && (
        <div className='node-tooltip__wrapper'>
          <span className='node-tooltip__text'>
            {hoveringNode.label}
          </span>
          <span className='node-tooltip__arrow' />
        </div>
      )}
    </div>
  );
};

NodeTooltip.propTypes = {
  graphType: PropTypes.string.isRequired,
};

export default NodeTooltip;
