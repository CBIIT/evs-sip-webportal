import React from 'react';
import PropTypes from 'prop-types';
import Button from '@gen3/ui-component/dist/components/Button';
import { downloadTemplate, SearchResultItemShape } from '../../utils';
import { getCategoryIconSVG } from '../../NodeCategories/helper';
import {
  getNodeDescriptionFragment,
  getNodeTitleFragment,
} from '../../highlightHelper';
import DataDictionaryPropertyTable from '../../table/DataDictionaryPropertyTable/.';
import { apiGetGDCDataById, apiGetPropertyValues  } from '../../../../../api';
import './OverlayPropertyTable.css';

class OverlayPropertyTable extends React.Component {

  /**
   * Close the whole overlay property table
   */
  handleClose = () => {
    this.props.onCloseOverlayPropertyTable();
  };

  /**
   * Toggle the property tabl to display all properties
   */
  handleOpenAllProperties = () => {
    this.props.onOpenMatchedProperties();
  };

  /**
   * Toggle the property table to display matched properties only
   */
  handleDisplayOnlyMatchedProperties = () => {
    this.props.onCloseMatchedProperties();
  };

  toggleMatchedValuesBox(e, enums, hits, open){
    if(!open) {
      return;
    }
    e.stopPropagation();
    let obj = e.target;
    let tr = obj.closest(".data-dictionary-property-table__row");

    let next_sibling = tr.nextSibling;

    if(next_sibling && next_sibling.className == "values-row"){
      next_sibling.remove();
    }
    else{
      let values = [];
      let vs_html = "";
      let count = 0;
      enums.forEach(function(item){
        let tmp = {};
        tmp.name = item.n;
        tmp.ncit = "";
        tmp.pt = "";
        tmp.icdo = "";
        if(item.icdo){
          tmp.icdo = item.icdo.c;
        }
        if(item.ncit){
          item.ncit.forEach(function(nc){
            tmp.ncit += "<a target=\"_blank\" href=\"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + nc.c + "\">" + nc.c + "</a><br>";
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
        if(tmp.matched_fields["enum.icdo"] || tmp.matched_fields["enum.icdo.have"]){
          tmp.icdo = tmp.matched_fields["enum.icdo"] || tmp.matched_fields["enum.icdo.have"];
        }
        if(tmp.matched_fields["enum.ncit.c"] || tmp.matched_fields["enum.ncit.c.have"]){
          let ncits = tmp.matched_fields["enum.ncit.c"] || tmp.matched_fields["enum.ncit.c.have"];
          ncits.forEach(function(nc){
            tmp.ncit = tmp.ncit.replace('>' + nc.replace(/<b>/g, '').replace(/<\/b>/g, '') + '<',  '>' + nc + '<');
          });
          console.log(tmp.ncit);
        }
        if(tmp.matched_fields["enum.ncit.s.n"] || tmp.matched_fields["enum.ncit.s.n.have"]){
          let syns = tmp.matched_fields["enum.ncit.s.n"] || tmp.matched_fields["enum.ncit.s.n.have"];
          syns.forEach(function(syn){
            tmp.pt = tmp.pt.replace(syn.replace(/<b>/g, '').replace(/<\/b>/g, ''),  syn);
          });
        }
      });
      
      values.forEach(function(v){
        if(v.matched){
          vs_html += '<tr class="matched-row">';
          vs_html += '<td class="data-dictionary-property-table__data">'+
                  '<div class="data-dictionary-property-table__span">'+ v.name +'</div>'+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.icdo+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.ncit+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.pt+
                '</td>'+
              '</tr>';
        }
        else{
          vs_html += '<tr class="hidden-row">';
          vs_html += '<td class="data-dictionary-property-table__data">'+
                  '<div class="data-dictionary-property-table__span">'+ v.name +'</div>'+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.icdo+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.ncit+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.pt+
                '</td>'+
              '</tr>';
        }
        
      });

      let new_tr = document.createElement("tr");
      new_tr.className = "values-row";
      let new_td = document.createElement("td");
      new_td.colSpan = "5";
      new_td.className = "data-dictionary-property-table__data";

      let content = '<div class="data-dictionary-node__property">'+
        '<span class="data-dictionary-node__property-close" role="button" tabindex="0" onclick="this.closest(\'.values-row\').remove()">Close tab<i class="g3-icon g3-icon--cross data-dictionary-node__property-close-icon"></i></span>'+
        '<div class="data-dictionary-node__property-summary">'+
          '<span>' + hits.length + ' Values Matched Out of ' + enums.length + ' . </span>'+
          '<Button class="data-dictionary-values-table__toggle-button g3-button g3-button--secondary" value="all" onClick="javascript: window.switchValuesList(this);" buttonType="secondary">Show All Values</Button>' +
        '</div>'+
        '<div class="data-dictionary-property-table ">'+
          '<table class="data-dictionary-property-table__table">'+
            '<thead class="data-dictionary-property-table__head">'+
              '<tr class="data-dictionary-property-table__row">'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--property">Values</th>'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--type">ICD-O-3 Code</th>'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--type">Mapped NCIt Code</th>'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--type">NCIt Preferred Term</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
              vs_html +
            '</tbody>'+
          '</table>'+
        '</div>'+
      '</div>';

      new_td.innerHTML = content;
      new_tr.append(new_td);
      tr.after(new_tr);
    }
  }

  /**
   * Toggle the property table data row to display values for that property
   */
  async toggleValuesBox(e, source, category, node , property, open) {
    if(!open) {
      return;
    }
    e.stopPropagation();
    let obj = e.target;
    let tr = obj.closest(".data-dictionary-property-table__row");

    let next_sibling = tr.nextSibling;

    if(next_sibling && next_sibling.className == "values-row"){
      next_sibling.remove();
    }
    else{
      let values = [];
      let vs_html = "";
      let original_source = source.replace("_readonly","");
      let rs = await apiGetPropertyValues(property + "/" + node + "/" + category + "/" + original_source);
      rs.forEach(function(item){
        let tmp = {};
        tmp.name = item.n;
        tmp.ncit = "";
        tmp.pt = "";
        tmp.icdo = "";
        if(item.icdo){
          tmp.icdo = item.icdo.c;
        }
        if(item.ncit){
          item.ncit.forEach(function(nc){
            tmp.ncit += "<a target=\"_blank\" href=\"https://ncit.nci.nih.gov/ncitbrowser/pages/concept_details.jsf?dictionary=NCI_Thesaurus&code=" + nc.c + "\">" + nc.c + "</a><br>";
            nc.s.forEach(function(syn){
              if(syn.t == 'PT' && syn.src == "NCI"){
                tmp.pt += syn.n + "<br>";
              }
            });
          });
        }
        values.push(tmp);
      });
      
      values.forEach(function(v){
        vs_html += '<tr>'+
                '<td class="data-dictionary-property-table__data">'+
                  '<div class="data-dictionary-property-table__span">'+ v.name +'</div>'+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.icdo+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.ncit+
                '</td>'+
                '<td class="data-dictionary-property-table__data">'+
                  v.pt+
                '</td>'+
              '</tr>';
      });

      let new_tr = document.createElement("tr");
      new_tr.className = "values-row";
      let new_td = document.createElement("td");
      new_td.colSpan = "5";
      new_td.className = "data-dictionary-property-table__data";

      let content = '<div class="data-dictionary-node__property">'+
        '<span class="data-dictionary-node__property-close" role="button" tabindex="0" onclick="this.closest(\'.values-row\').remove()">Close tab<i class="g3-icon g3-icon--cross data-dictionary-node__property-close-icon"></i></span>'+
        '<div class="data-dictionary-node__property-summary">'+
          '<span>' + property + ' has ' + values.length + ' values. </span>'+
        '</div>'+
        '<div class="data-dictionary-property-table ">'+
          '<table class="data-dictionary-property-table__table">'+
            '<thead class="data-dictionary-property-table__head">'+
              '<tr class="data-dictionary-property-table__row">'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--property">Values</th>'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--type">ICD-O-3 Code</th>'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--type">Mapped NCIt Code</th>'+
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--type">NCIt Preferred Term</th>'+
              '</tr>'+
            '</thead>'+
            '<tbody>'+
              vs_html +
            '</tbody>'+
          '</table>'+
        '</div>'+
      '</div>';

      new_td.innerHTML = content;
      new_tr.append(new_td);
      tr.after(new_tr);
    }
    
  }

  render() {
    if (!this.props.node || this.props.hidden) return (<React.Fragment />);
    const IconSVG = getCategoryIconSVG(this.props.node.category);
    const searchedNodeNotOpened = this.props.isSearchMode && !this.props.isSearchResultNodeOpened;
    const needHighlightSearchResult = this.props.isSearchMode;
    return (
      <div className='overlay-property-table'>
        <div className='overlay-property-table__background' />
        <div className='overlay-property-table__fixed-container'>
          <div className='overlay-property-table__content'>
            <div className='overlay-property-table__header'>
              <div className='overlay-property-table__category'>
                <IconSVG className='overlay-property-table__category-icon' />
                <h4 className='overlay-property-table__category-text'>{this.props.node.category} / {this.props.node.id}</h4>
                <span
                  className='overlay-property-table__close'
                  onClick={this.handleClose}
                  onKeyPress={this.handleClose}
                  role='button'
                  tabIndex={0}
                >
                  Close
                  <i className='overlay-property-table__close-icon g3-icon g3-icon--cross g3-icon--sm' />
                </span>
                
              </div>
              
            </div>
            <div className='overlay-property-table__property'>
              <DataDictionaryPropertyTable
                properties={this.props.node.properties}
                requiredProperties={this.props.node.required}
                hasBorder={false}
                onlyShowMatchedProperties={searchedNodeNotOpened}
                needHighlightSearchResult={needHighlightSearchResult}
                hideIsRequired={searchedNodeNotOpened}
                matchedResult={this.props.matchedResult}
                toggleValuesBox={this.toggleValuesBox}
                toggleMatchedValuesBox={this.toggleMatchedValuesBox}
                nodeID={this.props.node.id}
                category={this.props.node.category}
                source={this.props.graphType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

OverlayPropertyTable.propTypes = {
  hidden: PropTypes.bool,
  node: PropTypes.object,
  onCloseOverlayPropertyTable: PropTypes.func,
  isSearchMode: PropTypes.bool,
  matchedResult: PropTypes.object,
  onOpenMatchedProperties: PropTypes.func,
  onCloseMatchedProperties: PropTypes.func,
  isSearchResultNodeOpened: PropTypes.bool,
  graphType: PropTypes.string
};

OverlayPropertyTable.defaultProps = {
  hidden: true,
  node: null,
  onCloseOverlayPropertyTable: () => {},
  isSearchMode: false,
  matchedResult: {},
  onOpenMatchedProperties: () => {},
  onCloseMatchedProperties: () => {},
  isSearchResultNodeOpened: false,
  graphType: ''
};

export default OverlayPropertyTable;
