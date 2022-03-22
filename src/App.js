import { SidePannel } from './Accordion';
import { DirectionStack } from "./TopPannel"
import React from 'react';
import * as init from './temp'

import TabsManager from './TabsManager';

class App extends React.Component {
  render() {

    return (
      <div>
        <DirectionStack id="directionStack" />
        <tr>
          <td style={{ width: 200 }}>
            <SidePannel />
          </td>
          <td style={{ width: 2000 }}>
            <TabsManager />
          </td>
        </tr>
        <button id={'selectionButton'}> selectionButton</button>
        <button id={'executeButton'}> executeButton</button>
        <textarea id={'matchsview'}></textarea>

{/*         
        <div id="sample">
          <div id="myFlexDiv">
            <div id="myGuests" style={{ border: 'solid 1px black', height: '250px' }}></div>

            <div id="myDiagramDiv" style={{ border: 'solid 1px black', height: '250px' }}></div>
          </div>
          This sample demonstrates how a "Person" node can be dropped onto a "Table" node,
          causing the person to be assigned a position at the closest empty seat at that table.
          When a person is dropped into the background of the diagram, that person is no longer assigned a seat.
          People dragged between diagrams are automatically removed from the diagram they came from.
          <p>
            "Table" nodes are defined by separate templates, to permit maximum customization of the shapes and
            sizes and positions of the tables and chairs.

            "Person" nodes in the <code>myGuests</code> diagram can also represent a group of people,
            for example a named person plus one whose name might not be known.
            When such a person is dropped onto a table, additional nodes are created in <code>myDiagram</code>.
            Those people are seated at the table if there is room.

            Tables can be moved or rotated. Moving or rotating a table automatically repositions the people seated at that table.

            The <a>UndoManager</a> is shared between the two Diagrams, so that one can undo/redo in either diagram
            and have it automatically handle drags between diagrams, as well as the usual changes within the diagram.
          </p>
          <div>
            Diagram Model saved in JSON format, automatically updated after each transaction:
            <pre id="savedModel" style={{ height: '250px' }}></pre>
          </div>
        </div>

        <init.temp></init.temp> */}

      </div>
    )
  }
}

export default App