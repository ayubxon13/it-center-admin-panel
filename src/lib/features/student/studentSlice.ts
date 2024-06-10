import {createSlice} from "@reduxjs/toolkit"

export const studentSlice = createSlice({
  name: "student",
  initialState: {
    singleStudentData: null as null | IStudents,
  },
  reducers: {
    setSingleStudentData: (state, {payload}: {payload: IStudents}) => {
      state.singleStudentData = payload
    },
  },
})

export const {setSingleStudentData} = studentSlice.actions

export default studentSlice.reducer
