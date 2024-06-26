import {
  createSlice,
  createAsyncThunk,  
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { User } from "../../Types/User";
import { Status } from "../../Types/Status";

const extractToken = (token: string) => {
  const decodedToken = jwtDecode(token) as {
    user: User;
    exp: number;
  };
  const user = decodedToken.user;
  const tokenExp = decodedToken.exp * 1000;
  Cookies.set("user", JSON.stringify(user), {
    expires: new Date(tokenExp),
  });
  Cookies.set("token", token, {
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
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/users`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          email: email,
          password: password,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    loginStatus: "idle",
    registerStatus: "idle",
    loginError: null,
    registerError: null,
  } as {
    loginStatus: Status;
    registerStatus: Status;
    loginError: AxiosError | null;
    registerError: AxiosError | null;
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
      .addCase(register.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.error as AxiosError;
      })
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        const token = action.payload.access_token;
        extractToken(token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.error as AxiosError;
      });
  },
});

export const selectRegisterStatus = (state: any): Status =>
  state.user.registerStatus;

export const selectLoginStatus = (state: any): Status => state.user.loginStatus;

export const selectUser = (): User => {
  return JSON.parse(Cookies.get("user") || "{}");
};

export const selectIsLoggedIn = (): boolean => {
  return !!Cookies.get("user") && !!Cookies.get("token");
};

export const selectLoginError = (state: any): AxiosError | null => {
  return state.user.loginError;
};

export const selectRegisterError = (state: any): AxiosError | null => {
  return state.user.registerError;
};

export const { logout } = UserSlice.actions;

export default UserSlice.reducer;
