import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../states/userDetails/userDetailsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import employmentDetailsReducer from "../states/applicationDetails/employmentDetailsSlice";
import academicReferencesReducer from "../states/applicationDetails/academicReferencesSlice";
import uploadPassportReducer from "../states/applicationDetails/uploadPasswordSlice"


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    userDetails: userDetailsReducer,
    employmentDetails: employmentDetailsReducer,
    academicReferences: academicReferencesReducer,
    uploadPassport: uploadPassportReducer,
    
  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
