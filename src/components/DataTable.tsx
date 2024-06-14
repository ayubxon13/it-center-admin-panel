import { Button, ConfigProvider, Space, Table, Tooltip } from "antd"
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { toggleEditStudentFunc, toggleRegistrationFunc } from "@/lib/features/toggle/toggleSlice"
import { useDispatch } from "react-redux"
import { setSingleStudentData } from "@/lib/features/student/studentSlice"
import ModalPromise from "./ModalPromise"
import { singleRegisterStudentsFunc } from "@/lib/features/register-students-slice/registerStudentsSlice"
type TDataTable = {
  href: "students" | "register-students"
  students: (IStudents | IRegisterStudents)[] | undefined
  loading: boolean
  activeIndex: number
}

function DataTable({ href, loading, students, activeIndex }: TDataTable) {
  const dispatch = useDispatch()

  const studentsTableData = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "w-[65px]",
    },
    {
      title: "Ism Familya",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Manzil",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tug'ilgan kun",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Guruh",
      dataIndex: "group",
      key: "group",
    },
    {
      title: "Shaxsiy raqami",
      dataIndex: "personalPhone",
      key: "personalPhone",
    },
    {
      title: "Tahrirlash",
      className: "w-[120px]",
      key: "options",
      render: (student: IStudents) => (
        <Space size="small">
          <ModalPromise
            key={href}
            title="student"
            url={`${href}/${student._id}`}
          >
            <Button
              type="primary"
              size="large"
              shape="default"
              danger
              icon={<XMarkIcon width={24} height={24} />}
            />
          </ModalPromise>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                dispatch(setSingleStudentData(student))
                dispatch(toggleEditStudentFunc())
              }}
              size="large"
              type="primary"
              shape="default"
              icon={<PencilSquareIcon width={24} height={24} />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]
  const registerStudentsTableData = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      className: "w-[65px]",
    },
    {
      title: "Ism Familya",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Shaxsiy raqami",
      dataIndex: "personalPhone",
      key: "personalPhone",
    },
    {
      title: "Tahrirlash",
      key: "options",
      className: "w-[120px]",
      render: (student: IRegisterStudents) => (
        <Space size="small">
          <ModalPromise
            key={href}
            title="student"
            url={`${href}/${student._id}`}
          >
            <Button
              type="primary"
              size="large"
              shape="default"
              danger
              icon={<XMarkIcon width={24} height={24} />}
            />
          </ModalPromise>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                dispatch(singleRegisterStudentsFunc(student))
                dispatch(toggleRegistrationFunc())
              }}  
              size="large"
              type="primary"
              shape="default"
              icon={<PencilSquareIcon width={24} height={24} />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ]
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "",
        },
      }}
    >
      <Table
        // scroll={{ y: `calc(80vh - 250px)` }}
        bordered
        tableLayout="auto"
        rowKey="id"
        loading={loading}
        columns={activeIndex === 4 ? registerStudentsTableData : studentsTableData}
        dataSource={students}
      />
    </ConfigProvider>
  )
}
export default DataTable
