"use client";
import {toggleAddLessonsFunc} from "@/lib/features/toggle/toggleSlice";
import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal, Select} from "antd";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "sonner";

type AddLessonParams = {
  show: boolean;
  searchParams: {
    image: string;
    language: string;
    level: Level;
  };
};
type LessonInputType = {
  lessonProgrammingLang: string;
  level: Level;
  lessonName: string;
  homework: string;
  lessonVideoLink: string;
};

async function addLesson(data: LessonInputType) {
  try {
    await customFetch.post("lessons", {
      lessonName: data.lessonName,
      languageName: data.lessonProgrammingLang,
      videoLink: data.lessonVideoLink,
      level: data.level,
      homework: data.homework,
    });
  } catch (error) {
    toast.error("Yaratishda xatolikka uchradi");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddLesson({searchParams, show}: AddLessonParams) {
  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm<LessonInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["lessons"]});
      dispatch(toggleAddLessonsFunc());
    },
  });

  const onSubmit = (lessonData: LessonInputType) => {
    console.log(lessonData);

    const isEmpty = Object.values(lessonData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else {
      mutateAsync(lessonData).then(() => {
        reset();
      });
    }
  };

  return (
    <Modal
      title="Vazifa qo'shish"
      centered
      open={show}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => dispatch(toggleAddLessonsFunc())}
      confirmLoading={isPending}
      onOk={() => handleSubmit(onSubmit)()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-lg opacity-70 font-medium">Dasturlash tili:</h5>
            <Controller
              name="lessonProgrammingLang"
              control={control}
              defaultValue={searchParams?.language}
              render={({field}) => (
                <Input {...field} className="h-10" disabled size="large" />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Daraja:</h5>
            <Controller
              name="level"
              control={control}
              defaultValue={searchParams?.level}
              render={({field}) => (
                <Select
                  {...field}
                  disabled
                  className="h-10 w-full"
                  size="large"
                />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Dars nomi:</h5>
            <Controller
              name="lessonName"
              control={control}
              render={({field}) => (
                <Input {...field} className="h-10 w-full" size="large" />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Uyga vazifa:</h5>
            <Controller
              name="homework"
              control={control}
              render={({field}) => (
                <Input {...field} className="h-10 w-full" size="large" />
              )}
            />
          </div>
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">Dars video linki:</h5>
          <Controller
            name="lessonVideoLink"
            control={control}
            render={({field}) => <Input {...field} size="large" />}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddLesson;
