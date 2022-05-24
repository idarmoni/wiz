import { SidePannel } from './Accordion';
import { DirectionStack } from "./TopPannel"
import React from 'react';

import TabsManager from './TabsManager';

class App extends React.Component {
  render() {

    return (
      <div>
        <DirectionStack />
        <div>
          <td style={{ width: 200 }}>
            <SidePannel />
          </td>
          <td style={{ width: 2000 }}>
            <TabsManager />
          </td>
        </div>
      </div>
    )
  }
}

export default App