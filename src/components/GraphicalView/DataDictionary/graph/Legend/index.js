import { connect } from "react-redux";
import { initiateGraph } from "../../action.js";
import Legend from "./Legend";

const ReduxLegend = (() => {
  const mapStateToProps = (state, ownProps) => ({
    items: state.ddgraph[ownProps.graphType].legendItems,
    graphType: ownProps.graphType,
  });

  const mapDispatchToProps = (dispatch, ownProps) => ({
    onInitiateGraph: (dictionary) =>
      dispatch(initiateGraph(ownProps.graphType, dictionary)),
  });

  return connect(mapStateToProps, mapDispatchToProps)(Legend);
})();

export default ReduxLegend;
