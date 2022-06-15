import React from 'react';
import * as THREE from 'three';
import { usePlane } from '@react-three/cannon';
import { observer } from 'mobx-react';

function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [- Math.PI / 2, 0, 0], ...props })) 
  return (
    <mesh ref={ref}>
      <planeGeometry args={[100, 100]} />
    </mesh>
  );
}

export default observer(Ground);