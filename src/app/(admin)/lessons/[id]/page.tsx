"use client";
import Header from "@/components/Header";
import Score from "@/components/Score";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {useQuery} from "@tanstack/react-query";
import {customFetch} from "@/utils/utils";
import {useState} from "react";
import ModalPromise from "@/components/ModalPromise";

type LessonsSinglePageProps = {
  // params: {
  //   id: string;
  // };
  searchParams: {
    image: string;
    language: string;
    level: Level;
  };
};

function LessonsSinglePage({searchParams}: LessonsSinglePageProps) {
  const [lessons, setLessons] = useState<ILessons[] | null>(null);
  const {isPending} = useQuery({
    queryKey: ["lessons"],
    queryFn: async () => {
      const lessons: {data: ILessons[]} = await customFetch("lessons");
      setLessons(
        lessons.data?.filter(
          (less) =>
            less.level === searchParams.level &&
            less.languageName === searchParams.language
        )
      );
      return lessons.data;
    },
  });

  return (
    <main className="grid gap-y-5">
      <Header
        text="Uyga vazifalar"
        buttonTwo={{
          text: "VAZIFA QO'SHISH",
          click: () => 1,
        }}
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma vazifalar"
          total={lessons?.length ?? 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {lessons?.map((lesson, idx) => {
          const newIndex = idx + 1;
          return (
            <Card
              key={lesson._id}
              className="max-w-[300px] w-full"
              cover={
                <iframe
                  className="rounded-t-md"
                  height="335"
                  src="https://www.youtube.com/embed/XMRqRvcb6hM?si=F0_zyw50ij_sP5T-"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              }
              actions={[
                <ModalPromise
                  key="lessons"
                  title="lesson"
                  url={`lessons/${lesson._id}`}
                >
                  <DeleteOutlined key="delete" />
                </ModalPromise>,
                <EditOutlined onClick={() => 1} key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<InfoCircleOutlined />}
                title={`${newIndex}. ${lesson.homework}`}
                description="dew"
              />
            </Card>
          );
        })}

        {/* {isPending &&
          Array.from({length: 4}).map((_, idx) => (
            <Card
              key={idx}
              loading={isPending}
              style={{width: 300}}
              actions={[
                <Button disabled type="primary" icon={<EyeOutlined />}>
                  VAZIFALARINI KO&apos;RISH
                </Button>,
              ]}
            ></Card>
          ))} */}
      </div>
    </main>
  );
}

export default LessonsSinglePage;
