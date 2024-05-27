import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StudentBase } from "../../Types/Student";
import axios, { AxiosError } from "axios";
import { Status } from "../../Types/Status";
import Util from "../../Util";

export const getStudentsBySearchTerm = createAsyncThunk(
  "student/getStudentsBySearchTerm",
  async (searchTerm: string) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/students/${searchTerm}`,
        {
          headers: Util.getHeader(),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const addStudentToClass = createAsyncThunk(
  "student/addStudentToClass",
  async ({ studentId, classId }: { studentId: number; classId: number }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/students/${studentId}/class/${classId}`,
        {},
        {
          headers: Util.getHeader(),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const removeStudentFromClass = createAsyncThunk(
  "student/removeStudentFromClass",
  async ({ studentId, classId }: { studentId: number; classId: number }) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/students/${studentId}/class/${classId}`,
        {
          headers: Util.getHeader(),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      throw e;
    }
  }
);

export const sendStudentPicture = createAsyncThunk(
  "student/sendStudentPicture",
  async ({ picture }: { picture: File }) => {
    try {
      const formData = new FormData();
      formData.append("file", picture);
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/ml`,
        formData,
        {
          headers: {
            ...Util.getHeader(),
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      return response.data.detected_people_names as string[];
    } catch (e) {
      console.error("Error sending picture and receiving data:", e);
      throw e;
    }
  }
);

const StudentSlice = createSlice({
  name: "student",
  initialState: {
    students: [],
    getStudentsBySearchTermStatus: "idle",
    addStudentToClassStatus: "idle",
    removeStudentFromClassStatus: "idle",
    getStudentsBySearchTermError: null,
    addStudentToClassError: null,
    removeStudentFromClassError: null,
    detectedPeopleNames: [],
    detectionStatus: "idle",
  } as {
    students: StudentBase[];
    getStudentsBySearchTermStatus: Status;
    addStudentToClassStatus: Status;
    removeStudentFromClassStatus: Status;
    getStudentsBySearchTermError: AxiosError | null;
    addStudentToClassError: AxiosError | null;
    removeStudentFromClassError: AxiosError | null;
    detectedPeopleNames: string[];
    detectionStatus: Status;
  },
  reducers: {
    resetAddStudentToClassStatus: (state) => {
      state.addStudentToClassStatus = "idle";
    },
    resetRemoveStudentFromClassStatus: (state) => {
      state.removeStudentFromClassStatus = "idle";
    },
    resetDetectionStatus: (state) => {
      state.detectionStatus = "idle";
    }
  },
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
    builder.addCase(addStudentToClass.pending, (state) => {
      state.addStudentToClassStatus = "loading";
    });
    builder.addCase(addStudentToClass.fulfilled, (state) => {
      state.addStudentToClassStatus = "succeeded";
    });
    builder.addCase(addStudentToClass.rejected, (state, action) => {
      state.addStudentToClassStatus = "failed";
      state.addStudentToClassError = action.error as AxiosError;
    });
    builder.addCase(removeStudentFromClass.pending, (state) => {
      state.removeStudentFromClassStatus = "loading";
    });
    builder.addCase(removeStudentFromClass.fulfilled, (state) => {
      state.removeStudentFromClassStatus = "succeeded";
    });
    builder.addCase(removeStudentFromClass.rejected, (state, action) => {
      state.removeStudentFromClassStatus = "failed";
      state.removeStudentFromClassError = action.error as AxiosError;
    });
    builder.addCase(sendStudentPicture.fulfilled, (state, action) => {
      state.detectedPeopleNames = action.payload;
      state.detectionStatus = "succeeded";
    });
    builder.addCase(sendStudentPicture.rejected, (state) => {
      state.detectionStatus = "failed";
    });
    builder.addCase(sendStudentPicture.pending, (state) => {
      state.detectionStatus = "loading";
    });
  },
});

export const selectStudents = (state: {
  student: { students: StudentBase[] };
}) => state.student.students;

export const selectGetStudentsBySearchTermStatus = (state: {
  student: { getStudentsBySearchTermStatus: Status };
}) => state.student.getStudentsBySearchTermStatus;

export const selectAddStudentToClassStatus = (state: {
  student: { addStudentToClassStatus: Status };
}) => state.student.addStudentToClassStatus;

export const selectRemoveStudentFromClassStatus = (state: {
  student: { removeStudentFromClassStatus: Status };
}) => state.student.removeStudentFromClassStatus;

export const selectGetStudentsBySearchTermError = (state: {
  student: { getStudentsBySearchTermError: AxiosError | null };
}) => state.student.getStudentsBySearchTermError;

export const selectAddStudentToClassError = (state: {
  student: { addStudentToClassError: AxiosError | null };
}) => state.student.addStudentToClassError;

export const selectRemoveStudentFromClassError = (state: {
  student: { removeStudentFromClassError: AxiosError | null };
}) => state.student.removeStudentFromClassError;

export const selectDetectedPeopleNames = (state: {
  student: { detectedPeopleNames: string[] };
}) => state.student.detectedPeopleNames;

export const selectDetectionStatus = (state: {
  student: { detectionStatus: Status };
}) => state.student.detectionStatus;

export const {
  resetAddStudentToClassStatus,
  resetRemoveStudentFromClassStatus,
  resetDetectionStatus
} = StudentSlice.actions;

export default StudentSlice.reducer;
