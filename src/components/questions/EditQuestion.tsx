import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

type EditQuestionProps = {
  questionData: IQuestions;
  cancel: () => void;
};

const variants = [
  {
    name: "a",
  },
  {
    name: "b",
  },
  {
    name: "c",
  },
  {
    name: "d",
  },
];

type InputTypeEditQustion = {
  programmingLanguage: string;
  level: string;
  questionText: string;
  aVariant: string;
  bVariant: string;
  cVariant: string;
  dVariant: string;
  rightVariant: "a" | "b" | "c" | "d";
};

async function editQuestion(data: IQuestions) {
  try {
    await customFetch.put(`questions/${data._id}`, data);
    toast.success("Reklama muvaffaqiyatli yaratildi");
  } catch (error) {
    toast.error("Yaratishda xatolikka uchradi");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function EditQuestion({questionData, cancel}: EditQuestionProps) {
  const {control, reset, handleSubmit} = useForm<InputTypeEditQustion>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editQuestion,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["questions"]});
      cancel();
      reset();
    },
  });

  const onSubmit = (data: InputTypeEditQustion) => {
    mutateAsync({
      _id: questionData._id,
      id: questionData.id,
      question: data.questionText,
      language: data.programmingLanguage,
      level: data.level.slice(0, -6),
      a: data.aVariant,
      b: data.bVariant,
      c: data.cVariant,
      d: data.dVariant,
      right: data.rightVariant,
    });
  };
  return (
    <Modal
      title="Savol qo'shish"
      centered
      open={true}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => cancel()}
      confirmLoading={isPending}
      onOk={() => handleSubmit(onSubmit)()}
    >
      <form className="grid gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-lg opacity-70 font-medium">Dasturlash tili:</h5>
            <Controller
              name="programmingLanguage"
              control={control}
              defaultValue={questionData.language}
              key={questionData.language}
              render={({field}) => (
                <Input disabled {...field} className="h-10" size="large" />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Savol darajasi:</h5>
            <Controller
              name="level"
              control={control}
              defaultValue={`${questionData.level} level`}
              key={questionData.level}
              render={({field}) => (
                <Select
                  disabled
                  {...field}
                  className="h-10 w-full"
                  size="large"
                />
              )}
            />
          </div>
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">Savol texti:</h5>
          <Controller
            name="questionText"
            control={control}
            defaultValue={questionData.question}
            key={questionData.question}
            render={({field}) => (
              <TextArea
                {...field}
                showCount
                maxLength={250}
                style={{height: 120, resize: "none"}}
              />
            )}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">A variant texti:</h5>
          <Controller
            name="aVariant"
            control={control}
            defaultValue={questionData.a}
            key={questionData.a}
            render={({field}) => <Input className="h-10" {...field} />}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">B variant texti:</h5>
          <Controller
            name="bVariant"
            control={control}
            defaultValue={questionData.b}
            key={questionData.b}
            render={({field}) => <Input className="h-10" {...field} />}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">C variant texti:</h5>
          <Controller
            name="cVariant"
            control={control}
            defaultValue={questionData.c}
            key={questionData.c}
            render={({field}) => <Input className="h-10" {...field} />}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">D variant texti:</h5>
          <Controller
            name="dVariant"
            control={control}
            defaultValue={questionData.d}
            key={questionData.d}
            render={({field}) => <Input className="h-10" {...field} />}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">
            To&apos;g&apos;ri javob:
          </h5>
          <Controller
            name="rightVariant"
            control={control}
            defaultValue={questionData.right}
            key={questionData.right}
            render={({field}) => (
              <Select
                {...field}
                className="w-full h-10"
                size="large"
                options={variants?.map((variant) => ({
                  value: variant.name,
                  label: variant.name,
                }))}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditQuestion;
