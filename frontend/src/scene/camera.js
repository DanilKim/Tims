import React, { useEffect } from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { useStores } from '../stores/context';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Camera() {
  const { scene } = useThree();
  const { ModeStore } = useStores();

  const keyBoardEvent = () => {
    switch(window.event.code) {
      case 'KeyT':
        ModeStore.setCamMode('top');
        scene.orbitControls.setAzimuthalAngle(0.0);
        scene.orbitControls.setPolarAngle(0.0);
        scene.orbitControls.enableRotate = false;
        break;
      case 'KeyI':
        ModeStore.setCamMode('isometric');
        scene.orbitControls.setAzimuthalAngle(Math.PI/4);
        scene.orbitControls.setPolarAngle(Math.PI/4);
        scene.orbitControls.enableRotate = false;
        break;
      case 'KeyO':
        ModeStore.setCamMode('orbit');
        scene.orbitControls.setAzimuthalAngle(0.0);
        scene.orbitControls.setPolarAngle(1.0);
        scene.orbitControls.enableRotate = true;
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyBoardEvent);
    return () => window.removeEventListener('keydown', keyBoardEvent);
  })

  return(
    <React.Fragment>
      <OrbitControls makeDefault attach="orbitControls" />
    </React.Fragment>
  )
}

export default observer(Camera);