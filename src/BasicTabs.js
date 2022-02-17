import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Canvas from './Canvas'
import axios from 'axios';
import { store } from './store';

import { PostAdd } from "@material-ui/icons";

export function TabPanel(props) {
  const { children, index,currentTablIndex, ...other } = props;

  const fileName = 'rcp' + index + '.json'

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

let maxTabIndex = 0;

export const BasicTabs = function (props) {

  const [currentTablIndex, setCurrentTablIndex] = useState(0);
  

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    if (newValue === "tabProperties") {
      handleAddTab();
    }
    else {
      store.dispatch({
        type: 'change tab',
        index: newValue
      })
      setCurrentTablIndex(newValue);
    }
  };


  const handleAddTab = () => {
    maxTabIndex = maxTabIndex + 1;
    setAddTab([
      ...tabs,
      <Tab label={`Item ${maxTabIndex}`} {...a11yProps(maxTabIndex)} />
    ]);
    handleTabsContent();
  };


  // Handle Add Tab Content
  const [tabsContent, setTabsContent] = useState([
    <TabPanel  index={maxTabIndex} />
  ]);
  const handleTabsContent = () => {
    setTabsContent([
      ...tabsContent,
      <TabPanel  index={maxTabIndex} />


    ]);
  };

  const [tabs, setAddTab] = useState([<Tab label="Item 0" {...a11yProps(0)} />]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={currentTablIndex} onChange={handleChange} aria-label="basic tabs example">

          {tabs.map(child => child)}
          <Tab icon={<PostAdd />} value="tabProperties" />
        </Tabs>
      </Box>
      {tabsContent.map(child => child)}
    </Box>
  );
}
