import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Class, ClassCreate } from "../../Types/Class";
import axios from "axios";
import { Status } from "../../Types/Status";

export const getClasses = createAsyncThunk("class/getClasses", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/classes/`,
    { withCredentials: true }
  );
  return response.data;
});

export const createClass = createAsyncThunk(
  "class/createClass",
  async (newClass: ClassCreate) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/classes/`,
      newClass,
      { withCredentials: true }
    );
    return response.data;
  }
);

const ClassSlice = createSlice({
  name: "class",
  initialState: {
    classList: [],
    getClassesStatus: "idle",
    createClassStatus: "idle",
  } as {
    classList: Class[];
    getClassesStatus: Status;
    createClassStatus: Status;
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getClasses.fulfilled, (state, action) => {
      state.classList = action.payload;
      state.getClassesStatus = "succeeded";
    });
    builder.addCase(getClasses.pending, (state) => {
      state.getClassesStatus = "loading";
    });
    builder.addCase(getClasses.rejected, (state) => {
      state.getClassesStatus = "failed";
    });
    builder.addCase(createClass.pending, (state) => {
      state.createClassStatus = "loading";
    });
    builder.addCase(createClass.fulfilled, (state, action) => {
      state.createClassStatus = "succeeded";
      state.classList.push(action.payload);
    });
    builder.addCase(createClass.rejected, (state) => {
      state.createClassStatus = "failed";
    });
  },
});

export const selectClassList = (state: any): Class[] => state.class.classList;

export const selectClassById = (state: any, id: number): Class | undefined =>
  state.class.classList.find((classItem: Class) => classItem.id === id);

export default ClassSlice.reducer;
