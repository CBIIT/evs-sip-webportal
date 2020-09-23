import React from 'react';
import PropTypes from 'prop-types';
import { apiGetPropertyValues  } from '../../../../../api';
import DataDictionarySynonymsTable from './DataDictionarySynonymsTable';
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
    let rs = await apiGetPropertyValues(this.props.property + "/" + this.props.node + "/" + this.props.category + "/" + original_source);
    rs.forEach(function(item){
      let tmp = {};
      tmp.name = item.n;
      tmp.ncit = "";
      tmp.syns = [];
      tmp.icdo = "";
      if(item.icdo){
        tmp.icdo = item.icdo.c;
      }
      if(item.ncit){
        item.ncit.forEach(function(nc){
          tmp.ncit += "<a target=\"_blank\" href=\"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + nc.c + "\">" + nc.c + "</a><br>";
          tmp.syns.push(nc.s);
        });
      }
      values.push(tmp);
    });

    this.setState({
      values: values
    });
  }

  render() {
    const body = this.state.values.map((v, index) => {
      const pt_html = v.syns.map((syn, index) => {
        return (
          <DataDictionarySynonymsTable syns={syn} />
        );
      });
      return (
        <tr>
          <td className="data-dictionary-property-table__data">
            <div className="data-dictionary-property-table__span" dangerouslySetInnerHTML={{ __html: v.name }}>
            </div>
          </td>
          <td className="data-dictionary-property-table__data" dangerouslySetInnerHTML={{ __html: v.icdo }}>
          </td>
          <td className="data-dictionary-property-table__data" dangerouslySetInnerHTML={{ __html: v.ncit }}>
          </td>
          <td className="data-dictionary-property-table__data">
            {pt_html}
          </td>
        </tr>
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
