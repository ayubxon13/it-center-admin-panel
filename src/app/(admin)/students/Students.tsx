"use client"
import DataTable from "@/components/DataTable"
import FilterAndAddData from "@/components/FilterAddEdit"
import Header from "@/components/Header"
import Score from "@/components/Score"
import {
  toggleAddStudentFunc,
  toggleRegistrationFunc,
} from "@/lib/features/toggle/toggleSlice"
import {customFetch} from "@/utils/utils"
import {
  ArchiveBoxArrowDownIcon,
  ArrowTrendingDownIcon,
  ClipboardDocumentCheckIcon,
  FunnelIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline"
import {useQuery} from "@tanstack/react-query"
import {useRouter} from "next/navigation"
import {useEffect, useState} from "react"
import {useDispatch} from "react-redux"
function Students() {
  const dispatch = useDispatch()
  const route = useRouter()
  useEffect(() => {
    const admin = localStorage.getItem("auth")
    if (!admin) {
      route.push("/login")
    }
  }, [route])

  const {data, isPending} = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const students: {data: IStudents[]} = await customFetch("/students")
      return students.data
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  })

  const graduatedLength =
    data?.filter((item) => item.graduated === true).length ?? 0

  const noGraduatedLength =
    data?.filter((item) => item.graduated == false).length ?? 0

  const [activeIndex, setActiveIndex] = useState(0)
  const handleScoreClick = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <main className="grid gap-y-5">
      <Header
        buttonOne={{
          text: "QIDIRUV",
          icon: <FunnelIcon width={21} height={21} />,
        }}
        buttonTwo={{
          text: "QO'SHISH",
          click: () => dispatch(toggleAddStudentFunc()),
        }}
        buttonThree={{
          text: "RO'YXATGA OLISH",
          click: () => dispatch(toggleRegistrationFunc()),
        }}
        text="Students"
      />
      <div className="grid grid-cols-4 max-[1900px]:grid-cols-3 gap-5 mb-5">
        <Score
          onClick={() => handleScoreClick(0)}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Jami o'quvchilar"
          total={data?.length ?? 0}
          active={activeIndex === 0}
        />
        <Score
          active={activeIndex === 1}
          onClick={() => handleScoreClick(1)}
          icon={<ArrowTrendingDownIcon width={20} height={20} />}
          title="Hozir o'qiyotganlar"
          total={noGraduatedLength}
        />
        <Score
          active={activeIndex === 2}
          onClick={() => handleScoreClick(2)}
          icon={<ArchiveBoxArrowDownIcon width={20} height={20} />}
          title="Bitirganlar"
          total={graduatedLength}
        />
        <Score
          active={activeIndex === 3}
          onClick={() => handleScoreClick(3)}
          icon={<UserGroupIcon width={20} height={20} />}
          title="Ustozlar"
          total={4}
        />
        <Score
          active={activeIndex === 4}
          onClick={() => handleScoreClick(4)}
          icon={<UserGroupIcon width={20} height={20} />}
          title="Ro'yxatga olish"
          total={4}
        />
      </div>
      <FilterAndAddData />
      <DataTable loading={isPending} students={data ?? []} />
    </main>
  )
}
export default Students
