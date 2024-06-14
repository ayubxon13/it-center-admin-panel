import { createSlice } from "@reduxjs/toolkit";

export const studentSlice = createSlice({
    name: "register-students",
    initialState: {
        singleRegisterStudents: null as null | IRegisterStudents,
    },
    reducers: {
        singleRegisterStudentsFunc: (state, { payload }: { payload: IRegisterStudents }) => {
            state.singleRegisterStudents = payload
        }
    }
})

export const { singleRegisterStudentsFunc } = studentSlice.actions
export default studentSlice.reducer