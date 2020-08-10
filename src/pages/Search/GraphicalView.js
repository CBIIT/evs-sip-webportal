import React from 'react';
import styled from 'styled-components';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': false,  // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
        model: $(go.GraphLinksModel,
          {
            linkKeyProperty: 'key'  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
          })
      });

  // define a simple Node template
  diagram.nodeTemplate =
    $(go.Node, 'Auto',  // the Shape will go around the TextBlock
      { selectionAdorned: false,
        selectionChanged: function(node){
          var shape = node.findObject("SHAPE");
          if(node.isSelected){
            shape.fill = "red";
          }
          else{
            shape.fill = node.data.color;
          }
        },
        click: function(e, obj) { 
          showMessage(obj.part.data.text + " Details...");
        }
      },
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, 'Ellipse',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0 },
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: false, stroke: "white",textAlign: "center"},  // some room around the text
        new go.Binding('text').makeTwoWay()
      )
    );

    //diagram.isReadOnly = true;

  return diagram;
}

function showMessage(s) {
  window.alert(s);
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes) {
  console.log('GoJS model changed!');
}

const GraphicalView = (props) => {
  return (
    <ReactDiagram
      initDiagram={initDiagram}
      divClassName='diagram-component'
      nodeDataArray={[

        { key: 0, text: 'Case', color: 'lightgreen', loc: '0 0' },

        { key: 1, text: 'Project', color: '#2079bb', loc: '0 -100' },
        { key: 2, text: 'Tissue Source\n Site', color: '#2079bb', loc: '-220 180' },
        { key: 3, text: 'Program', color: '#2079bb', loc: '0 -200' },

        { key: 4, text: 'Demographic', color: 'purple', loc: '-350 -200' },
        { key: 5, text: 'Diagnosis', color: 'purple', loc: '-300 50' },
        { key: 6, text: 'Exposure', color: 'purple', loc: '-300 -100' },
        { key: 7, text: 'Family History', color: 'purple', loc: '-250 -300' },
        { key: 8, text: 'Follow-Up', color: 'purple', loc: '-250 120' },
        { key: 9, text: 'Molecular Test', color: 'purple', loc: '-450 150' },
        { key: 10, text: 'Pathology Detail', color: 'purple', loc: '-350 -30' },
        { key: 11, text: 'Treatment', color: 'purple', loc: '-500 30' },

        { key: 12, text: 'Slide', color: 'gray', loc: '120 10' },
        { key: 13, text: 'Sample', color: 'gray', loc: '-10 100' },
        { key: 14, text: 'Portion', color: 'gray', loc: '130 110' },

        { key: 15, text: 'Center', color: '#2079bb', loc: '230 80' },

        { key: 16, text: 'Biospecimen Supplement', color: '#8c6363', loc: '100 -280' },
        { key: 17, text: 'Clinical Supplement', color: '#8c6363', loc: '200 -200' },
        { key: 18, text: 'Slide Image', color: '#8c6363', loc: '150 -50' },

        { key: 19, text: 'Gene Expression', color: 'orange', loc: '480 80' },

        //{ key: 20, text: 'Annotation', color: '#907a0e', loc: '300 10' },

        { key: 21, text: 'RNA Expression\n Workflow', color: 'darkred', loc: '410 0' },

        { key: 22, text: 'Submitted Aligned\n Reads', color: '#8c6363', loc: '250 -110' },

        { key: 23, text: 'Read Group', color: 'gray', loc: '300 150' },

        { key: 24, text: 'Aliquot', color: 'gray', loc: '160 200' },
        
        { key: 25, text: 'Aligned Reads\n Index', color: '#907a0e', loc: '400 -250' },

        { key: 26, text: 'Read Group QC', color: 'darkgreen', loc: '400 250' }
        
      ]}
      linkDataArray={[
        { key: -1, from: 0, to: 1 },
        { key: -2, from: 0, to: 2 },
        { key: -3, from: 1, to: 3 },
        { key: -4, from: 4, to: 0 },
        { key: -5, from: 5, to: 0 },
        { key: -6, from: 6, to: 0 },
        { key: -7, from: 7, to: 0 },
        { key: -8, from: 8, to: 0 },
        { key: -9, from: 8, to: 5 },
        { key: -10, from: 9, to: 8 },
        { key: -11, from: 10, to: 5 },
        { key: -12, from: 11, to: 5 },
        { key: -13, from: 12, to: 13 },
        { key: -14, from: 12, to: 14 },
        { key: -15, from: 13, to: 13 },
        { key: -16, from: 13, to: 0 },
        { key: -17, from: 13, to: 2 },
        { key: -18, from: 13, to: 5 },
        { key: -19, from: 14, to: 15 },
        { key: -20, from: 14, to: 13 },
        { key: -21, from: 16, to: 0 },
        { key: -22, from: 17, to: 0 },
        { key: -23, from: 18, to: 12 },
        { key: -24, from: 19, to: 21 },
        { key: -25, from: 21, to: 22 },

        { key: -26, from: 22, to: 23 },

        { key: -27, from: 23, to: 24 },

        { key: -28, from: 24, to: 13 },
        { key: -29, from: 24, to: 15 },

        { key: -30, from: 25, to: 22 },

        { key: -31, from: 26, to: 22 },
        { key: -32, from: 26, to: 23 }
      ]}
      onModelChange={handleModelChange}
    />
  );
};

export default GraphicalView;