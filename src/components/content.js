import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloorMesh() {
  const mesh = useRef(null);
  const cylinder = new THREE.CylinderBufferGeometry(1, 1, 0.3, 50);
  return(
    <mesh ref={mesh} scale={3} geometry={cylinder}>
      <meshLambertMaterial attach="material" />
    </mesh>
  )

}

function Content() {
  return(
    <>
      <Canvas>
        <FloorMesh />
      </Canvas>
    </>
  );
}

export default observer(Content);