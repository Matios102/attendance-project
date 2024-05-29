import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/User";
import classReducer from "./slices/Class";
import meetingReducer from "./slices/Meeting";
import studentReducer from "./slices/Student";
import mainReducer from "./slices/Main";
import dataReducer from "./slices/Data";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
    class: classReducer,
    meeting: meetingReducer,
    student: studentReducer,
    main: mainReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
