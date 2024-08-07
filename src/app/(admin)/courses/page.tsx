"use client";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Header from "@/components/ui/Header";
import ModalPromise from "@/components/antdUI/ModalPromise";
import Score from "@/components/ui/Score";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import Meta from "antd/es/card/Meta";
import {Card, Empty} from "antd";
import {useQuery} from "@tanstack/react-query";
import {customFetch} from "@/utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {useState} from "react";
import {toggleAddCoursesFunc} from "@/lib/features/toggle/toggleSlice";
import {nanoid} from "@reduxjs/toolkit";
import AddCourse from "@/components/course/AddCourse";
import EditCourse from "@/components/course/EditCourse";

function Courses() {
  const dispatch = useDispatch();
  const {toggleAddCoursesValue} = useSelector(
    (state: RootState) => state.toggleSlice
  );
  const [singleDataCourse, setSingleDataCourse] = useState<ICourses | null>(
    null
  );
  const {data: courses, isFetching} = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const courses: {data: ICourses[]} = await customFetch("courses");
      return courses.data;
    },
  });

  return (
    <main className="grid gap-y-5">
      <Header
        text="Kurslar"
        buttonTwo={{
          text: "KURS QO'SHISH",
          click: () => dispatch(toggleAddCoursesFunc()),
        }}
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma kurslar"
          total={courses?.length ?? 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {courses?.map((course) => (
          <Card
            key={course._id}
            className="max-w-[300px] w-full"
            cover={
              <img
                className="h-[220px] object-contain"
                alt="ads photo"
                src={course.image}
              />
            }
            actions={[
              <ModalPromise
                key="courses"
                title="course"
                url={`courses/${course._id}`}
              >
                <DeleteOutlined key="delete" />
              </ModalPromise>,
              <EditOutlined
                onClick={() => setSingleDataCourse(course)}
                key="edit"
              />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              className="flex items-center"
              avatar={<FileTextOutlined />}
              title={course.language}
            />
          </Card>
        ))}

        {isFetching &&
          Array.from({length: 4}).map(() => (
            <Card
              key={nanoid()}
              loading={isFetching}
              style={{width: 300}}
              actions={[
                <DeleteOutlined key="delete" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            ></Card>
          ))}
      </div>
      {courses?.length == 0 && <Empty />}
      {toggleAddCoursesValue && <AddCourse />}
      {singleDataCourse && (
        <EditCourse
          cancel={() => setSingleDataCourse(null)}
          course={singleDataCourse}
        />
      )}
    </main>
  );
}

export default Courses;
