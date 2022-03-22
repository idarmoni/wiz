import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { store } from './store'
import { GuidedDraggingTool } from './GuidedDraggingTool';
import { nodeTemplateMap } from './Palette'
import * as utils from './utils';


var $ = go.GraphObject.make;

export const DiagramWrapper = function (props) {
  const diagram =
    $(go.Diagram,
      {
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
        draggingTool: new GuidedDraggingTool(),  // defined in GuidedDraggingTool.ts
        'draggingTool.horizontalGuidelineColor': 'blue',
        'draggingTool.verticalGuidelineColor': 'blue',
        'draggingTool.centerGuidelineColor': 'green',
        'draggingTool.guidelineWidth': 1,
        model: $(go.GraphLinksModel,
          {
            linkKeyProperty: 'key',  // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
            // positive keys for nodes
            linkFromPortIdProperty: "frompid",  // required information:
            linkToPortIdProperty: "topid",      // identifies data property names
            makeUniqueKeyFunction: (m, data) => {
              let k = data.key || 1;
              while (m.findNodeDataForKey(k)) k++;
              data.key = k;
              return k;
            },
            // negative keys for links
            makeUniqueLinkKeyFunction: (m, data) => {
              let k = data.key || -1;
              while (m.findLinkDataForKey(k)) k--;
              data.key = k;
              return k;
            }
          })
      });
  /**
   * Diagram initialization method, which is passed to the ReactDiagram component.
   * This method is responsible for making the diagram and initializing the model, any templates,
   * and maybe doing other initialization tasks like customizing tools.
   * The model's data should not be set here, as the ReactDiagram component handles that.
   */


   var matchs=[]
  const initDiagram = () => {
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";

    diagram.addModelChangedListener(function (evt) {
      if (evt.isTransactionFinished) {
        store.dispatch({
          type: 'change recipe',
          rcp: diagram.model.toJson(),
          index: props.index
        })
      }
    });


    diagram.nodeTemplateMap = nodeTemplateMap

    diagram.linkTemplate =
      $(go.Link,
        {
          routing: go.Link.Orthogonal, corner: 5,
          relinkableFrom: true, relinkableTo: true
        },
        $(go.Shape, { stroke: "gray", strokeWidth: 2 }),
        $(go.Shape, { stroke: "gray", fill: "gray", toArrow: "Standard" })
      );
    diagram.layout = $(go.LayeredDigraphLayout, { direction: 0 });


    var selectionButton = document.getElementById("selectionButton");

    selectionButton.addEventListener("click", function () {
      if(diagram.selection.first()){
        matchs.push({ index: parseInt(store.getState().treeSelected), inputKey: diagram.selection.first().key })
        console.log('matchs',matchs)
        document.getElementById("matchsview").value = matchs.toString()
        

      }
    });

    var executeButton = document.getElementById("executeButton");

    executeButton.addEventListener("click", function () {
      utils.execute(matchs)
    });


    return diagram;
  }


  return (
    <div>
      <div className="wrapper">
        <ReactDiagram
          divClassName='diagram-component'
          initDiagram={initDiagram}
          nodeDataArray={props.model.nodeDataArray}
          linkDataArray={props.model.linkDataArray}

          modelData={props.model.modelData}
          onModelChange={props.onModelChange}
          skipsDiagramUpdate={props.skipsDiagramUpdate}
        />
        {/* <button id={'selectionButton'}></button> */}
      </div>
    </div>
  );

}