import React from 'react';
import PropTypes from 'prop-types';
import Button from '@gen3/ui-component/dist/components/Button';
import { apiGetGDCDataById, apiGetPropertyValues  } from '../../../../../api';
import DataDictionaryValuesTableBody from './DataDictionaryValuesTableBody';
import DataDictionarySynonymsTable from './DataDictionarySynonymsTable';
import './DataDictionaryValuesTable.css';

class DataDictionaryValuesTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      matched_show_all: false
    };
  }
  
  switchValuesList = (e) => {
    const matched_show_all = this.state.matched_show_all;
    this.setState({
      matched_show_all : !matched_show_all
    });
  }

  valuesBox(enums, hits){
      let values = [];
      let count = 0;
      enums.forEach(function(item){
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
            nc.s.forEach(function(syn){
              if(syn.t == 'PT' && syn.src == "NCI"){
                tmp.pt += syn.n + "<br>";
              }
            });
          });
        }
        tmp.matched = false;
        values.push(tmp);
      });

      //consolidate matched values
      hits.forEach((hit) => {
        let tmp = values[hit._nested.offset];
        tmp.matched = true;
        tmp.matched_fields = hit.highlight;
        if(tmp.matched_fields["enum.n"] || tmp.matched_fields["enum.n.have"]){
          tmp.name = tmp.matched_fields["enum.n"] || tmp.matched_fields["enum.n.have"];
        }
        if(tmp.matched_fields["enum.icdo.c"] || tmp.matched_fields["enum.icdo.have"]){
          tmp.icdo = tmp.matched_fields["enum.icdo.c"] || tmp.matched_fields["enum.icdo.have"][tmp.matched_fields["enum.icdo.have"].length -1];
        }
        if(tmp.matched_fields["enum.ncit.c"] || tmp.matched_fields["enum.ncit.c.have"]){
          let ncits = tmp.matched_fields["enum.ncit.c"] || tmp.matched_fields["enum.ncit.c.have"];
          ncits.forEach(function(nc){
            tmp.ncit = tmp.ncit.replace('>' + nc.replace(/<b>/g, '').replace(/<\/b>/g, '') + '<',  '>' + nc + '<');
          });
        }
        /*
        if(tmp.matched_fields["enum.ncit.s.n"] || tmp.matched_fields["enum.ncit.s.n.have"]){
          let syns = tmp.matched_fields["enum.ncit.s.n"] || tmp.matched_fields["enum.ncit.s.n.have"];
          syns.forEach(function(syn){
            tmp.pt = tmp.pt.replace(syn.replace(/<b>/g, '').replace(/<\/b>/g, ''),  syn);
          });
        }
        */
      });
      
      const vs_html = values.map((v, index) => {
        if(v.matched){
          let highlights = v.matched_fields["enum.ncit.s.n"] || v.matched_fields["enum.ncit.s.n.have"];
          const pt_html = v.syns.map((syn, index) => {
            return (
              <DataDictionarySynonymsTable syns={syn} highlights={highlights}/>
            );
          });
          return (
            <tr key={index} className="matched-row">
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
        }
        else{
          const pt_html = v.syns.map((syn, index) => {
            return (
              <DataDictionarySynonymsTable syns={syn} />
            );
          });
          return (
            <tr key={index} className={this.state.matched_show_all ? "display-row" : "hidden-row"}>
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
        }
      });
      return vs_html;
  }

  render() {
    if (!this.props.open) return (<React.Fragment />);

    if(this.props.type == 'all'){
      return (
        <tr className="values-row">
          <td colSpan="5" className="data-dictionary-property-table__data">
            <div className="data-dictionary-node__property">
              <span className="data-dictionary-node__property-close" onClick={() => this.props.closeTab(this.props.property)}>Close tab<i class="g3-icon g3-icon--cross data-dictionary-node__property-close-icon"></i></span>
              <DataDictionaryValuesTableBody 
                source={this.props.source}
                category={this.props.category}
                node={this.props.node}
                property={this.props.property}
              />
            </div>
          </td>
        </tr>
      );
    }
    else{
      const t = this.valuesBox(this.props.enum, this.props.hits);
      return (
        <tr className="values-row">
          <td colSpan="5" className="data-dictionary-property-table__data">
            <div className="data-dictionary-node__property">
              <span className="data-dictionary-node__property-close" onClick={() => this.props.closeTab(this.props.property)}>Close tab<i class="g3-icon g3-icon--cross data-dictionary-node__property-close-icon"></i></span>
              <div class="data-dictionary-node__property-summary">
                <span>{this.props.hits.length} Values Matched Out of {this.props.enum.length} . </span>
                <Button
                  className='data-dictionary-values-table__toggle-button g3-button g3-button--secondary'
                  onClick={(e) => this.switchValuesList(e)}
                  label={this.state.matched_show_all ? "Show Matched Values" : "Show All Values"}
                  buttonType='secondary'
                />
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
                    {t}
                  </tbody>
                </table>
              </div>
            </div>
          </td>
        </tr>
      );
    }
  }
}

DataDictionaryValuesTable.propTypes = {
  open: PropTypes.bool,
  enum: PropTypes.array,
  hits: PropTypes.array,
  source: PropTypes.string,
  category: PropTypes.string,
  node: PropTypes.string,
  property: PropTypes.string,
  hasValues: PropTypes.bool,
  type: PropTypes.string,
  closeTab: PropTypes.func,
};

DataDictionaryValuesTable.defaultProps = {
  open: false,
  enum: [],
  hits: [],
  source: "",
  category: "",
  node: "",
  property: "",
  hasValues: false,
  type: "all",
  closeTab: () => {},
};

export default DataDictionaryValuesTable;