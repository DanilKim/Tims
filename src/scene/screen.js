import {
  Box
} from '@mui/material';

import React from 'react';
import * as THREE from 'three';
import { observer } from 'mobx-react';
import { Html } from '@react-three/drei';

function Screen() {
  return (
    <Html fullscreen>
      <Box> hello world! </Box>
    </Html>
  )
}

export default observer(Screen);