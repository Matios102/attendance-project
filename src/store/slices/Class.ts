import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ClassCreate, ClassPublic, ClassWithStudents } from "../../Types/Class";
import axios, { AxiosError } from "axios";
import { Status } from "../../Types/Status";

export const getClasses = createAsyncThunk("class/getClasses", async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/classes/`,
      { withCredentials: true }
    );
    return response.data;
  } catch (e) {
    throw e;
  }
});

export const createClass = createAsyncThunk(
  "class/createClass",
  async (newClass: ClassCreate) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/classes/`,
        newClass,
        { withCredentials: true }
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const getClassById = createAsyncThunk(
  "class/getClassById",
  async (class_id: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/classes/${class_id}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const removeClass = createAsyncThunk(
  "class/removeClass",
  async (class_id: number) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/classes/${class_id}`,
        {
          withCredentials: true,
        }
      );
      return class_id;
    } catch (e) {
      throw e;
    }
  }
);

const ClassSlice = createSlice({
  name: "class",
  initialState: {
    classList: [],
    currentClass: null,
    getCurrentClassStatus: "idle",
    getClassesStatus: "idle",
    createClassStatus: "idle",
    removeClassStatus: "idle",
    getCurrentClassError: null,
    getClassesError: null,
    createClassError: null,
    removeClassError: null,
  } as {
    classList: ClassPublic[];
    currentClass: ClassWithStudents | null;
    getCurrentClassStatus: Status;
    getClassesStatus: Status;
    createClassStatus: Status;
    removeClassStatus: Status;
    getCurrentClassError: AxiosError | null;
    getClassesError: AxiosError | null;
    createClassError: AxiosError | null;
    removeClassError: AxiosError | null;
  },
  reducers: {
    resetGetClassesStatus: (state) => {
      state.getClassesStatus = "idle";
    },
    resetCreateClassStatus: (state) => {
      state.createClassStatus = "idle";
    },
    resetRemoveClassStatus: (state) => {
      state.removeClassStatus = "idle";
    },
  },
  extraReducers(builder) {
    builder.addCase(getClasses.fulfilled, (state, action) => {
      state.classList = action.payload;
      state.getClassesStatus = "succeeded";
    });
    builder.addCase(getClasses.pending, (state) => {
      state.getClassesStatus = "loading";
    });
    builder.addCase(getClasses.rejected, (state, action) => {
      state.getClassesStatus = "failed";
      state.getClassesError = action.error as AxiosError;
    });
    builder.addCase(createClass.pending, (state) => {
      state.createClassStatus = "loading";
    });
    builder.addCase(createClass.fulfilled, (state, action) => {
      state.createClassStatus = "succeeded";
      state.classList.push(action.payload);
    });
    builder.addCase(createClass.rejected, (state, action) => {
      state.createClassStatus = "failed";
      state.createClassError = action.error as AxiosError;
    });
    builder.addCase(removeClass.pending, (state) => {
      state.removeClassStatus = "loading";
    });
    builder.addCase(removeClass.fulfilled, (state, action) => {
      state.removeClassStatus = "succeeded";
      state.classList = state.classList.filter(
        (classItem) => classItem.id !== action.payload
      );
    });
    builder.addCase(removeClass.rejected, (state, action) => {
      state.removeClassStatus = "failed";
      state.removeClassError = action.error as AxiosError;
    });
    builder.addCase(getClassById.pending, (state) => {
      state.getCurrentClassStatus = "loading";
    });
    builder.addCase(getClassById.fulfilled, (state, action) => {
      state.getCurrentClassStatus = "succeeded";
      state.currentClass = action.payload;
    });
    builder.addCase(getClassById.rejected, (state, action) => {
      state.getCurrentClassStatus = "failed";
      state.getCurrentClassError = action.error as AxiosError;
    });
  },
});

export const selectCurrentClass = (state: any): ClassWithStudents | null =>
  state.class.currentClass;

export const selectClassList = (state: any): ClassPublic[] =>
  state.class.classList;

export const selectGetCurrentClassStatus = (state: any): Status =>
  state.class.getCurrentClassStatus;

export const selectGetClassesStatus = (state: any): Status =>
  state.class.getClassesStatus;

export const selectCreateClassStatus = (state: any): Status =>
  state.class.createClassStatus;

export const selectRemoveClassStatus = (state: any): Status =>
  state.class.removeClassStatus;

export const selectGetCurrentClassError = (state: any): AxiosError | null =>
  state.class.getCurrentClassError;

export const selectGetClassesError = (state: any): AxiosError | null =>
  state.class.getClassesError;

export const selectCreateClassError = (state: any): AxiosError | null =>
  state.class.createClassError;

export const selectRemoveClassError = (state: any): AxiosError | null =>
  state.class.removeClassError;

export const {
  resetGetClassesStatus,
  resetCreateClassStatus,
  resetRemoveClassStatus,
} = ClassSlice.actions;

export default ClassSlice.reducer;
