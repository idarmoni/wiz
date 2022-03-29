import * as go from 'gojs';
import { ReactPalette } from 'gojs-react';


export function Gojstree(props) {
    var $ = go.GraphObject.make;  // for conciseness in defining templates
    function initPalette() {
        var myDiagram =
            $(go.Palette,
                {
                    /* allowMove: false,
                     allowCopy: false,
                     allowDelete: false,
                     allowHorizontalScroll: false,*/
                    isReadOnly: false,
                    layout:
                        $(go.TreeLayout,
                            {
                                alignment: go.TreeLayout.AlignmentStart,
                                angle: 0,
                                compaction: go.TreeLayout.CompactionNone,
                                layerSpacing: 16,
                                layerSpacingParentOverlap: 1,
                                nodeIndentPastParent: 1.0,
                                nodeSpacing: 0,
                                setsPortSpot: false,
                                setsChildPortSpot: false,
                                //isTreeExpanded: false
                            })
                });

        myDiagram.nodeTemplate =
            $(go.Node,
                { // no Adornment: instead change panel background color by binding to Node.isSelected
                    selectionAdorned: false,
                    isTreeExpanded: false,
                    // a custom function to allow expanding/collapsing on double-click
                    // this uses similar logic to a TreeExpanderButton
                    doubleClick: function (e, node) {
                        var cmd = myDiagram.commandHandler;
                        if (node.isTreeExpanded) {
                            if (!cmd.canCollapseTree(node)) return;
                        } else {
                            if (!cmd.canExpandTree(node)) return;
                        }
                        e.handled = true;
                        if (node.isTreeExpanded) {
                            cmd.collapseTree(node);
                        } else {
                            cmd.expandTree(node);
                        }
                    }
                },
                $("TreeExpanderButton",
                    {
                        "ButtonBorder.fill": "whitesmoke",
                        "ButtonBorder.stroke": null,
                        "_buttonFillOver": "rgba(0,128,255,0.25)",
                        "_buttonStrokeOver": null
                    }),
                $(go.Panel, "Horizontal",
                    { position: new go.Point(18, 0) },
                    new go.Binding("background", "isSelected", function (s) { return (s ? "lightblue" : "white"); }).ofObject(),
                    $(go.Picture,
                        {
                            width: 18, height: 18,
                            margin: new go.Margin(0, 4, 0, 0),
                            imageStretch: go.GraphObject.Uniform
                        },
                        // bind the picture source on two properties of the Node
                        // to display open folder, closed folder, or document
                        new go.Binding("source", "isTreeExpanded", imageConverter).ofObject(),
                        new go.Binding("source", "isTreeLeaf", imageConverter).ofObject()),
                    $(go.TextBlock,
                        { font: '12pt Verdana, sans-serif' },
                        {},
                        new go.Binding("text", "name")
                    )
                ), // end Horizontal Panel

                new go.Binding("copyable", "isTreeLeaf").ofObject()
            );  // end Node

        // without lines
        myDiagram.linkTemplate = $(go.Link);
        myDiagram.contentAlignment = go.Spot.TopLeft;



        var nodeDataArray = //props.treedata
            [{ "key": "YRE45.", "name": "YRE45", "title": "YRE45." }, { "key": "YRE45.yte.", "name": "yte", "title": "YRE45.yte.", "parent": "YRE45." }, { "key": "YRE45.yte.ew.", "name": "ew", "title": "YRE45.yte.ew.", "parent": "YRE45.yte.", "index": "001" }, { "key": "YRE45.yte.gt.", "name": "gt", "title": "YRE45.yte.gt.", "parent": "YRE45.yte.", "index": "002" }, { "key": "YRE45.yte.lk.", "name": "lk", "title": "YRE45.yte.lk.", "parent": "YRE45.yte.", "index": "003" }, { "key": "YRE45.yte.po.", "name": "po", "title": "YRE45.yte.po.", "parent": "YRE45.yte.", "index": "004" }, { "key": "YRE45.yte.re.", "name": "re", "title": "YRE45.yte.re.", "parent": "YRE45.yte.", "index": "005" }, { "key": "YRE45.opop.", "name": "opop", "title": "YRE45.opop.", "parent": "YRE45." }, { "key": "YRE45.opop.ert.", "name": "ert", "title": "YRE45.opop.ert.", "parent": "YRE45.opop.", "index": "006" }, { "key": "YRE45.opop.fd.", "name": "fd", "title": "YRE45.opop.fd.", "parent": "YRE45.opop.", "index": "007" }, { "key": "YRE45.opop.sg.", "name": "sg", "title": "YRE45.opop.sg.", "parent": "YRE45.opop.", "index": "008" }, { "key": "YRE45.opop.et.", "name": "et", "title": "YRE45.opop.et.", "parent": "YRE45.opop.", "index": "009" }, { "key": "YRE45.opop.wte.", "name": "wte", "title": "YRE45.opop.wte.", "parent": "YRE45.opop.", "index": "010" }]

        myDiagram.model = new go.TreeModel(nodeDataArray);
        return myDiagram
    }
    return (
        <div>
            <ReactPalette
                initPalette={initPalette}
                divClassName='palette-component'
                nodeDataArray={props.treedata}
            />
        </div>
    );
}


// takes a property change on either isTreeLeaf or isTreeExpanded and selects the correct image to use
function imageConverter(prop, picture) {
    var node = picture.part;
    if (node.isTreeLeaf) {
        return "images/gear.svg";
    } else {
        if (node.isTreeExpanded) {
            return "images/folder_open.svg";
        } else {
            return "images/folder.svg";
        }
    }
}