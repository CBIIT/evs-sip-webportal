import React from 'react';
import PropTypes from 'prop-types';
import { SearchResultItemShape } from '../../utils';
import {
  getMatchesSummaryForProperties,
  getPropertyNameFragment,
  getPropertyDescriptionFragment,
  getPropertyTypeFragment,
} from '../../highlightHelper';
import Button from '@gen3/ui-component/dist/components/Button';
import './DataDictionaryPropertyTable.css';

class DataDictionaryPropertyTable extends React.Component {
  render() {
    const borderModifier = this.props.hasBorder ? ''
      : 'data-dictionary-property-table--without-border';
    const propertyKeysList = this.props.hideIsRequired ? Object.keys(this.props.properties)
      : Object.keys(this.props.properties)
        .sort((k1, k2) => {
          const required1 = this.props.requiredProperties.includes(k1);
          const required2 = this.props.requiredProperties.includes(k2);
          if (required1) return -1;
          if (required2) return 1;
          return 0;
        });
    const needHighlightSearchResult = this.props.onlyShowMatchedProperties
      || this.props.needHighlightSearchResult;
    const matchedPropertiesSummary = needHighlightSearchResult
      ? getMatchesSummaryForProperties(
        this.props.properties,
        this.props.matchedResult.matches,
      ) : [];
    return (
      <div className={`data-dictionary-property-table ${borderModifier}`}>
        <table className='data-dictionary-property-table__table'>
          <thead className='data-dictionary-property-table__head head-top-line'>
            <tr>
              <th
                className='data-dictionary-property-table__data sticky-table__head 
                data-dictionary-property-table__data--property'
              >
                Property
              </th>
              <th
                className='data-dictionary-property-table__data sticky-table__head type-col-width 
                data-dictionary-property-table__data--type'
              >
                Type
              </th>
              {
                !this.props.hideIsRequired && (
                  <th
                    className='data-dictionary-property-table__data sticky-table__head required-col-width 
                    data-dictionary-property-table__data--required'
                  >
                    Required
                  </th>
                )
              }
              <th
                className='data-dictionary-property-table__data sticky-table__head 
                data-dictionary-property-table__data--description'
              >
                Description
              </th>
              <th
                className='data-dictionary-property-table__data sticky-table__head 
                data-dictionary-property-table__data--term'
              >
                
              </th>
            </tr>
          </thead>
          <tbody>
            {
              propertyKeysList.map((propertyKey) => {
                const property = this.props.properties[propertyKey];
                let nameMatch = null;
                let descriptionMatch = null;
                let typeMatchList = null;
                if (this.props.needHighlightSearchResult) {
                  const matchedSummaryItem = matchedPropertiesSummary
                    .find(item => item.propertyKey === propertyKey);
                  if (matchedSummaryItem) {
                    nameMatch = matchedSummaryItem.nameMatch;
                    descriptionMatch = matchedSummaryItem.descriptionMatch;
                    typeMatchList = matchedSummaryItem.typeMatchList;
                  } else if (this.props.onlyShowMatchedProperties) {
                    return null;
                  }
                }
                let termID = '';
                let termLink = '';
                let type='';
                if ('src' in property) {
                  try{termID = property.src;
                    termLink = property.term.termDef && property.term.termDef.term_url;}catch(err){}
                  
                }
                const propertyNameFragment = getPropertyNameFragment(
                  propertyKey,
                  nameMatch,
                  'data-dictionary-property-table__span',
                );
                if('type' in property){
                  try{
                    type = property.type;}catch(err){}
                  
                }
               
                const propertyDescriptionFragment = getPropertyDescriptionFragment(
                  property,
                  descriptionMatch,
                  'data-dictionary-property-table__span',
                );
                const isRequired = this.props.requiredProperties.includes(propertyKey);
                return (
                  <tr key={propertyKey} className="data-dictionary-property-table__row" onClick={(e) => this.props.toggleValuesBox(e, this.props.source, this.props.category, this.props.nodeID, propertyKey)}>
                    <td className='data-dictionary-property-table__data'>
                      {propertyNameFragment}
                    </td>
                    <td className='data-dictionary-property-table__data type-col-width'>
                    <p>{JSON.stringify(type)}</p>
                    </td>
                    {
                      !this.props.hideIsRequired && (
                        <td className='data-dictionary-property-table__data'>
                          { isRequired ? (
                            <span className='data-dictionary-property-table__required'>
                              <i className='g3-icon g3-icon--star data-dictionary-property-table__required-icon' />Required
                            </span>
                          ) : (
                            <span>No</span>
                          )
                          }
                        </td>
                      )
                    }
                    <td className='data-dictionary-property-table__data'>
                    <p>{propertyDescriptionFragment}</p>
                    </td>
                    <td className='data-dictionary-property-table__data'>
                      <Button
                        className='data-dictionary-property-table__button'
                        onClick={(e) => this.props.toggleValuesBox(e, this.props.source, this.props.category, this.props.nodeID, propertyKey)}
                        label='All Values'
                        buttonType='secondary'
                      />
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

DataDictionaryPropertyTable.propTypes = {
  properties: PropTypes.object.isRequired,
  requiredProperties: PropTypes.array,
  hasBorder: PropTypes.bool,
  needHighlightSearchResult: PropTypes.bool,
  matchedResult: SearchResultItemShape,
  toggleValuesBox: PropTypes.func,
  nodeID: PropTypes.string,
  category: PropTypes.string,
  source: PropTypes.string,
  hideIsRequired: PropTypes.bool,
  onlyShowMatchedProperties: PropTypes.bool,
};

DataDictionaryPropertyTable.defaultProps = {
  requiredProperties: [],
  hasBorder: true,
  needHighlightSearchResult: false,
  matchedResult: {},
  toggleValuesBox: () => {},
  nodeID: "",
  category: "",
  source: "",
  hideIsRequired: false,
  onlyShowMatchedProperties: false,
};

export default DataDictionaryPropertyTable;
