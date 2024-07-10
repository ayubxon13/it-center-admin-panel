import {createSlice} from "@reduxjs/toolkit";

export const archiveStudents = createSlice({
  name: "archive-students",
  initialState: {
    singleData: null as IArchiveStudents | null,
  },
  reducers: {
    setSingleArchiveStudents: (
      state,
      {payload}: {payload: IArchiveStudents | null}
    ) => {
      state.singleData = payload;
    },
  },
});

export const {setSingleArchiveStudents} = archiveStudents.actions;
export default archiveStudents.reducer;
