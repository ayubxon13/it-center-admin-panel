"use client";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import {Card, Empty} from "antd";

import Header from "@/components/ui/Header";
import Score from "@/components/ui/Score";
import {useQuery} from "@tanstack/react-query";
import {customFetch} from "@/utils/utils";
import ModalPromise from "@/components/antdUI/ModalPromise";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import AddAds from "@/components/ads/AddAds";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {toggleAddAdsFunc} from "@/lib/features/toggle/toggleSlice";
import EditAds from "@/components/ads/EditAds";
import {useState} from "react";
const {Meta} = Card;

function Ads() {
  const {toggleAddAdsValue} = useSelector(
    (state: RootState) => state.toggleSlice
  );
  const dispatch = useDispatch();
  const [singleDataAd, setSingleDataAd] = useState<IAds | null>(null); // State to hold the ad being edited
  const {data: ads, isFetching} = useQuery({
    queryKey: ["ads"],
    queryFn: async () => {
      const ads: {data: IAds[]} = await customFetch("ads");
      return ads.data;
    },
  });

  return (
    <main className="grid gap-y-5">
      <Header
        text="Reklamalar"
        buttonTwo={{text: "ADD ADS", click: () => dispatch(toggleAddAdsFunc())}}
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma reklamalar"
          total={ads?.length ?? 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {ads?.map((ad) => (
          <Card
            key={ad._id}
            className="max-w-[300px] w-full"
            cover={
              <img
                className="h-[220px] object-contain"
                alt="ads photo"
                src={ad.image}
              />
            }
            actions={[
              <ModalPromise key="ads" title="ad" url={`ads/${ad._id}`}>
                <DeleteOutlined key="delete" />
              </ModalPromise>,
              <EditOutlined onClick={() => setSingleDataAd(ad)} key="edit" />,
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

        {isFetching &&
          Array.from({length: 4}).map((_, idx) => (
            <Card
              key={idx}
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

      {ads?.length == 0 && <Empty />}
      <AddAds show={toggleAddAdsValue} />
      {singleDataAd && (
        <EditAds cancel={() => setSingleDataAd(null)} ad={singleDataAd} />
      )}
    </main>
  );
}
export default Ads;
