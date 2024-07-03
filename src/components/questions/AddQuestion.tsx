"use client";
import {toggleAddQuestionFunc} from "@/lib/features/toggle/toggleSlice";
import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "sonner";

type AddQuestionProps = {
  show: boolean;
  searchParams: {
    language: string;
    level: string;
  };
};

type InputTypeAddQustion = {
  programmingLanguage: string;
  level: string;
  questionText: string;
  aVariant: string;
  bVariant: string;
  cVariant: string;
  dVariant: string;
  rightVariant: "a" | "b" | "c" | "d";
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

async function addQuestion(data: InputTypeAddQustion) {
  try {
    await customFetch.post("questions", {
      question: data.questionText,
      language: data.programmingLanguage,
      level: data.level.slice(0, -6),
      a: data.aVariant,
      b: data.bVariant,
      c: data.cVariant,
      d: data.dVariant,
      right: data.rightVariant,
    });
    toast.success("Reklama muvaffaqiyatli yaratildi");
  } catch (error) {
    toast.error("Yaratishda xatolikka uchradi");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddQuestion({show, searchParams}: AddQuestionProps) {
  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm<InputTypeAddQustion>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addQuestion,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["questions"]});
      dispatch(toggleAddQuestionFunc());
    },
  });

  const onSubmit = (questionData: InputTypeAddQustion) => {
    const isEmpty = Object.values(questionData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else {
      mutateAsync(questionData).then(() => {
        reset();
      });
    }
  };

  return (
    <Modal
      title="Savol qo'shish"
      centered
      open={show}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => dispatch(toggleAddQuestionFunc())}
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
              defaultValue={searchParams.language}
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
              defaultValue={searchParams.level}
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
            render={({field}) => <Input className="h-10" {...field} />}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">B variant texti:</h5>
          <Controller
            name="bVariant"
            control={control}
            render={({field}) => <Input className="h-10" {...field} />}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">C variant texti:</h5>
          <Controller
            name="cVariant"
            control={control}
            render={({field}) => <Input className="h-10" {...field} />}
          />
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">D variant texti:</h5>
          <Controller
            name="dVariant"
            control={control}
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

export default AddQuestion;
