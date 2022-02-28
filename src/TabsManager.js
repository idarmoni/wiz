import { useState, useEffect } from 'react';

import Canvas from './Canvas'
import axios from 'axios';

import 'react-dyn-tabs/style/react-dyn-tabs.css';
import 'react-dyn-tabs/themes/react-dyn-tabs-card.css';
import useDynTabs from 'react-dyn-tabs';
import { store } from './store';
import { serverTest } from './utils';



export default function TabsManager()
{
  const options = {
    tabs: [
      // {
      //   id: '0',
      //   title: "welcome",
      //   panelComponent: (props) => <div> welcome to our app</div> ,
      // }
    ],
    // selectedTabID: '2c6eba56-2b92-4e80-ab78-3093c8c8b4e8',
    selectedTabID: '0',
    onSelect: function ({currentSelectedTabId, previousSelectedTabId}) {
      console.log('Select the tab '+ currentSelectedTabId);
      store.dispatch({
        type: 'change tab',
        index: currentSelectedTabId
      })
    }
  };
  const [TabList, PanelList, ready] = useDynTabs(options);
  ready((instance) => {
    store.dispatch({
      type:'create instance',
      instance: instance
    })
  });

  document.addEventListener("contextmenu", (event) => {
     event.preventDefault();
   });
  
  return (
    <>
      <TabList/>
        <button onClick={()=>serverTest()} >test in server</button>
      <PanelList/>
    </>
  );
};


export function TabPanel(props) {
  const { children, index,rcpName, ...other } = props;

  const rcpid =  index

  

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `http://localhost:3001/files/` + rcpid,
      ).then(response => {
        setData(response.data)
      })
        .catch(error => {
          console.error("error fetching data: ", error);
        })
        .finally(() => {
          setLoading(false)
        })
    };

    fetchData();
    
  }, []);
  
  if (loading) return "loading..."
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}

    >
      <Canvas recipe={data} rcpName={rcpName} rcpid={rcpid} index={index} />
    </div>
  );
}