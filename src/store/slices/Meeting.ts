import { createSlice } from "@reduxjs/toolkit";
import { Meeting } from "../../Types/Meeting";

const MeetingSlice = createSlice({
  name: "meeting",
  initialState: {
    meeting: {},
  } as {
    meeting: Meeting;
  },
  reducers: {},
});

export const selectMeeting = (state: { meeting: Meeting }) => state.meeting;

export default MeetingSlice.reducer;
