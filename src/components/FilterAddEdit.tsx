"use client"
import { useSelector } from "react-redux"
import AddData from "./AddStudents"
import { FilterStudent } from "./FilterStudent"
import { RootState } from "@/lib/store"
import EditStudent from "./EditStudent"
import AddRegistration from "./AddRegistrationStudent"
import EditRegistrationStudents from "./EditRegisterationStudents"

function FilterAndAddData() {
  const {
    toggleAddStudentValue,
    toggleFilterValue,
    toggleEditStudentValue,
    toggleRegistrationValue,
  } = useSelector((store: RootState) => store.toggleSlice)
  return (
    <>
      {toggleFilterValue && <FilterStudent />}
      <AddData isOpen={toggleAddStudentValue} />
      <EditStudent isOpen={toggleEditStudentValue} />
      <AddRegistration isOpen={toggleRegistrationValue} />
      <EditRegistrationStudents isOpen={toggleRegistrationValue} />
    </>
  )
}
export default FilterAndAddData
