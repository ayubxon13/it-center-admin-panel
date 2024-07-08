import React from "react";
import {Button, ConfigProvider, Space, Table, Tooltip} from "antd";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch} from "react-redux";
import {setSingleStudentData} from "@/lib/features/student/studentSlice";
import ModalPromise from "../antdUI/ModalPromise";
import {singleRegisterStudentsFunc} from "@/lib/features/register-students-slice/registerStudentsSlice";
import {ColumnsType} from "antd/es/table";
import {
  toggleEditStudentFunc,
  toggleEditRegistrationFunc,
} from "@/lib/features/toggle/toggleSlice";

type TDataTable = {
  href: "students" | "register-students" | "archive-students";
  students:
    | (IStudents | IRegisterStudents | ITeacher | IArchiveStudents)[]
    | undefined;
  loading: boolean;
  activeIndex: number;
};

const DataTable: React.FC<TDataTable> = ({
  href,
  loading,
  students,
  activeIndex,
}) => {
  const dispatch = useDispatch();

  type ColumnDefinition = ColumnsType<
    IStudents | IRegisterStudents | IArchiveStudents | ITeacher
  >;

  const filterFunction = (value: any, record: any): any => {
    return record.fullName.toLowerCase().startsWith(value.toLowerCase());
  };

  const studentsTableData: ColumnDefinition = [
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
      filters: students?.map((student) => ({
        text: student.fullName,
        value: student.fullName,
      })),
      filterSearch: true,
      onFilter: filterFunction,
      width: "30%",
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
      title: "O'zlashtirishi",
      dataIndex: "userPercentage",
      key: "userPercentage",
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
              icon={<TrashIcon width={24} height={24} />}
            />
          </ModalPromise>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                dispatch(setSingleStudentData(student));
                dispatch(toggleEditStudentFunc());
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
  ];

  const archiveStudentsTableData: ColumnDefinition = [
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
      filters: students?.map((student) => ({
        text: student.fullName,
        value: student.fullName,
      })),
      filterSearch: true,
      onFilter: filterFunction,
      width: "30%",
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
      render: (student: IArchiveStudents) => (
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
              icon={<TrashIcon width={24} height={24} />}
            />
          </ModalPromise>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                // dispatch(setSingleStudentData(student));
                dispatch(toggleEditStudentFunc());
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
  ];

  const registerStudentsTableData: ColumnDefinition = [
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
      filters: students?.map((student) => ({
        text: student.fullName,
        value: student.fullName,
      })),
      filterSearch: true,
      onFilter: filterFunction,
      width: "30%",
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
              icon={<TrashIcon width={24} height={24} />}
            />
          </ModalPromise>
          <Tooltip title="Edit">
            <Button
              onClick={() => {
                dispatch(singleRegisterStudentsFunc(student));
                dispatch(toggleEditRegistrationFunc());
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
  ];

  const teacherTableData: ColumnDefinition = [
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
      filters: students?.map((student) => ({
        text: student.fullName,
        value: student.fullName,
      })),
      filterSearch: true,
      onFilter: filterFunction,
      width: "30%",
    },
    {
      title: "Shaxsiy raqami",
      dataIndex: "personalPhone",
      key: "personalPhone",
    },
    {
      title: "Guruhi",
      dataIndex: "group",
      key: "group",
    },
  ];

  const showTable = (): ColumnDefinition => {
    if (activeIndex === 4) {
      return registerStudentsTableData;
    } else if (activeIndex === 3) {
      return teacherTableData;
    } else if (activeIndex === 5) {
      return archiveStudentsTableData;
    } else {
      return studentsTableData;
    }
  };

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "",
        },
      }}
    >
      <Table
        bordered
        tableLayout="auto"
        rowKey="id"
        loading={loading}
        columns={showTable()}
        dataSource={students}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default DataTable;
