import { StudentMeetingInfo } from "./Student";

export type Meeting = {
  id: number;
  teacherId: number;
  classId: number;
  studentsAttendance: StudentMeetingInfo[];
  weekDay: number;
  startTime: string;
  endTime: string;
  date: string;
  createdAt: string;
  updatedAt: string;
};
