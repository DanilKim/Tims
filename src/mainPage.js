import {
  Box
} from '@mui/material';

import React from 'react';
import { observer } from 'mobx-react';

function MainPage() {
  return(
    <Box sx={{ bgcolor: 'white', width: '100vw', height: '100vh' }}>
    </Box>
  );
}

export default observer(MainPage);