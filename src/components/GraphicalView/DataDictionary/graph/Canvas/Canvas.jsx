import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import { zoom, zoomTransform, zoomIdentity } from 'd3-zoom';
import { CompressIcon, SearchMinusIcon, SearchPlusIcon } from '../../../../ui/icons/Icons';
import { clickBlankSpace, setCanvasBoundingRect, setNeedReset } from '../../action';
import './Canvas.css';

const d3 = {
  select,
  zoom,
  zoomTransform,
  zoomIdentity,
  transition,
  easeLinear,
};

const Canvas = ({ 
  graphType,
  minZoom = 0.1,
  maxZoom = 10,
  topLeftTranslateLimit = [-Infinity, -Infinity],
  bottomRightTranslateLimit = [+Infinity, +Infinity],
  children 
}) => {
  const dispatch = useDispatch();
  const isGraphView = useSelector(state => state.dataDictionary[graphType].isGraphView);
  const needReset = useSelector(state => state.dataDictionary[graphType].needReset);

  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef(null);
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const zoomBehaviorRef = useRef(null);
  const zoomTargetRef = useRef(null);
  const zoomCatcherRef = useRef(null);

  // Initialize zoom behavior
  useEffect(() => {
    const transition = d3.transition()
      .duration(150)
      .ease(d3.easeLinear);

    zoomBehaviorRef.current = d3.zoom()
      .scaleExtent([minZoom, maxZoom])
      .translateExtent([topLeftTranslateLimit, bottomRightTranslateLimit])
      .on('zoom', (event) => {
        handleCanvasUpdate();
        zoomTargetRef.current.attr('transform', event.transform);
      });

    zoomTargetRef.current = d3.select(`#canvas__container_${graphType}`);
    zoomCatcherRef.current = d3.select(`#canvas__overlay_${graphType}`)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      .call(zoomBehaviorRef.current);

    updateCanvasSize();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleCanvasUpdate);

    return () => {
      d3.select(`#canvas__overlay_${graphType}`).on('.zoom', null);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleCanvasUpdate);
    };
  }, [graphType, minZoom, maxZoom, topLeftTranslateLimit, bottomRightTranslateLimit]);

  // Handle needReset changes
  useEffect(() => {
    if (needReset) {
      handleReset();
      dispatch(setNeedReset(graphType, false));
    }
  }, [needReset, graphType]);

  const handleResize = () => {
    if (isGraphView) {
      updateCanvasSize();
    }
  };

  const updateCanvasSize = () => {
    if (canvasRef.current) {
      setCanvasSize({
        width: canvasRef.current.clientWidth,
        height: canvasRef.current.clientHeight,
      });
      handleCanvasUpdate();
    }
  };

  const handleCanvasUpdate = () => {
    if (canvasRef.current) {
      const canvasBoundingRect = canvasRef.current.getBoundingClientRect();
      dispatch(setCanvasBoundingRect(graphType, canvasBoundingRect));
    }
  };

  const handleClick = () => {
    dispatch(clickBlankSpace(graphType));
  };

  const zoomAction = (k) => {
    if (!zoomCatcherRef.current) return;

    const transform = d3.zoomTransform(zoomCatcherRef.current.node());
    const translateSign = k > 1 ? -1 : +1;

    zoomCatcherRef.current
      .transition()
      .call(
        zoomBehaviorRef.current.transform,
        transform
          .translate(
            translateSign * (canvasSize.width / 2) * Math.abs(k - 1),
            translateSign * (canvasSize.height / 2) * Math.abs(k - 1),
          )
          .scale(k),
      );
  };

  const handleZoomIn = () => {
    zoomAction(1.2);
  };

  const handleZoomOut = () => {
    zoomAction(0.8);
  };

  const handleReset = () => {
    if (zoomCatcherRef.current && zoomBehaviorRef.current) {
      zoomCatcherRef.current
        .transition()
        .call(zoomBehaviorRef.current.transform, d3.zoomIdentity);
    }
  };

  const containerID = `canvas__container_${graphType}`;
  const overlayID = `canvas__overlay_${graphType}`;
  const markerArrowID = `markerArrow_${graphType}`;

  return (
    <div 
      className='canvas' 
      ref={canvasRef} 
      style={{ 
        height: '100%', 
        width: 'calc(100% - 50px)', 
        marginLeft: '50px', 
        border: '4px solid #1588ae', 
        borderRadius: '15px', 
        background: 'white'
      }}
    >
      <div className='canvas__zoom-button-group'>
        <div
          className='canvas__zoom-button canvas__zoom-button--zoom-in'
          onClick={handleZoomIn}
          onKeyPress={handleZoomIn}
          role='button'
          title='Zoom in'
          tabIndex={-1}
        >
          <SearchPlusIcon className='canvas-button-icon'/>
        </div>
        <div
          className='canvas__zoom-button canvas__zoom-button--zoom-out'
          onClick={handleZoomOut}
          onKeyPress={handleZoomOut}
          role='button'
          title='Zoom out'
          tabIndex={-1}
        >
          <SearchMinusIcon className='canvas-button-icon'/>
        </div>
        <div
          className='canvas__zoom-button canvas__zoom-button--reset'
          onClick={handleReset}
          onKeyPress={handleReset}
          role='button'
          title='Reset'
          tabIndex={-1}
        >
          <CompressIcon className='canvas-button-icon'/>
        </div>
      </div>
      <svg
        className='canvas__svg'
        ref={svgRef}
        width={canvasSize.width}
        height={canvasSize.height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker 
            id={markerArrowID} 
            markerWidth="20" 
            markerHeight="20" 
            refX="0" 
            refY="3" 
            orient="auto" 
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="black" />
          </marker>
        </defs>
        <rect
          className='canvas__overlay'
          id={overlayID}
          width={canvasSize.width}
          height={canvasSize.height}
          onClick={handleClick}
        />
        <g
          className='canvas__container'
          id={containerID}
          ref={containerRef}
        >
          {React.Children.map(children, child => 
            React.cloneElement(child, {
              canvasWidth: canvasSize.width,
              canvasHeight: canvasSize.height,
            })
          )}
        </g>
      </svg>
    </div>
  );
};

Canvas.propTypes = {
  graphType: PropTypes.string.isRequired,
  minZoom: PropTypes.number,
  maxZoom: PropTypes.number,
  topLeftTranslateLimit: PropTypes.arrayOf(PropTypes.number),
  bottomRightTranslateLimit: PropTypes.arrayOf(PropTypes.number),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Canvas;
