import React from 'react';
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';
import { usePlane } from '@react-three/cannon';
import { observer } from 'mobx-react';

function Ground(props) {
  const [ref] = usePlane(() => ({ rotation: [- Math.PI / 2, 0, 0], ...props })) 

  let groundTexture = useLoader(THREE.TextureLoader, '/textures/grass_ground.jpg')
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(50, 50);

  return (
    <mesh ref={ref}>
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshBasicMaterial attach="material" map={groundTexture}/>
    </mesh>
  );
}

export default observer(Ground);