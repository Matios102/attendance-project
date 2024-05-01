export type Class = {
  id: number | null;
  name: string;
  description: string;
  teacherId: number;
  students: number[];
  weekDay: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
};
