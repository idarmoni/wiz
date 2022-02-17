import { SimpleAccordion } from './SimpleAccordion';
import { BasicTabs } from './BasicTabs';
import {DirectionStack} from "./TopPannel"
import React from 'react';

import Tabb from "./temp";

class App extends React.Component {
  render() 
{ 
    return (
      <div>
        <DirectionStack id="directionStack" />
        <td style={{ width: 200 }}>
          <SimpleAccordion />
        </td>
        <td style={{ width: 2000 }}>
          <Tabb/>
          {/* <--BasicTabs /> */}
        </td>
      </div>
    )
  }
}

export default App