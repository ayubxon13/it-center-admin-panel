import {createSlice} from "@reduxjs/toolkit";

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    singleStudentData: null as null | IStudents,
  },
  reducers: {
    setSingleStudentData: (state, {payload}: {payload: IStudents | null}) => {
      state.singleStudentData = payload;
    },
  },
});

export const {setSingleStudentData} = studentSlice.actions;

export default studentSlice.reducer;
