
import * as go from 'gojs';
import { ReactPalette } from 'gojs-react';
import {Seat,highlightSeats} from './seatUtils'
import {assignPeopleToSeats} from './DiagramWrapper'

var $ = go.GraphObject.make;


export var nodeTemplateMap = new go.Map();

nodeTemplateMap.add("",  // default template, for people
$(go.Node, "Auto",
  { background: "transparent" },  // in front of all Tables
  // when selected is in foreground layer
  new go.Binding("layerName", "isSelected", s => s ? "Foreground" : "").ofObject(),
  { locationSpot: go.Spot.Center },
  new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
  new go.Binding("text", "key"),
  { // what to do when a drag-over or a drag-drop occurs on a Node representing a table
    mouseDragEnter: (e, node, prev) => {
      const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;  // could be copied from palette
      highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, true);
    },
    mouseDragLeave: (e, node, next) => {
      const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;
      highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, false);
    },
    mouseDrop: (e, node) => {
      assignPeopleToSeats(node, node.diagram.selection, e.documentPoint);
    }
  },
  $(go.Shape, "Rectangle", { fill: "blanchedalmond", stroke: null }),
  $(go.Panel, "Viewbox",
    { desiredSize: new go.Size(50, 38) },
    $(go.TextBlock, { margin: 2, desiredSize: new go.Size(55, NaN), font: "8pt Verdana, sans-serif", textAlign: "center", stroke: "darkblue" },
      new go.Binding("text", "", data => {
        let s = data.fieldname;
        return s;
      }))
  )
));
export var paletteNodeTemplateMap = new go.Map();



function makePorts(portsNames,leftside) {
  var panels = []
  for (const portindex in portsNames) {
    var portname = portsNames[portindex]
    var port = $(go.Shape, "Rectangle",
      {
        fill: "gray", stroke: null,
        desiredSize: new go.Size(8, 8),
        portId: portname,  // declare this object to be a "port"
        toMaxLinks: 1,  // don't allow more than one link into a port
        cursor: "pointer"  // show a different cursor to indicate potential link point
      });

    var lab = $(go.TextBlock, portname,  // the name of the port
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
    panels.push(panel)
  }
  return panels;
}

function makeTemplate(templatejson) {
  var inports = makePorts(templatejson.inports,true)
  var outports = makePorts(templatejson.outports,false)
  var mySeat = {}
    if (templatejson.name === 'Input') {
      mySeat = Seat(1, "-0.22 0.7", "0.5 1")
    }
  var node = $(go.Node, "Spot",tableStyle(),
    $(go.Panel, "Auto",
      { width: 100, height: 120 },
      $(go.Shape, templatejson.shape,
        {
          name:"SHAPE",
          fill: templatejson.color, stroke: null, strokeWidth: 0,
          spot1: go.Spot.TopLeft, spot2: go.Spot.BottomRight
        }),
      $(go.Panel, "Table",
        $(go.TextBlock, templatejson.name,
          {
            row: 0,
            margin: 3,
            maxSize: new go.Size(80, NaN),
            stroke: "white",
            font: "bold 11pt sans-serif"
          }),

        $(go.Picture, "http://localhost:3001/" + templatejson.icon,
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
          new go.Binding("text", "name").makeTwoWay()),
          $(go.TextBlock,
            {
              row: 3,
              margin: 3,
              editable: true,
              maxSize: new go.Size(80, 40),
              stroke: "white",
              font: "bold 9pt sans-serif"
            },
            new go.Binding("text", "key").makeTwoWay())
      )
    ),
    $(go.Panel, "Vertical",
      {
        alignment: go.Spot.Left,
        alignmentFocus: new go.Spot(0, 0.5, 8, 0)
      },
      inports),
      { // what to do when a drag-over or a drag-drop occurs on a Node representing a table
        mouseDragEnter: (e, node, prev) => {
          const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;  // could be copied from palette
          highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, true);
        },
        mouseDragLeave: (e, node, next) => {
          const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;
          highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, false);
        },
        mouseDrop: (e, node) => {
          assignPeopleToSeats(node, node.diagram.selection, e.documentPoint);
        }
      },
    $(go.Panel, "Vertical",
      {
        alignment: go.Spot.Right,
        alignmentFocus: new go.Spot(1, 0.5, -8, 0)
      },
      outports),
      mySeat,
  );
  nodeTemplateMap.add(templatejson.name, node);
}

function setPalleteTemplates(templatejson)
{
  var node =$(go.Node, "Horizontal",
    $(go.Picture,"http://localhost:3001/" + templatejson.icon,
      { width: 20, height: 20 }),
    $(go.TextBlock, { name: "TB" ,text:templatejson.name})
  );
  paletteNodeTemplateMap.add(templatejson.name, node);
}

export const Palette = function (props) {
  
  var templates = props.templates
    for (const templateindex in templates)
    {
      makeTemplate(templates[templateindex])
      setPalleteTemplates(templates[templateindex])
    }

  function initPalette() {
    const myPalette = $(go.Palette, {
      nodeTemplateMap: paletteNodeTemplateMap
    });

    return myPalette;
  };

  return (
      <ReactPalette
        initPalette={initPalette}
        divClassName="palette-component"
        nodeDataArray={props.templates.map(x=>({category:x.name}))}

      />

  )

  
}


function tableStyle() {
  return [
    { background: "transparent" },
    { layerName: "Background" },  // behind all Persons
    { locationSpot: go.Spot.Center, locationObjectName: "TABLESHAPE" },
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding("angle").makeTwoWay(),
    { // what to do when a drag-over or a drag-drop occurs on a Node representing a table
      mouseDragEnter: (e, node, prev) => {
        const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;  // could be copied from palette
        highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, true);
      },
      mouseDragLeave: (e, node, next) => {
        const dragCopy = node.diagram.toolManager.draggingTool.copiedParts;
        highlightSeats(node, dragCopy ? dragCopy : node.diagram.selection, false);
      },
      mouseDrop: (e, node) => assignPeopleToSeats(node, node.diagram.selection, e.documentPoint)
    }
  ];
}

export default Palette