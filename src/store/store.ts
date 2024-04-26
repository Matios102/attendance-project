import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/User";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
