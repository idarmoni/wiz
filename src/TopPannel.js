import * as React from 'react';


import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import SaveIcon from '@mui/icons-material/Save';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FileOpenIcon from '@mui/icons-material/FileOpen';  


  export const DirectionStack = function () {
    return (
      <div>
        <Stack direction="row" spacing={2}>
        
        <Button><FolderOpenIcon/> </Button>
        <Button><FileOpenIcon/></Button>
        <Button><SaveIcon/></Button>
        <Button><PlayCircleIcon/></Button>

        </Stack>
      </div>
    );
  }
  