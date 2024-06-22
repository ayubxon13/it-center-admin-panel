"use client";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import Header from "@/components/Header";
import ModalPromise from "@/components/ModalPromise";
import Score from "@/components/Score";
import {RootState} from "@/lib/store";
import {customFetch} from "@/utils/utils";
import {BellIcon} from "@heroicons/react/24/outline";
import {useQuery} from "@tanstack/react-query";
import {Card, Empty} from "antd";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Meta from "antd/es/card/Meta";

function Notifications() {
  const {toggleAddNotifications} = useSelector(
    (state: RootState) => state.toggleSlice
  );
  const dispatch = useDispatch();
  const route = useRouter();
  const [singleDataAd, setSingleDataAd] = useState<TNotification | null>(null); // State to hold the ad being edited
  useEffect(() => {
    const admin = localStorage.getItem("auth");
    if (!admin) {
      route.push("/login");
    }
  }, [route]);

  const {data: notification, isPending} = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const notifications: {data: TNotification[]} = await customFetch(
        "notification"
      );
      return notifications.data;
    },
  });
  return (
    <main className="grid gap-y-5">
      <Header
        buttonTwo={{text: "Bildirishnoma qo'shish", click: () => 1}}
        text="ADS"
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<BellIcon width={20} height={20} />}
          title="All ads"
          total={[]?.length ?? 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {notification?.map((not) => (
          <Card
            key={not._id}
            loading={isPending}
            className="max-w-[300px] w-full"
            cover={
              <img
                className="h-[220px] object-cover"
                alt="ads photo"
                src={not.image}
              />
            }
            actions={[
              <ModalPromise
                key="ads"
                title="ad"
                url={`notification/${not._id}`}
              >
                <DeleteOutlined key="delete" />
              </ModalPromise>,
              <EditOutlined onClick={() => 1} key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              className="flex items-center"
              avatar={<FileTextOutlined />}
              title={not.title}
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

      {notification?.length == 0 && <Empty />}
      {/* {toggleAddAdsValue && <AddAds />}
      {singleDataAd && (
        <EditAds cancel={() => setSingleDataAd(null)} ad={singleDataAd} />
      )} */}
    </main>
  );
}

export default Notifications;
