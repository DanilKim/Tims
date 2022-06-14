import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useStores } from '../stores/context';
import * as THREE from 'three';

function TestMesh(props) {
  const [ref, api] = useBox(() => ({mass: 0, position: [0, 1, 0], ...props }));
  let intersects;
  const [hovered, setHover] = useState(false);
  const { ActiveObjectStore } = useStores();
  const [active, setActive] = useState(false);
  const { raycaster, scene } = useThree();

  const onMouseMove = () => {
    intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length !== 0){
      if (intersects[0].object.name === ref.current.name){
        api.position.set(intersects[1].point.x, intersects[1].point.y+0.5, intersects[1].point.z);
      }
      else {
        api.position.set(intersects[0].point.x, intersects[0].point.y+0.5, intersects[0].point.z);
      }
    }  
  }
  
  useEffect(() => {
    if (active) {
      scene.orbitControls.enabled = false;
      window.addEventListener('mousemove', onMouseMove, false);
      return () => window.removeEventListener('mousemove', onMouseMove);
    } else {
      scene.orbitControls.enabled = true;
    }
  }, [active])
  
  return (
    <mesh
      {...props}
      ref={ref}
      name='TestMesh'
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default observer(TestMesh);