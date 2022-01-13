import React from "react";

import { SimpleAccordion } from './SimpleAccordion';
import { BasicTabs } from './BasicTabs';
import { DirectionStack } from './TopPannel';

class App extends React.Component {

  render() {
    return (
      <div>
        <DirectionStack />
        <td style={{ width: 200 }}>
          <SimpleAccordion />
        </td>
        <td style={{ width: 2000 }}>
          <BasicTabs />
        </td>
      </div>

    )
  }
}

export default App