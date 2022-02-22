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
      console.log('Select the tab '+ currentSelectedTabId);
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
  const addnewTab = function () {
    maxtabid+=1
    addTab(maxtabid)
  };

  const addTab = function (tabid) {
    // open tab
    _instance.open({id: tabid, title: 'Tab '+tabid, panelComponent: (props) => <TabPanel  index={tabid} />}).then(() => {
      console.log('tab '+tabid+' is open');
    });
    // switch to tab
    _instance.select(tabid).then(() => {
      console.log('tab '+tabid+' is selected');
    });
  };

  
  return (
    <>
      <TabList/>
        <button onClick={addnewTab} >Add new tab</button>
      <PanelList/>
    </>
  );
};