"use client";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {Card, Empty} from "antd";

import Header from "@/components/Header";
import Score from "@/components/Score";
import {useQuery} from "@tanstack/react-query";
import {customFetch} from "@/utils/utils";
import ModalPromise from "@/components/ModalPromise";
import {
  ArchiveBoxArrowDownIcon,
  ArrowTrendingDownIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
const {Meta} = Card;

function Ads() {
  const route = useRouter();
  useEffect(() => {
    const admin = localStorage.getItem("auth");
    if (!admin) {
      route.push("/login");
    }
  }, [route]);

  const {data: ads, isPending} = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const ads: {data: IAds[]} = await customFetch("/ads");
      return ads.data;
    },
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const handleScoreClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <main className="grid gap-y-5">
      <Header buttonTwo={{text: "ADD ADS", click: () => 1}} text="ADS" />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          onClick={() => handleScoreClick(0)}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="All ads"
          total={ads?.length ?? 0}
        />
        <Score
          onClick={() => handleScoreClick(0)}
          icon={<ArrowTrendingDownIcon width={20} height={20} />}
          title="lorem"
          total={131}
        />
        <Score
          onClick={() => handleScoreClick(0)}
          icon={<ArchiveBoxArrowDownIcon width={20} height={20} />}
          title="lorem"
          total={134}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {ads?.map((ad) => (
          <Card
            key={ad._id}
            loading={isPending}
            className="max-w-[300px] w-full"
            cover={<img className="h-[220px]" alt="ads photo" src={ad.image} />}
            actions={[
              <ModalPromise key="ads" title="ad" url={`ads/${ad._id}`}>
                <DeleteOutlined key="delete" />
              </ModalPromise>,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              className="flex items-center"
              avatar={<FileTextOutlined />}
              title={ad.title}
            />
          </Card>
        ))}

        {isPending &&
          Array.from({length: 4}).map((_, idx) => (
            <Card
              key={idx}
              loading={isPending}
              style={{width: 300}}
              actions={[
                <DeleteOutlined key="delete" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            ></Card>
          ))}
      </div>

      {ads?.length == 0 && <Empty />}
    </main>
  );
}
export default Ads;
