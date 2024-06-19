import {createSlice} from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
    toggleFilterValue: false,
    toggleAddStudentValue: false,
    toggleEditStudentValue: false,
    toggleRegistrationValue: false,
    toggleEditRegistrationValue: false,
    toggleAddAdsValue: false,
  },
  reducers: {
    toggleFilterFunc: (state) => {
      state.toggleFilterValue = !state.toggleFilterValue;
      state.toggleAddStudentValue = false;
    },
    toggleAddStudentFunc: (state) => {
      state.toggleAddStudentValue = !state.toggleAddStudentValue;
      state.toggleFilterValue = false;
    },
    toggleEditStudentFunc: (state) => {
      state.toggleEditStudentValue = !state.toggleEditStudentValue;
    },
    toggleRegistrationFunc: (state) => {
      state.toggleRegistrationValue = !state.toggleRegistrationValue;
    },
    toggleEditRegistrationFunc: (state) => {
      state.toggleEditRegistrationValue = !state.toggleEditRegistrationValue;
    },
    toggleAddAdsFunc: (state) => {
      state.toggleAddAdsValue = !state.toggleAddAdsValue;
    },
  },
});

export const {
  toggleFilterFunc,
  toggleAddStudentFunc,
  toggleEditStudentFunc,
  toggleRegistrationFunc,
  toggleEditRegistrationFunc,
  toggleAddAdsFunc,
} = toggleSlice.actions;
export default toggleSlice.reducer;
