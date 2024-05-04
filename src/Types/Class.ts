import { StudentForClass } from "./Student";

export type ClassWithStudents = {
  id: number;
  name: string;
  description: string;
  week_day: number;
  start_time: string;
  end_time: string;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
  n_of_meetings: number;
  students: StudentForClass[];
};

export type ClassPublic = {
  id: number;
  name: string;
  week_day: number;
  start_time: string;
  end_time: string;
  teacher_id: number;
  created_at: Date;
  updated_at: Date;
};

export type ClassCreate = {
  name: string;
  week_day: number;
  start_time: string;
  end_time: string;
};
