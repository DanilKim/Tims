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
import MenuBtn from './menu/mainBtn';
import AddBtn from './menu/addBtn';

function Screen() {
  return (
    <Html fullscreen>
      <Box sx={{ width: '100vw', height: '100vh' }}>
        <AppBar position='static' sx={{ background: 'transparent', boxShadow: 'none' }}>
          <Toolbar variant="dense" sx={{ display: 'flex'}}>
            <MenuBtn />
            <Typography sx={{ color: 'black' }}>
              Hello!!
            </Typography>
          </Toolbar>
        </AppBar>
        <AddBtn/>
      </Box>
    </Html>
  )
}

export default observer(Screen);