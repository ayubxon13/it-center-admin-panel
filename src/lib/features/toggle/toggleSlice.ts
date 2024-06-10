import {createSlice} from "@reduxjs/toolkit"

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    toggleFilterValue: false,
    toggleAddStudentValue: false,
    toggleEditStudentValue: false,
    toggleRegistrationValue: false,
  },
  reducers: {
    toggleFilterFunc: (state) => {
      state.toggleFilterValue = !state.toggleFilterValue
      state.toggleAddStudentValue = false
    },
    toggleAddStudentFunc: (state) => {
      state.toggleAddStudentValue = !state.toggleAddStudentValue
      state.toggleFilterValue = false
    },
    toggleEditStudentFunc: (state) => {
      state.toggleEditStudentValue = !state.toggleEditStudentValue
    },
    toggleRegistrationFunc: (state) => {
      state.toggleRegistrationValue = !state.toggleRegistrationValue
    },
  },
})

export const {
  toggleFilterFunc,
  toggleAddStudentFunc,
  toggleEditStudentFunc,
  toggleRegistrationFunc,
} = toggleSlice.actions
export default toggleSlice.reducer
