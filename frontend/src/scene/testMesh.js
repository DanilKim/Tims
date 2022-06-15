import { useFrame, useThree } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useStores } from '../stores/context';
import * as THREE from 'three';

function TestMesh(props) {
  const [ref, api] = useBox(() => ({mass: 1, position: [0, 5, 0], ...props }));
  let intersects;
  const [hovered, setHover] = useState(false);
  const { ActiveObjectStore } = useStores();
  const [active, setActive] = useState(false);
  const { raycaster, scene } = useThree();

  const onMouseMove = () => {
    intersects = raycaster.intersectObjects(scene.children);
    let i = 0;
    if (intersects.length !== 0){
      if (intersects[0].object.name === ref.current.name){
        i = 1;        
      }
      api.position.set(Math.round(intersects[i].point.x), Math.round(intersects[i].point.y) + 0.5, Math.round(intersects[i].point.z));
    }
  }
  
  useEffect(() => {
    if (active) {
      scene.orbitControls.enabled = false;
      api.mass.set(0);
      api.collisionResponse.set(false);
      window.addEventListener('mousemove', onMouseMove, false);
      return () => window.removeEventListener('mousemove', onMouseMove);
    } else {
      api.collisionResponse.set(true);
      api.mass.set(1);
      scene.orbitControls.enabled = true;
    }
  }, [active])
  
  return (
    <mesh
      {...props}
      ref={ref}
      name={props.name}
      onClick={(event) => { event.stopPropagation(); setActive(!active); }}
      onPointerOver={(event) => { event.stopPropagation(); setHover(true); }}
      onPointerOut={(event) => { event.stopPropagation(); setHover(false); }}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default observer(TestMesh);