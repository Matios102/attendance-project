import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Util from "../../Util";
import axios from "axios";
import { Status } from "../../Types/Status";

export const getAllData = createAsyncThunk("data/getAllData", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/main/`,
      {
        headers: Util.getHeader(),
        withCredentials: true,
      }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
});

const MainSlice = createSlice({
  name: "main",
  initialState: {
    data: {},
    dataLoadStatus: "idle" as Status,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.dataLoadStatus = "succeeded";
    });
    builder.addCase(getAllData.pending, (state) => {
      state.dataLoadStatus = "loading";
    });
    builder.addCase(getAllData.rejected, (state) => {
      state.dataLoadStatus = "failed";
    });
  },
});

export const selectData = (state: any) => state.main.data;

export const selectDataLoadStatus = (state: any) => state.main.dataLoadStatus;

export default MainSlice.reducer;
