import React from "react";
import * as go from 'gojs';
import { ReactPalette } from 'gojs-react';



export var nodeTemplateMap = new go.Map();
var $ = go.GraphObject.make;


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
        $(go.Picture,
          {source: "rose.jpeg", background: "gray", width: 16, height: 16, row: 1, scale: 3.0}),
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

export const Palette = function (props) {
  function initPalette(){

    makeTemplate("Table", "src/img/plusIcon.png", "aquamarine", "RoundedRectangle",
      [],
      [makePort("OUT", false)]);

      makeTemplate("Input", "images/table.svg", "forestgreen", "RoundedRectangle",
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

      makeTemplate("2inputfunc", "images/upload.svg", "deepskyblue", "RoundedRectangle",
      [makePort("A", true),makePort("B", true)],
      [makePort("OUT", false)]);

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
        <ReactPalette
          initPalette = {initPalette}
          divClassName = "palette-component"
          nodeDataArray = {props.nodeArray}

        />
      </div>

    )  
}

export default Palette