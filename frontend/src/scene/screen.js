import {
  AppBar,
  Box,
  Toolbar,
  Typography
} from '@mui/material';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { Html } from '@react-three/drei';
import MenuBtn from './menu/mainBtn';
import AddBtn from './menu/addBtn';
import { useThree } from '@react-three/fiber';

function Screen() {
  const ref = useRef();
  const { camera, viewport } = useThree();

  useEffect(() => {
    const refCopy = ref.current;
    camera.add(refCopy);
    return () => {
      camera.remove(refCopy);
    };
  }, [camera, ref.current]);

  return (
    <group ref={ref}>
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
    </group>
  )
}

export default observer(Screen);