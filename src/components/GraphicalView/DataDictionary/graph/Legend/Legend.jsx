import React from 'react';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../../utils';
import { getCategoryIconSVG, getCategoryColor } from '../../NodeCategories/helper';
import './Legend.css';

class Legend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    };
  }

  toggleLegend = () => {
    this.setState(state => ({
      show: !state.show,
    }));
  }

  render() {
    return (
      <div className={`data-dictionary-graph-legend ${this.state.show ? '' : 'data-dictionary-graph-legend--toggled'}`}>
        {
          this.state.show ?
            (
              <React.Fragment>
                <i
                  className='data-dictionary-graph-legend__close g3-icon g3-icon--cross'
                  onClick={this.toggleLegend}
                  onKeyPress={this.toggleLegend}
                  role='button'
                  title='close' 
                  tabIndex={0}
                />
                <div className='data-dictionary-graph-legend__item body'>
                  <i className="data-dictionary-graph-legend__icon fas fa-minus"></i>
                  <span className='data-dictionary-graph-legend__text'>Relationships</span>
                </div>
                {
                  this.props.items.map((category) => {
                    const itemColor = getCategoryColor(category);
                    const IconSvg = getCategoryIconSVG(category);
                    return (
                      <div
                        key={category}
                        className='data-dictionary-graph-legend__item body'
                      >
                        <span className='data-dictionary-graph-legend__circle-wrapper'>
                          {
                            IconSvg ? <IconSvg /> : (
                              <span
                                className='data-dictionary-graph-legend__circle'
                                style={{ backgroundColor: itemColor }}
                              />
                            )
                          }
                        </span>
                        <span className='data-dictionary-graph-legend__text'>{this.props.graphType.indexOf("pcdc") == 0 ? category.toUpperCase() : capitalizeFirstLetter(category)}</span>
                      </div>
                    );
                  })
                }
              </React.Fragment>
            )
            : (
              <span
                className='data-dictionary-graph-legend__info'
                onClick={this.toggleLegend}
                onKeyPress={this.toggleLegend}
                role='button'
                title='Show Legend' 
                tabIndex={0}
              >
                <i className="data-dictionary-graph-legend__question-icon fas fa-question"></i>
              </span>
            )
        }
      </div>
    );
  }
}

Legend.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  graphType: PropTypes.string,
};

Legend.defaultProps = {
  items: [],
  graphType: "gdc"
};

export default Legend;
