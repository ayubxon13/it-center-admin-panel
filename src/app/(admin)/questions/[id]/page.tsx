"use client";
import Header from "@/components/ui/Header";
import Score from "@/components/ui/Score";
import {customFetch} from "@/utils/utils";
import {ClipboardDocumentCheckIcon} from "@heroicons/react/24/outline";
import {useQuery} from "@tanstack/react-query";
import {Card, Empty, Skeleton} from "antd";
import {useState} from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import ModalPromise from "@/components/antdUI/ModalPromise";
import {useDispatch, useSelector} from "react-redux";
import {toggleAddQuestionFunc} from "@/lib/features/toggle/toggleSlice";
import {RootState} from "@/lib/store";
import AddQuestion from "@/components/questions/AddQuestion";
import EditQuestion from "@/components/questions/EditQuestion";

type QuestionsSingleParams = {
  // params: {
  //   id: string;
  // };
  searchParams: {
    language: string;
    level: string;
  };
};

function QuestionsSingle({searchParams}: QuestionsSingleParams) {
  const [editQuestionData, setEditQuestionData] = useState<IQuestions | null>(
    null
  );
  const dispatch = useDispatch();
  const {toggleAddQuestionValue} = useSelector(
    (state: RootState) => state.toggleSlice
  );
  const [questions, setQuestions] = useState<IQuestions[] | null>(null);
  const {isPending} = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const questions: {data: IQuestions[]} = await customFetch("questions");
      setQuestions(
        questions.data.filter(
          (ques) =>
            ques.language === searchParams.language &&
            ques.level === searchParams.level.slice(0, -6)
        )
      );
    },
  });
  return (
    <main className="grid gap-y-5">
      <Header
        text={`Savollar`}
        buttonTwo={{
          text: "SAVOL QO'SHISH",
          click: () => dispatch(toggleAddQuestionFunc()),
        }}
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma savollar"
          total={questions?.length ?? 0}
        />
      </div>
      <div className="grid gap-3 grid-cols-5 max-[1722px]:grid-cols-4 max-[1427px]:grid-cols-3 max-[1180px]:grid-cols-2">
        {questions?.map((ques) => (
          <>
            <Card
              title={ques.question}
              actions={[
                <ModalPromise
                  key="questions"
                  title="question"
                  url={`questions/${ques._id}`}
                >
                  <DeleteOutlined key="delete" />
                </ModalPromise>,
                <EditOutlined
                  onClick={() => setEditQuestionData(ques)}
                  key="edit"
                />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <p>{`a) ${ques.a}`}</p>
              <p>{`b) ${ques.b}`}</p>
              <p>{`c) ${ques.c}`}</p>
              <p>{`d) ${ques.d}`}</p>
              <p>{`To'gri javob: ${ques.right}`}</p>
            </Card>
          </>
        ))}
        {isPending &&
          Array.from({length: 4}).map((_, idx) => (
            <Card
              key={idx}
              actions={[
                <DeleteOutlined key="delete" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Skeleton />
            </Card>
          ))}
      </div>
      <AddQuestion searchParams={searchParams} show={toggleAddQuestionValue} />
      {editQuestionData && (
        <EditQuestion
          cancel={() => setEditQuestionData(null)}
          questionData={editQuestionData}
        />
      )}
      {questions?.length === 0 && <Empty />}
    </main>
  );
}

export default QuestionsSingle;
