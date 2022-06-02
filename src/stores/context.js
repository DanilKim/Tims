import * as React from 'react';
import { RootStore } from './RootStore';

export const StoreContext = React.createContext(new RootStore());
export const StoreProvider = StoreContext.Provider;
export const StoreConsumer = StoreContext.Consumer;

export const useStores = () => React.useContext(StoreContext);