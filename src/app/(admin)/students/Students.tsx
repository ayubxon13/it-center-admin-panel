"use client";
import DataTable from "@/components/ui/DataTable";
import FilterAndAddData from "@/components/ui/FilterAddEdit";
import Header from "@/components/ui/Header";
import Score from "@/components/ui/Score";
import {
  toggleAddArchiveStudentsFunc,
  toggleAddStudentFunc,
  toggleRegistrationFunc,
} from "@/lib/features/toggle/toggleSlice";
import {customFetch, teacherData} from "@/utils/utils";
import {
  ArchiveBoxArrowDownIcon,
  ArrowTrendingDownIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
function Students() {
  const [allStudentsData, setAllStudentsData] = useState<
    IStudents[] | undefined
  >(undefined);
  const [registerStudentsData, setRegisterStudentsData] = useState<
    IRegisterStudents[] | undefined
  >(undefined);
  const [noGraduateData, setNoGraduateData] = useState<IStudents[] | undefined>(
    undefined
  );
  const [graduateData, setGraduateData] = useState<IStudents[] | undefined>(
    undefined
  );

  const [archiveStudents, setArchiveStudents] = useState<
    IArchiveStudents[] | undefined
  >(undefined);

  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const [href, setHref] = useState<
    "students" | "archive-students" | "register-students"
  >("students");
  const {data, isPending} = useQuery({
    queryKey: ["students", href],
    queryFn: async () => {
      const students: {
        data: IStudents[] & IRegisterStudents[] & IArchiveStudents[];
      } = await customFetch(href);
      return students.data;
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (href === "students") {
      setNoGraduateData(data?.filter((data) => data.graduated === false));
    }
    if (href === "students") {
      setGraduateData(data?.filter((data) => data.graduated === true));
    }
    if (href === "students") {
      setAllStudentsData(data);
    }
    if (href === "register-students") {
      setRegisterStudentsData(data);
    }
    if (href === "archive-students") {
      setArchiveStudents(data);
    }
  }, [href, data]);

  const handleScoreClick = (index: number) => {
    setActiveIndex(index);
    if (index === 4) {
      setHref("register-students");
    } else if (index === 5) {
      setHref("archive-students");
    } else {
      setHref("students");
    }
  };

  return (
    <main className="grid gap-y-5">
      <Header
        buttonTwo={{
          text: "O'QUVCHI QO'SHISH",
          click: () => dispatch(toggleAddStudentFunc()),
        }}
        buttonOne={{
          text: "O'QUVCHINI ARXIXLASH",
          click: () => dispatch(toggleAddArchiveStudentsFunc()),
        }}
        buttonThree={{
          text: "RO'YXATGA OLISH",
          click: () => dispatch(toggleRegistrationFunc()),
        }}
        text="O'quvchilar"
      />
      <div className="grid grid-cols-4 max-[1900px]:grid-cols-3 gap-5 mb-5">
        <Score
          onClick={() => handleScoreClick(0)}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Jami o'quvchilar"
          total={allStudentsData?.length ?? 0}
          active={activeIndex === 0}
        />
        <Score
          active={activeIndex === 1}
          onClick={() => handleScoreClick(1)}
          icon={<ArrowTrendingDownIcon width={20} height={20} />}
          title="Hozir o'qiyotganlar"
          total={noGraduateData?.length ?? 0}
        />
        <Score
          active={activeIndex === 2}
          onClick={() => handleScoreClick(2)}
          icon={<ArchiveBoxArrowDownIcon width={20} height={20} />}
          title="Bitirganlar"
          total={graduateData?.length ?? 0}
        />
        <Score
          active={activeIndex === 3}
          onClick={() => handleScoreClick(3)}
          icon={<UserGroupIcon width={20} height={20} />}
          title="Ustozlar"
          total={teacherData.length}
        />
        <Score
          active={activeIndex === 4}
          onClick={() => handleScoreClick(4)}
          icon={<UserGroupIcon width={20} height={20} />}
          title="Ro'yxatga olinganlar"
          total={registerStudentsData?.length ?? 0}
        />{" "}
        <Score
          active={activeIndex === 5}
          onClick={() => handleScoreClick(5)}
          icon={<UserGroupIcon width={20} height={20} />}
          title="Arxivlangan o'quvchilar"
          total={archiveStudents?.length ?? 0}
        />
      </div>
      <FilterAndAddData />
      {[0, 4].includes(activeIndex) && (
        <DataTable
          activeIndex={activeIndex}
          href={href}
          loading={isPending}
          students={data ?? []}
        />
      )}
      {activeIndex === 1 && (
        <DataTable
          activeIndex={activeIndex}
          href={href}
          loading={isPending}
          students={noGraduateData ?? []}
        />
      )}
      {activeIndex === 2 && (
        <DataTable
          activeIndex={activeIndex}
          href={href}
          loading={isPending}
          students={graduateData ?? []}
        />
      )}
      {activeIndex === 3 && (
        <DataTable
          activeIndex={activeIndex}
          href={href}
          loading={isPending}
          students={teacherData ?? []}
        />
      )}
      {activeIndex === 5 && (
        <DataTable
          activeIndex={activeIndex}
          href={href}
          loading={isPending}
          students={archiveStudents ?? []}
        />
      )}
    </main>
  );
}
export default Students;
