import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MeetingPublic, MeetingWithStudents } from "../../Types/Meeting";
import axios from "axios";
import Util from "../../Util";
import { Status } from "../../Types/Status";

export const getMeetingsForClass = createAsyncThunk(
  "meeting/getMeetingsForClass",
  async (classId: number) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/meetings/class/${classId}`,
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

export const getMeetingById = createAsyncThunk(
  "meeting/getMeetingById",
  async (meetingId: number) => {
    console.log("meetingId", meetingId);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/meetings/${meetingId}`,
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

const MeetingSlice = createSlice({
  name: "meeting",
  initialState: {
    meeting: null,
    meetingsForClass: [] as MeetingPublic[],
    meetingStatus: "idle",
  } as {
    meeting: MeetingWithStudents | null;
    meetingsForClass: MeetingPublic[];
    meetingStatus: Status;
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMeetingsForClass.fulfilled, (state, action) => {
      state.meetingsForClass = action.payload;
      state.meetingStatus = "succeeded";
    });
    builder.addCase(getMeetingById.fulfilled, (state, action) => {
      state.meeting = action.payload;
      state.meetingStatus = "succeeded";
    });
    builder.addCase(getMeetingsForClass.pending, (state) => {
      state.meetingStatus = "loading";
    });
    builder.addCase(getMeetingsForClass.rejected, (state) => {
      state.meetingStatus = "failed";
    });
    builder.addCase(getMeetingById.pending, (state) => {
      state.meetingStatus = "loading";
    });
    builder.addCase(getMeetingById.rejected, (state) => {
      state.meetingStatus = "failed";
    });
  },
});

export const selectMeeting = (state: any): MeetingWithStudents =>
  state.meeting.meeting;

export const selectMeetingsForClass = (state: any): MeetingPublic[] =>
  state.meeting.meetingsForClass;

export const selectMeetingStatus = (state: any): Status =>
  state.meeting.meetingStatus;

export default MeetingSlice.reducer;
