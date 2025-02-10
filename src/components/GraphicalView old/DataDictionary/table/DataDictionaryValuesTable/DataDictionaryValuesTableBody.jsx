import React from 'react';
import PropTypes from 'prop-types';
import { apiGetPropertyValues  } from '../../../../../api';
import DataDictionaryValuesTableRows from './DataDictionaryValuesTableRows';
import './DataDictionaryValuesTable.css';

class DataDictionaryValuesTableBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      values: []
    };
  }

  async componentDidMount() {
    let values = [];
    let original_source = this.props.source.replace("_readonly","");

    // gdc.demographic.cause_of_death
    let PropertyValuesID = original_source + "." + this.props.node + "." + this.props.property
    let rs = await apiGetPropertyValues(PropertyValuesID);

    // let rs = await apiGetPropertyValues(this.props.property + "/" + this.props.node + "/" + this.props.category + "/" + original_source);
    rs.forEach(function(item){
      let tmp = {};
      tmp.name = item.value_name;
      tmp.ncit = item.value_ncit;
      tmp.syns = [];
      tmp.icdo = "";
      // if(item.value_ncit?.length !== 0){
      //   tmp.ncit = item.value_ncit[0].ncit_code;
      // }
      if(item.value_icdo3?.length !== 0){
        tmp.icdo = item.value_icdo3[0].icdo3_code;
      }
      values.push(tmp);
    });

    this.setState({
      values: values
    });
  }

  render() {


    const body = this.state.values.map((v, index) => {
      let trClassName = "display-row";
      return (
        <DataDictionaryValuesTableRows trClassName={trClassName} name={v.name} icdo={v.icdo} syns={v.ncit} />
      );
    });
    return (
      <React.Fragment>
        <div class="data-dictionary-node__property-summary">
          <span>{this.props.property} has {this.state.values.length} values. </span>
        </div>
        <div class="data-dictionary-property-table ">
          <table class="data-dictionary-property-table__table">
            <thead class="data-dictionary-property-table__head">
              <tr class="data-dictionary-property-table__row">
                <th class="data-dictionary-property-table__data values-column">Values</th>
                <th class="data-dictionary-property-table__data icdo-column">ICD-O-3 Code</th>
                <th class="data-dictionary-property-table__data ncit-column">Mapped NCIt Code</th>
                <th class="data-dictionary-property-table__data syns-column">NCIt Preferred Term</th>
              </tr>
            </thead>
            <tbody>
              {body}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

DataDictionaryValuesTableBody.propTypes = {
  property: PropTypes.string,
  node: PropTypes.string,
  category: PropTypes.string,
  source: PropTypes.string,
};

DataDictionaryValuesTableBody.defaultProps = {
  property: "",
  node: "",
  category: "",
  source: "",
};

export default DataDictionaryValuesTableBody;
