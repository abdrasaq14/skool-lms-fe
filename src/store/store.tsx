import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "../states/userDetails/userDetailsSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import employmentDetailsReducer from "../states/applicationDetails/employmentDetailsSlice";
import academicReferencesReducer from "../states/applicationDetails/academicReferencesSlice";
import fundingInformationReducer from "../states/applicationDetails/fundingInformationSlice";
<<<<<<< HEAD
import disabilityDetailsReducer from "../states/applicationDetails/disabilityDetailsSlice";
=======
import personalStatementReducer from "../states/applicationDetails/personalStatementSlice";
>>>>>>> 0c92e84b25ddb717a0b37c30e2c43e2b5a72df30

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    userDetails: userDetailsReducer,
    personalStatement: personalStatementReducer,
    employmentDetails: employmentDetailsReducer,
    academicReferences: academicReferencesReducer,
    disabilityDetails: disabilityDetailsReducer,
    fundingInformation: fundingInformationReducer,

  })
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
