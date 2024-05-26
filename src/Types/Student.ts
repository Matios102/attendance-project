export type StudentBase = {
  id: number;
  name: string;
  email: string;
};

export type StudentInfo = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type StudentForClass = {
  id: number;
  name: string;
  email: string;
  present_n_times: number;
};

export type Attendance = {
  arrival_time: Date;
  presence: boolean;
  was_late: boolean;
  created_at?: Date | null;
  updated_at?: Date | null;
  meeting_id: number;
  student_id: number;
};

export type StudentMeetingInfo = {
  attendance: Attendance;
} & StudentBase;
