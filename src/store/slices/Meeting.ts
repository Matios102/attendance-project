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

export const cancelMeeting = createAsyncThunk(
  "meeting/cancelMeeting",
  async (meetingId: number) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/meetings/${meetingId}/cancel`,
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

export const getCurrentMeeting = createAsyncThunk(
  "meeting/getCurrentMeeting",
  async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/meetings`,
        {
          headers: Util.getHeader(),
          withCredentials: true,
        }
      );
      return response.data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

const MeetingSlice = createSlice({
  name: "meeting",
  initialState: {
    meeting: null,
    currentMeeting: null,
    meetingsForClass: [] as MeetingPublic[],
    meetingStatus: "idle",
  } as {
    meeting: MeetingWithStudents | null;
    meetingsForClass: MeetingPublic[];
    currentMeeting: MeetingPublic | null;
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
    builder.addCase(cancelMeeting.fulfilled, (state) => {
      state.meetingStatus = "succeeded";
    });
    builder.addCase(cancelMeeting.pending, (state) => {
      state.meetingStatus = "loading";
    });
    builder.addCase(cancelMeeting.rejected, (state) => {
      state.meetingStatus = "failed";
    });
    builder.addCase(getCurrentMeeting.fulfilled, (state, action) => {
      state.currentMeeting = action.payload;
    });
    builder.addCase(getCurrentMeeting.rejected, (state) => {
      state.currentMeeting = null;
    });
  },
});

export const selectMeeting = (state: any): MeetingWithStudents =>
  state.meeting.meeting;

export const selectMeetingsForClass = (state: any): MeetingPublic[] =>
  state.meeting.meetingsForClass;

export const selectMeetingStatus = (state: any): Status =>
  state.meeting.meetingStatus;

export const selectCurrentMeeting = (state: any): MeetingPublic =>
  state.meeting.currentMeeting;

export default MeetingSlice.reducer;
