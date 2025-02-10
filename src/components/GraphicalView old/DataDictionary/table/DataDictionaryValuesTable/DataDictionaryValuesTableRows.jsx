import React from 'react';
import PropTypes from 'prop-types';
import DataDictionarySynonymsTable from './DataDictionarySynonymsTable';
import './DataDictionaryValuesTable.css';

class DataDictionaryValuesTableRows extends React.Component {

  render() {

    if(this.props.syns.length === 0){
      return (
          <tr key={this.props.name + "-0"} className={this.props.trClassName}>
            <td className="data-dictionary-property-table__data">
              <div className="data-dictionary-property-table__span" dangerouslySetInnerHTML={{ __html: this.props.name }}>
              </div>
            </td>
            <td className="data-dictionary-property-table__data" dangerouslySetInnerHTML={{ __html: this.props.icdo }}>
            </td>
            <td className="data-dictionary-property-table__data">
            </td>
            <td className="data-dictionary-property-table__data">
            </td>
          </tr>
        );
    }

    let highlights = [];

    if(this.props.highlights["enum.value_ncit.ncit_synonyms.name"] || this.props.highlights["enum.value_ncit.ncit_synonyms.name.have"]){
        highlights = this.props.highlights["enum.value_ncit.ncit_synonyms.name"] || this.props.highlights["enum.value_ncit.ncit_synonyms.name.have"];
    }

    const rows = this.props.syns.map((syn, index) => {

      let ncit = "<a target=\"_blank\" href=\"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + syn.ncit_code + "\">" + syn.ncit_code + "</a>";

      if(this.props.highlights["enum.value_ncit.ncit_code"] || this.props.highlights["enum.value_ncit.ncit_code.have"]){
        let ncits = this.props.highlights["enum.value_ncit.ncit_code"] || this.props.highlights["enum.value_ncit.ncit_code.have"];
        ncits.forEach(function(nc){
          ncit = ncit.replace('>' + nc.replace(/<b>/g, '').replace(/<\/b>/g, '') + '<',  '>' + nc + '<');
        });
      }

      if(index === 0){
        return (
          <tr key={this.props.name + "-" + index} className={this.props.trClassName}>
            <td className="data-dictionary-property-table__data" rowSpan={this.props.syns.length}>
              <div className="data-dictionary-property-table__span" dangerouslySetInnerHTML={{ __html: this.props.name }}>
              </div>
            </td>
            <td className="data-dictionary-property-table__data" rowSpan={this.props.syns.length} dangerouslySetInnerHTML={{ __html: this.props.icdo }}>
            </td>
            <td className="data-dictionary-property-table__data" dangerouslySetInnerHTML={{ __html: ncit }}>
            </td>
            <td className="data-dictionary-property-table__data">
              <DataDictionarySynonymsTable label={syn.ncit_name} syns={syn.ncit_synonyms} highlights={highlights}/>
            </td>
          </tr>
        );
      }
      else{
        return (
          <tr key={this.props.name + "-" + index} className={this.props.trClassName}>
            <td className="data-dictionary-property-table__data" dangerouslySetInnerHTML={{ __html: ncit }}>
            </td>
            <td className="data-dictionary-property-table__data">
              <DataDictionarySynonymsTable label={syn.l}  syns={syn.s} highlights={highlights}/>
            </td>
          </tr>
        );
      }
    });

    return (
      <React.Fragment>
        {rows}
      </React.Fragment>
    );
  }
}

DataDictionaryValuesTableRows.propTypes = {
  trClassName: PropTypes.string,
  name: PropTypes.string,
  icod: PropTypes.string,
  syns: PropTypes.array,
  highlights: PropTypes.object,
};

DataDictionaryValuesTableRows.defaultProps = {
  trClassName: "",
  name: "",
  icod: "",
  syns: [],
  highlights: {}
};

export default DataDictionaryValuesTableRows;
