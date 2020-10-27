import { connect } from 'react-redux';
import { clickBlankSpace, setCanvasBoundingRect, setNeedReset } from '../../action';
import Canvas from './Canvas';

const ReduxCanvas = (() => {
  const mapStateToProps = (state, ownProps) => ({
    isGraphView: state.ddgraph[ownProps.graphType].isGraphView,
    needReset: state.ddgraph[ownProps.graphType].needReset,
    graphType: ownProps.graphType,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onClickBlankSpace: () => dispatch(clickBlankSpace(ownProps.graphType)),
    onCanvasBoundingBoxUpdate:
      canvasBoundingRect => dispatch(setCanvasBoundingRect(ownProps.graphType, canvasBoundingRect)),
    onResetCanvasFinished: () => dispatch(setNeedReset(ownProps.graphType, false)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Canvas);
})();

export default ReduxCanvas;
