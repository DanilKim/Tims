import {
  Box
} from '@mui/material';

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';

import Decorator from './scene/decorator';

function MainPage() {
  const [ scene, setStore ] = useState(new THREE.Scene);

  const canvas_style = { background: "white" };
  const camera_settings = { position: [0, 5, 10] };

  return(
    <Box sx={{ bgcolor: 'white', width: '100vw', height: '100vh' }}>
      <Canvas 
      style={canvas_style}
      camera={camera_settings}
      onCreated={({ scene }) => setStore( scene )}>
        <Html fullscreen >
          <Box> hello world! </Box>
        </Html>
        <OrbitControls makeDefault attach="orbitControls" />
        <Decorator />
      </Canvas>
    </Box>
  );
}

export default observer(MainPage);