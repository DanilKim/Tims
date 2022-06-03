import React from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';

function Light() {
  return (
    <React.Fragment>
      <ambientLight intensity={0.1} />
      <directionalLight
        castShadow
        shadow-mapSize-height={10240}
        shadow-mapSize-width={10240}
        shadow-camera-left={-1000}
        shadow-camera-right={1000}
        shadow-camera-bottom={-1000}
        shadow-camera-top={1000}
        shadow-camera-near={0.1}
        shadow-camera-far={1000}
        shadow-radius={5}
        shadow-blurSamples={5}
        position={[15, 22, 10]}
        intensity={1} />
    </React.Fragment>
  )
}

export default observer(Light);