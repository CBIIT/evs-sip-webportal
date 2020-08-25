import { connect } from 'react-redux';
import ActionLayer from './ActionLayer';

const ReduxActionLayer = (() => {
  const mapStateToProps = (state, ownProps) => ({
    isSearchMode: state.ddgraph[ownProps.graphType].isSearchMode,
  });

  return connect(mapStateToProps)(ActionLayer);
})();

export default ReduxActionLayer;
