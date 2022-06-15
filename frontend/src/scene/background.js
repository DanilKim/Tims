import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Environment, useProgress, Sky, Stars, Cloud } from '@react-three/drei';


const Loader = () => {
  const { progress } = useProgress();
  return <Html center><h1>Loading Background... </h1></Html>
}


function BackgGround(props) {
  return (
    <Suspense fallback={<Loader/>}>
      <Sky distance={45000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <Stars radius={5} depth={100} count={100} factor={4} saturation={0} fade speed={0.1} />
    </Suspense>

  );
}

export default BackgGround;