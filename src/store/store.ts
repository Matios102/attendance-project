import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/User";
import classReducer from "./slices/Class";
import meetingReducer from "./slices/Meeting";

export const store = configureStore({
  reducer: {
    user: userReducer,
    class: classReducer,
    meeting: meetingReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});
