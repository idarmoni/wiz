
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import SaveIcon from '@mui/icons-material/Save';
// import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import React from 'react';
import * as utils from './utils';




export class DirectionStack extends React.Component {

  render() {

    return (
      <div>
        <Stack direction="row" spacing={2}>

          {/* <Button><FolderOpenIcon /> </Button> */}
          <Button onClick={utils.addNewTab} title={'new recipe'}><FileOpenIcon /></Button>
          <Button onClick={utils.saveall} title={'save all'}><SaveAltIcon/></Button>
          <Button onClick={utils.save} title = {'save'}><SaveIcon/></Button>
          <Button onClick={utils.execute} title = {'execute'}><PlayCircleIcon /></Button>

        </Stack>
      </div>
    );
  }
}