import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../../Types/User";

const extractToken = (token: string) => {
  const decodedToken = jwtDecode(token) as {
    user: User;
    exp: string;
  };
  const user = decodedToken.user;
  const tokenExp = decodedToken.exp;
  Cookies.set("user", JSON.stringify(user), {
    expires: new Date(tokenExp),
  });
  Cookies.set("token", JSON.stringify(token), {
    expires: new Date(tokenExp),
  });
};

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
      `${process.env.REACT_APP_SERVER_URL}/users`,
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
  } as {
    loginStatus: string;
    registerStatus: string;
  },
  reducers: {
    logout: (state) => {
      Cookies.remove("user");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        const token = action.payload.access_token;
        extractToken(token);
      })
      .addCase(register.rejected, (state) => {
        state.registerStatus = "failed";
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        const token = action.payload.access_token;
        extractToken(token);
      })
      .addCase(login.rejected, (state) => {
        state.loginStatus = "failed";
      });
  },
});

export const selectRegisterStatus = (state: any): string =>
  state.user.registerStatus;

export const selectLoginStatus = (state: any): string => state.user.loginStatus;

export const selectUser = (): User => {
  return JSON.parse(Cookies.get("user") || "{}");
};

export const selectIsLoggedIn = (): boolean => {
  return !!Cookies.get("user") && !!Cookies.get("token");
};

export const { logout } = UserSlice.actions;

export default UserSlice.reducer;
