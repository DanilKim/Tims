import {
  Box
} from '@mui/material';

import React from 'react';
import { observer } from 'mobx-react';

import TopBar from './components/TopBar/topBar';
import Content from './components/content'

function MainPage() {
  return(
    <Box sx={{ bgcolor: 'white', width: '100vw', height: '100vh' }}>
      <TopBar />
      <Content />
    </Box>
  );
}

export default observer(MainPage);