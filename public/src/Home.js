import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  StoreProvider,
  RootStore,
  MainPage
} from 'mint-studio';

const container = document.getElementById('root');
const root = createRoot(container);
const rootStore = new RootStore();

root.render(
  <StoreProvider value={rootStore}>
    <MainPage />
  </StoreProvider>
);