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
    toggleAddCategoryValue: false,
    toggleEditCategoryValue: false,
    toggleAddCoursesValue: false,
    toggleEditCoursesValue: false,
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
    toggleAddCategoryFunc: (state) => {
      state.toggleAddCategoryValue = !state.toggleAddCategoryValue;
    },
    toggleEditCategoryFunc: (state) => {
      state.toggleEditCategoryValue = !state.toggleEditCategoryValue;
    },
    toggleAddCoursesFunc: (state) => {
      state.toggleAddCoursesValue = !state.toggleAddCoursesValue;
    },
    toggleEditCoursesFunc: (state) => {
      state.toggleEditCoursesValue = !state.toggleEditCoursesValue;
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
  toggleAddCategoryFunc,
  toggleEditCategoryFunc,
  toggleAddCoursesFunc,
  toggleEditCoursesFunc,
} = toggleSlice.actions;
export default toggleSlice.reducer;
