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
  getTitle = () => {
    if (this.props.isSearchMode) {
      const nodeTitleFragment = getNodeTitleFragment(
        this.props.matchedResult.matches,
        this.props.node.title,
        'overlay-property-table__span',
      );
      return nodeTitleFragment;
    }

    return this.props.node.title;
  };

  getDescription = () => {
    if (this.props.isSearchMode) {
      const nodeDescriptionFragment = getNodeDescriptionFragment(
        this.props.matchedResult.matches,
        this.props.node.description,
        'overlay-property-table__span',
      );
      return nodeDescriptionFragment;
    }

    return this.props.node.description;
  };

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

  /**
   * Toggle the property table data row to display values for that property
   */
  async toggleValuesBox(e, type, category, node , property) {
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
      if(type == 'gdc' || type == 'gdc_readonly'){
        let rs = await apiGetGDCDataById(property + "/" + node + "/" + category);
        if(rs[0]._source.enum){
          rs[0]._source.enum.forEach(function(item){
            let tmp = {};
            tmp.name = item.n;
            tmp.ncit = "";
            if(item.n_syn){
              item.n_syn.forEach(function(ncit){
                tmp.ncit += ncit.n_c + "<br>";
              });
            }
            values.push(tmp);
          });
        }
        
        values.forEach(function(v){
          vs_html += '<tr>'+
                  '<td class="data-dictionary-property-table__data">'+
                    '<div class="data-dictionary-property-table__span">'+ v.name +'</div>'+
                  '</td>'+
                  '<td class="data-dictionary-property-table__data">'+
                    v.ncit+
                  '</td>'+
                '</tr>';
        });

      }
      else{
        values = await apiGetPropertyValues(type, node , property);
        values.forEach(function(v){
          vs_html += '<tr>'+
                  '<td class="data-dictionary-property-table__data">'+
                    '<div class="data-dictionary-property-table__span">'+ v +'</div>'+
                  '</td>'+
                  '<td class="data-dictionary-property-table__data">'+
                    'TODO...'+
                  '</td>'+
                '</tr>';
        });
      }

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
                '<th class="data-dictionary-property-table__data data-dictionary-property-table__data--type">NCIt Code</th>'+
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
                {
                  this.props.isSearchMode && (
                    <Button
                      className='overlay-property-table__toggle-node'
                      onClick={searchedNodeNotOpened
                        ? this.handleOpenAllProperties : this.handleDisplayOnlyMatchedProperties}
                      label={searchedNodeNotOpened ? 'See All' : 'See Only Matched'}
                      buttonType='secondary'
                    />
                  )
                }
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
  matchedResult: SearchResultItemShape,
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
