import React from 'react';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { observer } from 'mobx-react';

function Ground() {
  return (
    <Plane
      receiveShadow={true}
      position={[0, 0, 0]}
      rotation={[- Math.PI / 2, 0, 0]}
      args={[1000, 1000]}
      name="Plane"
    >
    </Plane>
  );
}

export default observer(Ground);