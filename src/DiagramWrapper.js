import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import { store } from './store'
import { nodeTemplateMap } from './Palette'
import { isTable, isPerson, findClosestUnoccupiedSeat } from './temp'


var diagram
var $ = go.GraphObject.make;

export const DiagramWrapper = function (props) {
  diagram =
    $(go.Diagram,
      {
        allowClipboard: false,
        draggingTool: $(SpecialDraggingTool),
        // "ModelChanged": e => {
        //   if (e.isTransactionFinished) {
        //     store.dispatch({
        //       type: 'change recipe',
        //       rcp: diagram.model.toJson(),
        //       index: props.index
        //     })
        //   }
        // },
        'undoManager.isEnabled': true,  // must be set to allow for model change listening
        // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
        'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
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
    diagram.addModelChangedListener(function (evt) {
      var u = JSON.parse(diagram.model.toJson())
      if (evt.isTransactionFinished) {
        store.dispatch({
          type: 'change recipe',
          rcp: diagram.model.toJson(),
        })
      }
    });

    // what to do when a drag-drop occurs in the Diagram's background
    diagram.mouseDrop = e => {
      // when the selection is dropped in the diagram's background,
      // make sure the selected people no longer belong to any table
      e.diagram.selection.each(n => {
        if (isPerson(n)) unassignSeat(diagram, n.data);
      });
    };
    // go.AnimationManager.defineAnimationEffect("location",
    //   (obj, startValue, endValue, easing, currentTime, duration, animationState) => {
    //     obj.location = new go.Point(easing(currentTime, startValue.x, endValue.x - startValue.x, duration),
    //       easing(currentTime, startValue.y, endValue.y - startValue.y, duration));
    //   }
    // );


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

    diagram.layout.layeringOption = go.LayeredDigraphLayout.LayerLongestPathSource;

    diagram.addDiagramListener("SelectionDeleting", e => {
      unassignSeat(diagram, e.subject.iterator.first().data)

    })
    diagram.addDiagramListener('AnimationStarting', e => {
      if (props.matchs) {

        props.matchs.forEach(x => {
          diagram.model.addNodeData(x)
          var inputNode = diagram.findNodeForKey(x.inputKey)
          assignSeat(inputNode, x)
          positionPeopleAtSeats(inputNode);
        })
      }
    })

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

        // modelData={props.model.modelData}
        // onModelChange={props.onModelChange}
        // skipsDiagramUpdate={props.skipsDiagramUpdate}
        />
      </div>
    </div>
  );
}


// Declare that the guest represented by the data is no longer assigned to a seat at a table.
// If the guest had been at a table, the guest is removed from the table's list of guests.
function unassignSeat(tempdiagram, guest) {
  if (guest instanceof go.GraphObject) throw Error("A guest object must not be a GraphObject: " + guest.toString());
  const model = tempdiagram.model;
  // remove from any table that the guest is assigned to
  if (guest.table) {
    const table = model.findNodeDataForKey(guest.table);
    if (table) {
      // var temp = store.getState().recipeMap[store.getState().currentIndex].matchs
      store.dispatch({
        type: 'filter match',
        predicate: x => !(x.fieldname == guest.fieldname && x.inputKey == table.key)
      })
      const guests = table.guests;
      if (guests) model.setDataProperty(guests, guest.seat.toString(), undefined);

    }
  }
  model.setDataProperty(guest, "table", undefined);
  model.setDataProperty(guest, "seat", undefined);


  console.log(store.getState().recipeMap[store.getState().currentIndex].matchs)

}

// Given a "Table" Node, assign one guest data to a seat at that table.
// This tries to assign the unoccupied seat that is closest to the given point in document coordinates.
function assignSeat(node, guest) {
  diagram.layout = $(go.Layout)
  if (isPerson(node)) {  // refer to the person's table instead
    node = node.diagram.findNodeForKey(node.data.table);
    if (node === null) return;
  }
  if (guest instanceof go.GraphObject) throw Error("A guest object must not be a GraphObject: " + guest.toString());

  // in case the guest used to be assigned to a different seat, perhaps at a different table
  unassignSeat(node.diagram, guest);

  const model = node.diagram.model;
  if (!node.data.guests) node.data.guests = {}
  const guests = node.data.guests;
  // iterate over all seats in the Node to find one that is not occupied
  const closestseatname = findClosestUnoccupiedSeat(node);
  if (closestseatname) {
    model.setDataProperty(guests, closestseatname, guest.key);
    model.setDataProperty(guest, "table", node.data.key);
    model.setDataProperty(guest, "seat", parseFloat(closestseatname));

    store.dispatch({
      type: 'add match',
      index: guest.index,
      inputkey: node.data.key,
      fieldname: guest.fieldname
    })
    console.log(store.getState().recipeMap[store.getState().currentIndex].matchs)

  }
}



// Position a single guest Node to be at the location of the seat to which they are assigned.
function positionPersonAtSeat(guest) {
  if (guest instanceof go.GraphObject) throw Error("A guest object must not be a GraphObject: " + guest.toString());
  if (!guest || !guest.table || !guest.seat) return;
  const tempdiagram = diagram;
  var table = tempdiagram.findPartForKey(guest.table);
  var person = tempdiagram.findPartForData(guest);
  if (table && person) {
    const seat = table.findObject(guest.seat.toString());
    const loc = seat.getDocumentPoint(go.Spot.Center);
    // animate movement, instead of: person.location = loc;
    const animation = new go.Animation();
    animation.add(person, "location", person.location, loc);
    animation.start();
  }
}



// Given a "Table" Node, assign seats for all of the people in the given collection of Nodes;
// the optional Point argument indicates where the collection of people may have been dropped.
export function assignPeopleToSeats(node, coll, pt) {
  if (isPerson(node)) {  // refer to the person's table instead
    node = node.diagram.findNodeForKey(node.data.table);
    if (node === null) return;
  }
  if (coll.any(isTable)) {
    // if dragging a Table, don't allow it to be dropped onto another table
    diagram.currentTool.doCancel();
    return;
  }
  // OK -- all Nodes are people, call assignSeat on each person data
  coll.each(n => assignSeat(node, n.data, pt));
  positionPeopleAtSeats(node);
}


// Position the nodes of all of the guests that are seated at this table
// to be at their corresponding seat elements of the given "Table" Node.
function positionPeopleAtSeats(node) {
  if (isPerson(node)) {  // refer to the person's table instead
    node = node.diagram.findNodeForKey(node.data.table);
    if (node === null) return;
  }
  const guests = node.data.guests;
  const model = node.diagram.model;
  for (let seatname in guests) {
    const guestkey = guests[seatname];
    const guestdata = model.findNodeDataForKey(guestkey);
    positionPersonAtSeat(guestdata);
  }
}

// Automatically drag people Nodes along with the table Node at which they are seated.
class SpecialDraggingTool extends go.DraggingTool {
  computeEffectiveCollection(parts) {
    const map = super.computeEffectiveCollection(parts);
    // for each Node representing a table, also drag all of the people seated at that table
    parts.each(table => {
      if (isPerson(table)) return;  // ignore persons
      // this is a table Node, find all people Nodes using the same table key
      for (const nit = table.diagram.nodes; nit.next();) {
        const n = nit.value;
        if (isPerson(n) && n.data.table === table.data.key) {
          if (!map.has(n)) map.add(n, new go.DraggingInfo(n.location.copy()));
        }
      }
    });
    return map;
  }
}
// end SpecialDraggingTool