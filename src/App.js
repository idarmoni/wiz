import { SidePannel } from './Accordion';
import { DirectionStack } from "./TopPannel"
import React from 'react';
import * as init from './temp'
import { Gojstree } from './gojstree'

import TabsManager from './TabsManager';

class App extends React.Component {
  render() {

    return (
      <div>
        <DirectionStack />
        <tr>
          <td style={{ width: 200 }}>
            <SidePannel />
          </td>
          <td style={{ width: 2000 }}>
            <TabsManager />
          </td>
        </tr>
      </div>
    )
  }
}

export default App