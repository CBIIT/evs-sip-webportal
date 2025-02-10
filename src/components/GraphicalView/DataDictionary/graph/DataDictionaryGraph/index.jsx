import React from 'react';
import PropTypes from 'prop-types';
import GraphCalculator from '../GraphCalculator/GraphCalculator';
import Legend from '../Legend/Legend';
import Canvas from '../Canvas/Canvas';
import ReduxGraphDrawer from '../GraphDrawer/.';
import ReduxNodeTooltip from '../NodeTooltip/.';
import ReduxNodePopup from '../NodePopup/.';
import ReduxOverlayPropertyTable from '../OverlayPropertyTable/.';
import ReduxActionLayer from '../ActionLayer/.';

const DataDictionaryGraph = ({ graphType, source, onClearSearchResult }) => {
  return (
    <>
      <GraphCalculator graphType={graphType} />
      <Legend graphType={graphType} source={source} />
      <Canvas graphType={graphType}>
        <ReduxGraphDrawer graphType={graphType} />
      </Canvas>
      <ReduxNodeTooltip graphType={graphType} />
      <ReduxNodePopup graphType={graphType} />
      <ReduxOverlayPropertyTable graphType={graphType} />
      <ReduxActionLayer graphType={graphType} />
    </>
  );
};

DataDictionaryGraph.propTypes = {
  graphType: PropTypes.string.isRequired,
  source: PropTypes.object,
  onClearSearchResult: PropTypes.func,
};

DataDictionaryGraph.defaultProps = {
  source: null,
  onClearSearchResult: () => {},
};

export default DataDictionaryGraph;
