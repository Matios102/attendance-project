import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/User";
import classReducer from "./slices/Class";

export const store = configureStore({
  reducer: {
    user: userReducer,
    class: classReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
