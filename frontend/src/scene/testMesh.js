import { useFrame, useThree } from '@react-three/fiber';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useStores } from '../stores/Context';
import * as THREE from 'three';

function TestMesh(props) {
  const mesh = useRef();
  let intersects;
  const [hovered, setHover] = useState(false);
  const { ActiveObjectStore } = useStores();
  const [active, setActive] = useState(false);
  const { raycaster, scene } = useThree();

  const onMouseMove = () => {
    if (active) {
      scene.orbitControls.enabled = false;
      intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length !== 0){
        if (intersects[0].object.name === mesh.current.name){
          mesh.current.position.set(intersects[1].point.x, intersects[1].point.y, intersects[1].point.z);
        }
        else {
          mesh.current.position.set(intersects[0].point.x, intersects[0].point.y, intersects[0].point.z);
        }
      }  
    }
    else {
      scene.orbitControls.enabled = true;
    }
  }

  useEffect(() => {
    if (active) {
      window.addEventListener('mousemove', onMouseMove, false);
      return () => window.removeEventListener('mousemove', onMouseMove);
    }
  }, [active])
  
  return (
    <mesh
      {...props}
      ref={mesh}
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