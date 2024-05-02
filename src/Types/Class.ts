import { StudentInfo } from "./Student";

export type Class = {
  id: number | null;
  name: string;
  description: string;
  teacherId: number;
  students: StudentInfo[];
  weekDay: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};

export type ClassCreate = {
  name: string;
  weekDay: number;
  startTime: string;
  endTime: string;
};
