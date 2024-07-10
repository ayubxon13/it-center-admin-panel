import {createSlice} from "@reduxjs/toolkit";

export const toggleSlice = createSlice({
  name: "toggle",
  initialState: {
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
    toggleAddQuestionValue: false,
    toggleAddLessonsValue: false,
    toggleEditLessonsValue: false,
    toggleAddArchiveStudentsValue: false,
    toggleEditArchiveStudentsValue: false,
  },
  reducers: {
    toggleAddStudentFunc: (state) => {
      state.toggleAddStudentValue = !state.toggleAddStudentValue;
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
    toggleAddQuestionFunc: (state) => {
      state.toggleAddQuestionValue = !state.toggleAddQuestionValue;
    },
    toggleAddLessonsFunc: (state) => {
      state.toggleAddLessonsValue = !state.toggleAddLessonsValue;
    },
    toggleEditLessonsFunc: (state) => {
      state.toggleEditLessonsValue = !state.toggleEditLessonsValue;
    },
    toggleAddArchiveStudentsFunc: (state) => {
      state.toggleAddArchiveStudentsValue =
        !state.toggleAddArchiveStudentsValue;
    },
    toggleEditArchiveStudentsFunc: (state) => {
      state.toggleEditArchiveStudentsValue =
        !state.toggleEditArchiveStudentsValue;
    },
  },
});

export const {
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
  toggleAddQuestionFunc,
  toggleAddLessonsFunc,
  toggleEditLessonsFunc,
  toggleAddArchiveStudentsFunc,
  toggleEditArchiveStudentsFunc,
} = toggleSlice.actions;
export default toggleSlice.reducer;
