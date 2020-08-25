import { connect } from 'react-redux';
import Legend from './Legend';

const ReduxLegend = (() => {
  const mapStateToProps = (state, ownProps) => ({
    items: state.ddgraph[ownProps.graphType].legendItems,
  });

  return connect(mapStateToProps)(Legend);
})();

export default ReduxLegend;
