import * as go from 'gojs';

var $ = go.GraphObject.make;

export function isPerson(n) { return n !== null && n.category === ""; }

export function isTable(n) { return n !== null && n.category !== ""; }

// Highlight the empty and occupied seats at a "Table" Node
export function highlightSeats(node, coll, show) {
  if (isPerson(node)) {  // refer to the person's table instead
    node = node.diagram.findNodeForKey(node.data.table);
    if (node === null) return;
  }
  const it = coll.iterator;
  while (it.next()) {
    const n = it.key;
    // if dragging a Table, don't do any highlighting
    if (isTable(n)) return;
  }
  if (!node.data.guests) {
    node.data.guests = {}
  }
  const guests = node.data.guests;
  for (const sit = node.elements; sit.next();) {
    const seat = sit.value;
    if (seat.name) {
      const num = parseFloat(seat.name);
      if (isNaN(num)) continue;
      const seatshape = seat.findObject("SEATSHAPE");
      if (!seatshape) continue;
      if (show) {
        if (guests[seat.name]) {
          seatshape.stroke = "red";
        } else {
          seatshape.stroke = "green";
        }
      } else {
        seatshape.stroke = "white";
      }
    }
  }
}


// Create a seat element at a particular alignment relative to the table.
export function Seat(number, align, focus) {
  if (typeof align === 'string') align = go.Spot.parse(align);
  if (!align || !align.isSpot()) align = go.Spot.Right;
  if (typeof focus === 'string') focus = go.Spot.parse(focus);
  if (!focus || !focus.isSpot()) focus = align.opposite();
  return $(go.Panel, "Spot",
    { name: number.toString(), alignment: align, alignmentFocus: focus },
    $(go.Shape, "Circle",
      { name: "SEATSHAPE", desiredSize: new go.Size(40, 40), fill: "burlywood", stroke: "white", strokeWidth: 2 },
      new go.Binding("fill")),
    $(go.TextBlock, number.toString(),
      { font: "10pt Verdana, sans-serif" },
      new go.Binding("angle", "angle", n => -n))
  );
}



// Find the name of the unoccupied seat that is closest to the given Point.
// This returns null if no seat is available at this table.
export function findClosestUnoccupiedSeat(node) {
  if (isPerson(node)) {  // refer to the person's table instead
    node = node.diagram.findNodeForKey(node.data.table);
    if (node === null) return;
  }
  var guests = node.data.guests;
  // let closestseatname = null;
  // let closestseatdist = Infinity;
  // iterate over all seats in the Node to find one that is not occupied
  for (const sit = node.elements; sit.next();) {
    const seat = sit.value;
    if (seat.name) {
      const num = parseFloat(seat.name);
      if (isNaN(num)) continue;  // not really a "seat"
      if (!guests) guests = [];
      if (guests[seat.name]) continue;  // already assigned
      return 1;
    }
  }

  return null;
}