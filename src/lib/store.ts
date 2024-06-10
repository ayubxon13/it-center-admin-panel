import {configureStore} from "@reduxjs/toolkit"
import toggleSlice from "./features/toggle/toggleSlice"
import studentSlice from "./features/student/studentSlice"
export const store = () => {
  return configureStore({
    reducer: {toggleSlice, studentSlice},
  })
}

export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
