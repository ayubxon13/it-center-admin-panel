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
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Meta from "antd/es/card/Meta";
import AddNotifications from "@/components/AddNotifications";
import {toggleAddNotificationsFunc} from "@/lib/features/toggle/toggleSlice";
import EditNotifications from "@/components/EditNotifications";

function Notifications() {
  const {toggleAddNotificationsValue} = useSelector(
    (state: RootState) => state.toggleSlice
  );
  const dispatch = useDispatch();
  const [singleDataNot, setSingleDataNot] = useState<TNotification | null>(
    null
  ); // State to hold the ad being edited

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
        buttonTwo={{
          text: "Bildirishnoma qo'shish",
          click: () => dispatch(toggleAddNotificationsFunc()),
        }}
        text="BIldirishnomalar"
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<BellIcon width={20} height={20} />}
          title="Hamma bildirishnomalar"
          total={notification?.length ?? 0}
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
                className="h-[220px] object-contain"
                alt="notification photo"
                src={not.image}
              />
            }
            actions={[
              <ModalPromise
                key="notification"
                title="notification"
                url={`notification/${not._id}`}
              >
                <DeleteOutlined key="delete" />
              </ModalPromise>,
              <EditOutlined onClick={() => setSingleDataNot(not)} key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<FileTextOutlined />}
              title={not.title}
              description={not.comment}
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
      {toggleAddNotificationsValue && <AddNotifications />}
      {singleDataNot && (
        <EditNotifications
          cancel={() => setSingleDataNot(null)}
          notificationData={singleDataNot}
        />
      )}
    </main>
  );
}

export default Notifications;
