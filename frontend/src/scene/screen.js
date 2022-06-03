import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material';

import React from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { Html } from '@react-three/drei';
import MenuBtn from './menuBtn';

function Screen() {
  return (
    <Html fullscreen>
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <AppBar position='static' sx={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar variant="dense">
            <Typography component={'div'} sx={{ color: 'black', flexGrow: 1 }}>
              Hello!!
            </Typography>
            <MenuBtn />
          </Toolbar>
        </AppBar>
      </Box>
    </Html>
  )
}

export default observer(Screen);