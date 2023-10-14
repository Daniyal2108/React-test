import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import thunk from "redux-thunk";
import customerReducer from "./slices/customer-slice";

const customerReducerConfig = {
  key: "customer",
  storage,
  stateReconciler: autoMergeLevel2,
};

const rootReducers = combineReducers({
  customer: persistReducer(customerReducerConfig, customerReducer),
});

const store = configureStore({
  reducer: rootReducers,
  middleware: [thunk],
});

export const persistedStore = persistStore(store);

export default store;
