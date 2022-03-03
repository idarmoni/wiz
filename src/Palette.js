
import * as go from 'gojs';
import { ReactPalette } from 'gojs-react';

export var nodeTemplateMap = new go.Map();
export var paletteNodeTemplateMap = new go.Map();

var $ = go.GraphObject.make;


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
  var node = $(go.Node, "Spot",
    $(go.Panel, "Auto",
      { width: 100, height: 120 },
      $(go.Shape, templatejson.shape,
        {
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
    $(go.Panel, "Vertical",
      {
        alignment: go.Spot.Right,
        alignmentFocus: new go.Spot(1, 0.5, -8, 0)
      },
      outports)
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
  function initPalette() {
  var temp = require('./templates.json')
  
  for (const templateindex in temp.Templates)
  {
    makeTemplate(temp.Templates[templateindex])
    setPalleteTemplates(temp.Templates[templateindex])
  }
        
    const myPalette = $(go.Palette, {
      nodeTemplateMap: paletteNodeTemplateMap
    });

    return myPalette;
  };

  return (
    <div>
      <ReactPalette
        initPalette={initPalette}
        divClassName="palette-component"
        nodeDataArray={props.nodeArray}

      />
    </div>

  )

  
}

export default Palette