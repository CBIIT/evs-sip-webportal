import React from 'react';
import PropTypes from 'prop-types';
import GraphCalculator from '../GraphCalculator/GraphCalculator';
import Legend from '../Legend/Legend';
import Canvas from '../Canvas/Canvas';
import GraphDrawer from '../GraphDrawer/GraphDrawer';
import NodeTooltip from '../NodeTooltip/NodeTooltip';
import NodePopup from '../NodePopup/NodePopup';
import OverlayPropertyTable from '../OverlayPropertyTable/OverlayPropertyTable';
import ActionLayer from '../ActionLayer/ActionLayer';

const DataDictionaryGraph = ({ graphType, source, onClearSearchResult }) => {
  return (
    <>
      <GraphCalculator graphType={graphType} />
      <Legend graphType={graphType} source={source} />
      <Canvas graphType={graphType}>
        <GraphDrawer graphType={graphType} />
      </Canvas>
      <NodeTooltip graphType={graphType} />
      <NodePopup graphType={graphType} />
      <OverlayPropertyTable graphType={graphType} />
      <ActionLayer graphType={graphType} />
    </>
  );
};

DataDictionaryGraph.propTypes = {
  graphType: PropTypes.string.isRequired,
  source: PropTypes.array,
  onClearSearchResult: PropTypes.func,
};

DataDictionaryGraph.defaultProps = {
  source: [],
  onClearSearchResult: () => {},
};

export default DataDictionaryGraph;
