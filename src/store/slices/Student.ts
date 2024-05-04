import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentBase } from "../../Types/Student";
import axios, { AxiosError } from "axios";
import { Status } from "../../Types/Status";

export const getStudentsBySearchTerm = createAsyncThunk(
  "student/getStudentsBySearchTerm",
  async (searchTerm: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/students/${searchTerm}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

const StudentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    getStudentsBySearchTermStatus: "idle",
    getStudentsBySearchTermError: null,
  } as {
    students: StudentBase[];
    getStudentsBySearchTermStatus: Status;
    getStudentsBySearchTermError: AxiosError | null;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStudentsBySearchTerm.pending, (state) => {
      state.getStudentsBySearchTermStatus = "loading";
    });

    builder.addCase(getStudentsBySearchTerm.fulfilled, (state, action) => {
      state.getStudentsBySearchTermStatus = "succeeded";
      state.students = action.payload;
    });

    builder.addCase(getStudentsBySearchTerm.rejected, (state, action) => {
      state.getStudentsBySearchTermStatus = "failed";
      state.getStudentsBySearchTermError = action.error as AxiosError;
    });
  },
});

export const selectStudents = (state: {
  student: { students: StudentBase[] };
}) => state.student.students;

export const selectGetStudentsBySearchTermStatus = (state: {
  student: { getStudentsBySearchTermStatus: Status };
}) => state.student.getStudentsBySearchTermStatus;

export const selectGetStudentsBySearchTermError = (state: {
  student: { getStudentsBySearchTermError: AxiosError | null };
}) => state.student.getStudentsBySearchTermError;

export default StudentSlice.reducer;
