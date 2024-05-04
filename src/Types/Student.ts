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

export type StudentMeetingInfo = {
  id: number;
  name: string;
  email: string;
  present: boolean;
};
