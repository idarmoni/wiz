

import { SimpleAccordion } from './SimpleAccordion';
import { BasicTabs } from './BasicTabs';
import { savercp  } from './utils';

import React, { useState, useEffect,useCallback } from 'react';

//import { createStore } from 'redux';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import SaveIcon from '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FileOpenIcon from '@mui/icons-material/FileOpen';



class DirectionStack extends React.Component {

  render() {

    return (
      <div>
        <Stack direction="row" spacing={2}>

          <Button><FolderOpenIcon /> </Button>
          <Button><FileOpenIcon /></Button>
          <Button ><SaveIcon /></Button>
          <Button><PlayCircleIcon /></Button>

        </Stack>
      </div>
    );
  }
}


function App() {
  //window.store = createStore(reducer);
  
/*
  const [save,setSave] = useState("");
  const memoizedCallback = useCallback(
    () => {
      setSave(save);
    },
    [save],
  );
  function saveHandler(func){
    setSave(func)

  }
  
          <BasicTabs buttonHandler={{ saveHandler: saveHandler}} />
  <button onClick={save}>save</button>
          */

    return (
      <div>

        <DirectionStack id="directionStack" />
        <td style={{ width: 200 }}>
          <SimpleAccordion />
        </td>
        <td style={{ width: 2000 }}>
          <BasicTabs/>
        </td>
        <button onClick={savercp}>save</button>


        
      </div>

    )
  
}

export default App