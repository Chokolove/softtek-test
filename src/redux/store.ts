import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import { userApi } from "./services/userApi";
import { plansApi } from "./services/plansApi";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import stepSlice from "./slices/stepSlice";
import planSlice from "./slices/planSlice";

const persistedConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  user: userSlice,
  step: stepSlice,
  plan: planSlice,
  [userApi.reducerPath]: userApi.reducer,
  [plansApi.reducerPath]: plansApi.reducer,
});

const persistedReducer = persistReducer(persistedConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(userApi.middleware, plansApi.middleware),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
