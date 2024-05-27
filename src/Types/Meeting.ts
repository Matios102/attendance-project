import { StudentMeetingInfo } from "./Student";


export type MeetingCreate = {
  teacher_id: number;
  class_id: number;
  start_date: Date;
  end_date: Date;
};

export type MeetingPublic = {
  id: number;
  cancelled: boolean;
  created_at?: string;
  updated_at?: string;
} & MeetingCreate;

export type MeetingWithStudents = {
  students: StudentMeetingInfo[];
} & MeetingPublic;