import React from 'react';
import * as THREE from 'three';
import { Plane } from '@react-three/drei';
import { observer } from 'mobx-react';

function Decorator() {
  return (
  <React.Fragment>
    <ambientLight intensity={0.1} />
    <Plane
      receiveShadow={true}
      position={[0, 0, 0]} // 강, 도로 보다 살짝 아래로 위치 시키기
      rotation={[- Math.PI / 2, 0, 0]}
      args={[1000, 1000]}
      name="Plane"
    >
    </Plane>
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
  );
}

export default observer(Decorator);