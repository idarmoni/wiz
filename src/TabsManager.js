import { useState, useEffect } from 'react';

import Canvas from './Canvas'
import axios from 'axios';

import 'react-dyn-tabs/style/react-dyn-tabs.css';
import 'react-dyn-tabs/themes/react-dyn-tabs-card.css';
import useDynTabs from 'react-dyn-tabs';
import { store } from './store';
import { serverTest } from './utils';
import React from 'react';



export default function TabsManager()
{
  const options = {
    tabs: [
      {
        id: '2c6eba56-2b92-4e80-ab78-3093c8c8b4e8',
        title: "rcp0",
        panelComponent: (props) => <TabPanel  index={'2c6eba56-2b92-4e80-ab78-3093c8c8b4e8'} />,
      },
      {
        id: '54771f6e-1393-4574-b4e6-939e3ffae383',
        title: 'rcp1',
        panelComponent: (props) => <TabPanel  index={'54771f6e-1393-4574-b4e6-939e3ffae383'} />,
      },
    ],
    selectedTabID: '2c6eba56-2b92-4e80-ab78-3093c8c8b4e8',
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

  // var xPos
  // var yPos
  // document.addEventListener("contextmenu", (event) => {
  //   event.preventDefault();
  //   xPos = event.pageX + "px";
  //   yPos = event.pageY + "px";
  // });
  
  return (
    <>
    {/* <ContextMenu style={{ top: xPos, left: yPos }} /> */}
      <TabList/>
        <button onClick={()=>serverTest()} >test in server</button>
      <PanelList/>
    </>
  );
};


// class ContextMenu extends React.Component {
//   state = {
//       xPos: "0px",
//       yPos: "0px",
//       showMenu: false
//   }

//   componentDidMount() {
//     document.addEventListener("click", this.handleClick);
//     document.addEventListener("contextmenu", this.handleContextMenu);
// }

// componentWillUnmount() {
//     document.removeEventListener("click", this.handleClick);
//     document.removeEventListener("contextmenu", this.handleContextMenu);
// }

// handleClick = (e) => {
//   if (this.state.showMenu) this.setState({ showMenu: false });
// };

// handleContextMenu = (e) => {
//   e.preventDefault();

//   this.setState({
//     xPos: `${e.pageX}px`,
//     yPos: `${e.pageY}px`,
//     showMenu: true,
//   });
// };

//   render() {
//     const { showMenu, xPos, yPos } = this.state;

//     if (showMenu)
//       return (
//         <ul
//           className="menu"
//           style={{
//             top: yPos,
//             left: xPos,
//           }}
//         >
//           <li>Login</li>
//           <li>Register</li>
//           <li>Open Profile</li>
//         </ul>
//       );
//     else return null;
//   }
  
// }

export function TabPanel(props) {
  const { children, index, ...other } = props;

  const fileName =  index

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await axios(
        `http://localhost:3001/files/` + fileName,
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
      <Canvas recipe={data} rcpName={fileName} index={index} />
    </div>
  );
}