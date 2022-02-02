import React, { useState, useEffect } from 'react';
//import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Canvas from './Canvas'
import axios from 'axios';

const fs = require("fs")


function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
  
    const fileName = 'rcp'+index+'.json'

    
    const [data, setData] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          `http://localhost:3001/cats/files/`+fileName,
        ).then(response=>{
          setData(response.data)
        })
        .catch(error=>{
          console.error("error fetching data: ",error);
        })
        .finally(()=>{
          setLoading(false)
        })
      };
  
      fetchData();
    }, []);
    if(loading) return "loading..."
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}

      >
      <Canvas recipe = {data} rcpName={'./rcp'+index+'.json'}/>
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export const BasicTabs = function () {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
        //TODO:: recipeName in prop
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Item One" {...a11yProps(0)} />
            <Tab label="Item Two" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} onChange={handleChange} index={0}/>    
        <TabPanel value={value} onChange={handleChange} index={1}/>
        <TabPanel value={value} onChange={handleChange} index={2}/>
      </Box>
    );
  }
  