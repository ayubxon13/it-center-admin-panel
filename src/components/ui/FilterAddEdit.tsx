"use client";
import {useSelector} from "react-redux";
import AddStudents from "@/components/student/AddStudents";
import {RootState} from "@/lib/store";
import EditStudent from "@/components/student/EditStudent";
import AddRegistration from "../registrationStudent/AddRegistrationStudent";
import EditRegistrationStudents from "../registrationStudent/EditRegisterationStudents";
import AddArchiveStudents from "../archiveStudents/AddArchiveStudents";

function FilterAndAddData() {
  const {
    toggleAddStudentValue,
    toggleEditStudentValue,
    toggleRegistrationValue,
    toggleEditRegistrationValue,
    toggleAddArchiveStudentsValue,
  } = useSelector((store: RootState) => store.toggleSlice);
  return (
    <>
      <AddStudents isOpen={toggleAddStudentValue} />
      <EditStudent isOpen={toggleEditStudentValue} />
      <AddRegistration isOpen={toggleRegistrationValue} />
      <EditRegistrationStudents isOpen={toggleEditRegistrationValue} />
      <AddArchiveStudents isOpen={toggleAddArchiveStudentsValue} />
    </>
  );
}
export default FilterAndAddData;
