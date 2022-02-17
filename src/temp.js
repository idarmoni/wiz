import React from 'react';
import 'react-dyn-tabs/style/react-dyn-tabs.css';
import 'react-dyn-tabs/themes/react-dyn-tabs-card.css';
import useDynTabs from 'react-dyn-tabs';
import {TabPanel} from './BasicTabs';
import { BasicTabs } from './BasicTabs';
import { store } from './store';



var maxtabid=1
export default function Tabb()
{
  const options = {
    tabs: [
      {
        id: 0,
        title: 'tab 0',
        panelComponent: (props) => <TabPanel  index={0} />,
      },
      {
        id: 1,
        title: 'tab 1',
        panelComponent: (props) => <TabPanel  index={1} />,
      },
    ],
    selectedTabID: 0,
    onSelect: function ({currentSelectedTabId, previousSelectedTabId}) {
      console.log('[onSelect]');
      store.dispatch({
        type: 'change tab',
        index: currentSelectedTabId
      })
    }
  };
  let _instance;
  const [TabList, PanelList, ready] = useDynTabs(options);
  ready((instance) => {
    _instance = instance;
  });
  const addTab = function () {
    maxtabid+=1
    // open tab
    _instance.open({id: maxtabid, title: 'Tab '+maxtabid, panelComponent: (props) => <TabPanel  index={maxtabid} />}).then(() => {
      console.log('tab '+maxtabid+' is open');
    });
    // switch to tab
    _instance.select(maxtabid).then(() => {
      console.log('tab '+maxtabid+' is selected');
    });
  };
  
  return (
    <>
    
      <TabList/>
      
        <button onClick={addTab} >Add tab</button>
      <PanelList/>
    </>
  );
};