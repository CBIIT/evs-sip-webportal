import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { ListGroup } from 'react-bootstrap';
import { capitalizeFirstLetter } from '../../../utils';
import { getCategoryIconSVG, getCategoryColor } from '../../NodeCategories/helper';
import { apiGetPCDCDictionary } from '../../../../../api';
import { getSearchResult, getSearchSummary } from '../../search/DictionarySearcher/searchHelper';
import {
  initiateGraph,
  setSearchResult,
  saveCurrentProject,
} from '../../action';
import './Legend.css';

const Legend = ({ graphType, source }) => {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();

  const legendItems = useSelector(state => state.dataDictionary[graphType].legendItems);
  const currentProject = useSelector(state => state.dataDictionary[graphType].currentProject);

  const toggleLegend = () => {
    setShow(prevShow => !prevShow);
  };

  useEffect(() => {
    if (currentProject !== "") {
      switchProject(currentProject);
    }
  }, [currentProject]);

  const switchProject = async (project) => {
    if (graphType.indexOf("pcdc") === 0) {
      const dict = await apiGetPCDCDictionary(project);
      dispatch(initiateGraph(graphType, dict));

      if (graphType === "pcdc") {
        const result = getSearchResult(graphType, source, project);
        if (!result || result.length === 0) {
          dispatch(setSearchResult(graphType, [], []));
          return;
        }
        const summary = getSearchSummary(result);
        dispatch(setSearchResult(graphType, result, summary));
      }

      dispatch(saveCurrentProject(graphType, project));
    }
  };

  const renderPCDCLegend = () => {
    const current_project = currentProject === "" ? "AML" : currentProject;
    const projects = ["AML", "EWS", "GCT", "ALL", "HL", "OS"];

    return (
      <ListGroup defaultActiveKey="#link0">
        {projects.map((project) => {
          const itemColor = getCategoryColor(project.toLowerCase());
          const IconSvg = getCategoryIconSVG(project.toLowerCase());
          const active = current_project === project;
          return (
            <ListGroup.Item key={project} onClick={() => switchProject(project)} active={active}>
              <div className='data-dictionary-graph-legend__item body'>
                <span className='data-dictionary-graph-legend__circle-wrapper'>
                  {IconSvg ? (
                    <IconSvg fill={itemColor} />
                  ) : (
                    <span
                      className='data-dictionary-graph-legend__circle'
                      style={{ backgroundColor: itemColor }}
                    />
                  )}
                </span>
                <span className='data-dictionary-graph-legend__text'>
                  {project.toUpperCase()}
                </span>
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  };

  const renderStandardLegend = () => {
    return legendItems.map((category) => {
      const itemColor = getCategoryColor(category);
      const IconSvg = getCategoryIconSVG(category);
      return (
        <div
          key={category}
          className='data-dictionary-graph-legend__item body'
        >
          <span className='data-dictionary-graph-legend__circle-wrapper'>
            {IconSvg ? (
              <IconSvg />
            ) : (
              <span
                className='data-dictionary-graph-legend__circle'
                style={{ backgroundColor: itemColor }}
              />
            )}
          </span>
          <span className='data-dictionary-graph-legend__text'>
            {capitalizeFirstLetter(category)}
          </span>
        </div>
      );
    });
  };

  return (
    <div className={`data-dictionary-graph-legend ${show ? '' : 'data-dictionary-graph-legend--toggled'}`}>
      {show ? (
        <>
          <i
            className='data-dictionary-graph-legend__close g3-icon g3-icon--cross'
            onClick={toggleLegend}
            onKeyPress={toggleLegend}
            role='button'
            title='close'
            tabIndex={0}
          />
          {graphType.indexOf("pcdc") === 0 ? (
            <div className='data-dictionary-graph-legend__item body'>
              <span style={{ fontWeight: "bold" }}>Projects</span>
            </div>
          ) : (
            <div className='data-dictionary-graph-legend__item body'>
              <i className="data-dictionary-graph-legend__icon fas fa-minus"></i>
              <span className='data-dictionary-graph-legend__text'>Relationships</span>
            </div>
          )}
          {graphType.indexOf("pcdc") === 0 ? renderPCDCLegend() : renderStandardLegend()}
        </>
      ) : (
        <span
          className='data-dictionary-graph-legend__info'
          onClick={toggleLegend}
          onKeyPress={toggleLegend}
          role='button'
          title='Show Legend'
          tabIndex={0}
        >
          <i className="data-dictionary-graph-legend__question-icon fas fa-question"></i>
        </span>
      )}
    </div>
  );
};

Legend.propTypes = {
  graphType: PropTypes.string.isRequired,
  source: PropTypes.object,
};

Legend.defaultProps = {
  source: [],
};

export default Legend;
