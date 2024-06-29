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
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import Meta from "antd/es/card/Meta";
import {Card, Empty} from "antd";
import {useQuery} from "@tanstack/react-query";
import {customFetch} from "@/utils/utils";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import AddCategories from "@/components/AddCategories";
import {useState} from "react";
import EditCategories from "@/components/EditCategories";
import {toggleAddCategoryFunc} from "@/lib/features/toggle/toggleSlice";

function Category() {
  const dispatch = useDispatch();
  const {toggleAddCategoryValue} = useSelector(
    (state: RootState) => state.toggleSlice
  );
  const [singleDataCategory, setsingleDataCategory] = useState<ICategory | null>(
    null
  );
  const {data: categories, isPending} = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const ads: {data: ICategory[]} = await customFetch("category");
      return ads.data;
    },
  });

  return (
    <main className="grid gap-y-5">
      <Header
        text="Categories"
        buttonTwo={{
          text: "CATEGORY QO'SHISH",
          click: () => dispatch(toggleAddCategoryFunc()),
        }}
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma category"
          total={categories?.length ?? 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {categories?.map((cat) => (
          <Card
            key={cat._id}
            className="max-w-[300px] w-full"
            cover={
              <img
                className="h-[220px] object-contain"
                alt="ads photo"
                src={cat.image}
              />
            }
            actions={[
              <ModalPromise
                key="category"
                title="course"
                url={`category/${cat._id}`}
              >
                <DeleteOutlined key="delete" />
              </ModalPromise>,
              <EditOutlined
                onClick={() => setsingleDataCategory(cat)}
                key="edit"
              />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              className="flex items-center"
              avatar={<FileTextOutlined />}
              title={cat.language}
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
      {categories?.length == 0 && <Empty />}
      {toggleAddCategoryValue && <AddCategories />}
      {singleDataCategory && (
        <EditCategories
          cancel={() => setsingleDataCategory(null)}
          category={singleDataCategory}
        />
      )}
    </main>
  );
}

export default Category;
