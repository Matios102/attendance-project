import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const register = createAsyncThunk(
  "user/register",
  async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/register`,
      {
        name: name,
        email: email,
        password: password,
      }
    );
    return response.data;
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      {
        email: email,
        password: password,
      }
    );
    return response.data;
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loginStatus: "idle",
    registerStatus: "idle",
    userId: -1,
  } as {
    loginStatus: string;
    registerStatus: string;
    userId: number;
  },
  reducers: {
    logout: (state) => {
      state.userId = -1;
      Cookies.remove("user");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state) => {
        state.registerStatus = "succeeded";
      })
      .addCase(register.rejected, (state) => {
        state.registerStatus = "failed";
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.userId = action.payload.user.user_id;
        Cookies.set("user", JSON.stringify(action.payload.user), {
          expires: new Date(Date.now() + 1000 * 60 * 60),
        });
        Cookies.set("token", JSON.stringify(action.payload.token), {
          expires: new Date(Date.now() + 1000 * 60 * 60),
        });
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = "failed";
      });
  },
});

export const selectRegisterStatus = (state: any): string =>
  state.user.registerStatus;

export const selectLoginStatus = (state: any): string => state.user.loginStatus;

export const selectUserId = (state: any): number => state.user.userId;

export const selectIsLoggedIn = (): boolean => {
  return !!Cookies.get("user") && !!Cookies.get("token");
};

export const { logout } = UserSlice.actions;

export default UserSlice.reducer;
