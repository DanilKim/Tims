import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from 'react-dom/client';

import {
  StoreProvider,
  RootStore,
  MainPage,
  SignIn,
  SignUp
} from 'tims';

const container = document.getElementById('root');
const root = createRoot(container);
const rootStore = new RootStore();

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<SignIn/>}></Route>
      <Route path="/SignUp" exact element={<SignUp/>}></Route>
      <Route path="/Tims" element={
        <StoreProvider value={rootStore}>
          <MainPage/>
        </StoreProvider>
      }></Route>
    </Routes>
  </BrowserRouter>
  
);