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
    toggleAddNotificationsValue: false,
    toggleEditNotificationsValue: false,
    toggleAddCourseValue: false,
    toggleEditCourseValue: false,
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
    toggleAddNotificationsFunc: (state) => {
      state.toggleAddNotificationsValue = !state.toggleAddNotificationsValue;
    },
    toggleEditNotificationsFunc: (state) => {
      state.toggleEditNotificationsValue = !state.toggleEditNotificationsValue;
    },
    toggleAddCourseFunc: (state) => {
      state.toggleAddCourseValue = !state.toggleAddCourseValue;
    },
    toggleEditCourseFunc: (state) => {
      state.toggleEditCourseValue = !state.toggleEditCourseValue;
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
  toggleAddNotificationsFunc,
  toggleEditNotificationsFunc,
  toggleAddCourseFunc,
  toggleEditCourseFunc,
} = toggleSlice.actions;
export default toggleSlice.reducer;
