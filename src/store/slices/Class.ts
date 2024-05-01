import { createSlice } from "@reduxjs/toolkit";
import { Class } from "../../Types/Class";

const ClassSlice = createSlice({
  name: "class",
  initialState: {
    classList: [
      {
        id: 1,
        name: "Math",
        description: "Math class",
        teacherId: 1,
        students: [
          {
            id: 1,
            name: "John Doe",
            email: "johndoe@gmail.com",
            createdAt: "2021-01-01",
            updatedAt: "2021-01-01",
          },
          {
            id: 2,
            name: "John Smith",
            email: "johnsmith@gmail.com",
            createdAt: "2021-01-01",
            updatedAt: "2021-01-01",
          },
          {
            id: 3,
            name: "John Extra",
            email: "johnextra@gmail.com",
            createdAt: "2021-01-01",
            updatedAt: "2021-01-01",
          },
        ],
        weekDay: 1,
        startTime: "10:00",
        endTime: "12:00",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
      },
      {
        id: 2,
        name: "Science",
        description: "Science class",
        teacherId: 2,
        students: [],
        weekDay: 2,
        startTime: "10:00",
        endTime: "11:00",
        createdAt: "2021-01-01",
        updatedAt: "2021-01-01",
      },
    ],
  } as {
    classList: Class[];
  },
  reducers: {
    saveClass: (state, action: { payload: Class }) => {
      const newClass = action.payload;

      const existingClass = newClass?.id != null;

      if (existingClass) {
        state.classList = state.classList.map((classItem) =>
          classItem.id === newClass.id ? newClass : classItem
        );
        return;
      }

      state.classList.push({
        ...newClass,
        id: state.classList.length + 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
    removeClass: (state, action) => {
      state.classList = state.classList.filter(
        (classItem) => classItem.id !== action.payload
      );
    },
  },
  extraReducers(builder) {},
});

export const selectClassList = (state: any): Class[] => state.class.classList;

export const selectClassById = (state: any, id: number): Class | undefined =>
  state.class.classList.find((classItem: Class) => classItem.id === id);

export const { saveClass, removeClass } = ClassSlice.actions;

export default ClassSlice.reducer;
