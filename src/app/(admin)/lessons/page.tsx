"use client";
import {FileTextOutlined, EyeOutlined} from "@ant-design/icons";
import Header from "@/components/ui/Header";
import Score from "@/components/ui/Score";
import {customFetch} from "@/utils/utils";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import {useQuery} from "@tanstack/react-query";
import {Button, Card, Dropdown, Empty} from "antd";
import Meta from "antd/es/card/Meta";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

function Lessons() {
  const router = useRouter();
  const {data: courses, isFetching} = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const courses: {data: ICategory[]} = await customFetch("courses");
      return courses.data;
    },
  });
  const [select, setSelect] = useState({
    key: "VAZIFA QO'SHISH",
    lebel: "VAZIFA QO'SHISH",
    url: "/",
  });
  const onMenuClick = (e: any) => {
    setSelect(e);
  };

  const items = [
    {
      key: "FREE",
      label: "FREE",
    },
    {
      key: "BEGIN",
      label: "BEGIN",
    },
    {
      key: "MEDIUM",
      label: "MEDIUM",
    },
    {
      key: "ADVANCED",
      label: "ADVANCED",
    },
  ];
  return (
    <main className="grid gap-y-5">
      <Header text="Uyga vazifalar" />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma darslar"
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
                alt=""
                className="h-[220px] object-contain"
                src={course.image}
              />
            }
            actions={[
              <Dropdown.Button
                key={course._id}
                onClick={() =>
                  select.url === "/"
                    ? toast.warning("Vazifa qo'shish uchun darajani tanlang")
                    : router.push(
                        `/lessons/${course._id}?language=${
                          course.language
                        }&level=${select.key.toLowerCase()}`
                      )
                }
                className="w-full flex justify-center"
                menu={{items, onClick: onMenuClick}}
              >
                {select.key}
              </Dropdown.Button>,
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
          Array.from({length: 4}).map((_, idx) => (
            <Card
              key={idx}
              loading={isFetching}
              style={{width: 300}}
              actions={[
                <Button
                  key={idx}
                  disabled
                  type="primary"
                  icon={<EyeOutlined />}
                >
                  VAZIFA QO&apos;ISH
                </Button>,
              ]}
            ></Card>
          ))}
      </div>
      {courses?.length === 0 && <Empty />}
    </main>
  );
}
export default Lessons;
