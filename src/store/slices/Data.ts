import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk(
  "data/",
  async () => {
    try {
      const response = await axios.get( `${process.env.REACT_APP_SERVER_URL}/data/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);



const initialState = {
  data: null as string | null,
  status: "idle",
  error: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
extraReducers: (builder) => {
    builder
        .addCase(fetchData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
        })
        .addCase(fetchData.rejected, (state, action) => {
            state.status = "failed";
            state.data = null;
        });
},
});

export default dataSlice.reducer;
