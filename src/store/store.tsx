import { configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from '../states/userDetails/userDetailsSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



const persistConfig = {
    key: 'root',
    storage,
    
  };


  const persistedReducer = persistReducer(persistConfig, userDetailsReducer);


  export const store = configureStore({
    reducer: persistedReducer,
  });
  
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch