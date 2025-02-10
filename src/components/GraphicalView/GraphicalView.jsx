import React from "react";
import PropTypes from "prop-types";
import DataDictionary from "./DataDictionary/DataDictionary";

const GraphicalView = ({ type: graphType, keyword, source }) => {
  if (graphType.indexOf("readonly") > 0) {
    return <DataDictionary graphType={graphType} />;
  }
  
  return (
    <DataDictionary
      graphType={graphType}
      keyword={keyword}
      source={source}
    />
  );
};

GraphicalView.propTypes = {
  type: PropTypes.string.isRequired,
  keyword: PropTypes.string,
  source: PropTypes.object,
};

GraphicalView.defaultProps = {
  keyword: "",
  source: null,
};

export default GraphicalView;
