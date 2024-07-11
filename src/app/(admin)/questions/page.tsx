"use client";
import Header from "@/components/ui/Header";
import {FileTextOutlined, EyeOutlined} from "@ant-design/icons";
import Score from "@/components/ui/Score";
import {customFetch} from "@/utils/utils";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import {useQuery} from "@tanstack/react-query";
import {Button, Card, Dropdown} from "antd";
import Meta from "antd/es/card/Meta";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {toast} from "sonner";

function Qustions() {
  const router = useRouter();
  const [select, setSelect] = useState({
    key: "SAVOL QO'SHISH",
    label: "SAVOL QO'SHISH",
    url: "/",
  });

  const {data: categories, isFetching} = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const category: {data: ICategory[]} = await customFetch("category");
      return category.data;
    },
  });
  const items = [
    {
      key: "1 LEVEL",
      label: "1 LEVEL",
    },
    {
      key: "2 LEVEL",
      label: "2 LEVEL",
    },
    {
      key: "3 LEVEL",
      label: "3 LEVEL",
    },
    {
      key: "4 LEVEL",
      label: "4 LEVEL",
    },
    {
      key: "5 LEVEL",
      label: "5 LEVEL",
    },
    {
      key: "6 LEVEL",
      label: "6 LEVEL",
    },
    {
      key: "7 LEVEL",
      label: "7 LEVEL",
    },
    {
      key: "8 LEVEL",
      label: "8 LEVEL",
    },
    {
      key: "9 LEVEL",
      label: "9 LEVEL",
    },
    {
      key: "10 LEVEL",
      label: "10 LEVEL",
    },
  ];
  const onMenuClick = (e: any) => {
    setSelect(e);
  };

  return (
    <main className="grid gap-y-5">
      <Header text="Savollar" />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma savollar"
          total={[]?.length ?? 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {categories?.map((cat) => (
          <Card
            key={cat._id}
            className="max-w-[300px] w-full"
            cover={
              <img
                alt=""
                className="h-[220px] object-contain"
                src={cat.image}
              />
            }
            actions={[
              <Dropdown.Button
                key={cat._id}
                onClick={() =>
                  select.url === "/"
                    ? toast.warning("Savol qo'shish uchun darajani tanlang")
                    : router.push(
                        `/questions/${cat._id}?language=${
                          cat.language
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
              title={cat.language}
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
                  SAVOL QO&apos;SHISH
                </Button>,
              ]}
            ></Card>
          ))}
      </div>
    </main>
  );
}

export default Qustions;
