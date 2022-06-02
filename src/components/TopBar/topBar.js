import {
  AppBar,
  Button,
  FormControl,
  IconButton,
  NativeSelect,
  Toolbar,
  Tooltip,
  Typography
} from '@mui/material';

import {
  Redo,
  Undo,
  PlayArrow
} from '@mui/icons-material';

import React from 'react';
import { observer } from 'mobx-react';

import MenuBtn from './menuBtn';
import StudioBtn from './studioBtn';

function TopBar() {
  return(
    <AppBar sx={{ bgcolor: '#fafafa', borderBottom: 1, borderColor: '#eaeaea' }}>
      <Toolbar variant="dense">
        <StudioBtn />
        <Tooltip title="undo"> 
          <IconButton edge="start" sx={{ ml: 10, mr: 2 }}>
            <Undo sx={{color: '#7c7c7c'}} />
          </IconButton>
        </Tooltip>
        <Tooltip title="redo">
          <IconButton edge="start" sx={{ mr: 5 }}>
            <Redo sx={{color: '#7c7c7c'}} />
          </IconButton>
        </Tooltip>
        <Typography component={'div'} sx={{ flexGrow: 1 }}>
        </Typography>
        <Tooltip title="play">
          <IconButton edge="start" sx={{ mr: 3 }}>
            <PlayArrow sx={{color: '#7c7c7c'}}/>
          </IconButton>
        </Tooltip>
        <Button variant="contained" sx={{ mr: 5, bgcolor: 'red', borderRadius: 5 }}>Export</Button>
        <MenuBtn />
      </Toolbar>
    </AppBar>
  );
}

export default observer(TopBar);