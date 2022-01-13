/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';

import { GuidedDraggingTool } from '../GuidedDraggingTool';

import './Diagram.css';

var fs = require('browserify-fs');

var nodeTemplateMap = new go.Map();

var $ = go.GraphObject.make;

var temp = 'start'

function makePort(name, leftside) {
  var port = $(go.Shape, "Rectangle",
    {
      fill: "gray", stroke: null,
      desiredSize: new go.Size(8, 8),
      portId: name,  // declare this object to be a "port"
      toMaxLinks: 1,  // don't allow more than one link into a port
      cursor: "pointer"  // show a different cursor to indicate potential link point
    });

  var lab = $(go.TextBlock, name,  // the name of the port
    { font: "7pt sans-serif" });

  var panel = $(go.Panel, "Horizontal",
    { margin: new go.Margin(2, 0) });

  // set up the port/panel based on which side of the node it will be on
  if (leftside) {
    port.toSpot = go.Spot.Left;
    port.toLinkable = true;
    lab.margin = new go.Margin(1, 0, 0, 1);
    panel.alignment = go.Spot.TopLeft;
    panel.add(port);
    panel.add(lab);
  } else {
    port.fromSpot = go.Spot.Right;
    port.fromLinkable = true;
    lab.margin = new go.Margin(1, 1, 0, 0);
    panel.alignment = go.Spot.TopRight;
    panel.add(lab);
    panel.add(port);
  }
  return panel;
}

function makeTemplate(typename, icon, background, shape, inports, outports) {
  var node = $(go.Node, "Spot",
    $(go.Panel, "Auto",
      { width: 100, height: 120 },
      $(go.Shape, shape,
        {
          fill: background, stroke: null, strokeWidth: 0,
          spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight
        }),
      $(go.Panel, "Table",
        $(go.TextBlock, typename,
          {
            row: 0,
            margin: 3,
            maxSize: new go.Size(80, NaN),
            stroke: "white",
            font: "bold 11pt sans-serif"
          }),
        $(go.Picture, icon,
          { row: 1, width: 16, height: 16, scale: 3.0 }),
        $(go.TextBlock,
          {
            row: 2,
            margin: 3,
            editable: true,
            maxSize: new go.Size(80, 40),
            stroke: "white",
            font: "bold 9pt sans-serif"
          },
          //new go.Binding("text", "name").makeTwoWay())
          new go.Binding("text", "name").makeTwoWay())
      )
    ),
    $(go.Panel, "Vertical",
      {
        alignment: go.Spot.Left,
        alignmentFocus: new go.Spot(0, 0.5, 8, 0)
      },
      inports),
    $(go.Panel, "Vertical",
      {
        alignment: go.Spot.Right,
        alignmentFocus: new go.Spot(1, 0.5, -8, 0)
      },
      outports)
  );
  nodeTemplateMap.add(typename, node);
}

export const DiagramWrapper = function (props) {




  var nodeDataArray = props.model.nodeDataArray
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
  const initDiagram = () => {
    // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";


    diagram.addDiagramListener("ChangingSelection", function (e) {
      temp = diagram.model.toJson();
    });
    makeTemplate("Table", "images/table.svg", "forestgreen", "RoundedRectangle",
      [],
      [makePort("OUT", false)]);

    makeTemplate("Join", "join.svg", "mediumorchid", "Ellipse",
      [makePort("L", true), makePort("R", true)],
      [makePort("UL", false), makePort("ML", false), makePort("M", false), makePort("MR", false), makePort("UR", false)]);

    makeTemplate("Project", "images/project.svg", "darkcyan", "Diamond",
      [makePort("", true)],
      [makePort("OUT", false)]);

    makeTemplate("Filter", "images/filter.svg", "cornflowerblue", "RoundedRectangle",
      [makePort("", true)],
      [makePort("OUT", false), makePort("INV", false)]);

    makeTemplate("Group", "images/group.svg", "mediumpurple", "Diamond",
      [makePort("", true)],
      [makePort("OUT", false)]);

    makeTemplate("Sort", "images/sort.svg", "sienna", "RoundedRectangle",
      [makePort("", true)],
      [makePort("OUT", false)]);

    makeTemplate("Export", "images/upload.svg", "darkred", "Ellipse",
      [makePort("", true)],
      []);


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


    return diagram;
  }


  const initPalette = () => {
    const animateFadeDown = (e) => {
      const animation = new go.Animation();
      animation.isViewportUnconstrained = true;
      animation.easing = go.Animation.EaseOutExpo;
      animation.duration = 900;
      animation.add(
        e.diagram,
        'position',
        e.diagram.position.copy().offset(0, 200),
        e.diagram.position
      );
      animation.add(e.diagram, 'opacity', 0, 1);
      animation.start();
    };

    const myPalette = $(go.Palette, {
      nodeTemplateMap: nodeTemplateMap
    });

    return myPalette;
  };

  return (
    <div>

      <textarea value={temp} />
      <div className="wrapper">

        <ReactPalette
          initPalette={initPalette}
          divClassName="palette-component"
          nodeDataArray=//{nodeTemplateMap.iteratorValues}

          {[
            { "category": "Table" },
            { "category": "Join" },
            { "category": "Project" },
            { "category": "Filter" },
            { "category": "Group" }, { "category": "Sort" }, { "category": "Export" }
          ]}

        />
        <ReactDiagram
          divClassName='diagram-component'
          initDiagram={initDiagram}
          nodeDataArray={props.model.nodeDataArray}
          linkDataArray={props.model.linkDataArray}

          modelData={props.model.modelData}
          onModelChange={props.onModelChange}
          skipsDiagramUpdate={props.skipsDiagramUpdate}
        />


      </div>
    </div>
  );
}