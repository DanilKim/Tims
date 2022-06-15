import {
  Box
} from '@mui/material';

import React, { useState } from 'react';
import { observer } from 'mobx-react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import Ground from './scene/ground';
import Light from './scene/light';
import Screen from './scene/screen';
import TestMesh from './scene/testMesh';
import Camera from './scene/camera';

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
        <OrbitControls makeDefault attach="orbitControls" />
        <Light />
        <Camera />
        <Screen />
        <Physics>
          <Ground />
          <TestMesh name='test1'/>
          <TestMesh name='test2'/>
        </Physics>
      </Canvas>
    </Box>
  );
}

export default observer(MainPage);