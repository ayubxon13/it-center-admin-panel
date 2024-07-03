"use client";
import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal, Select} from "antd";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

type EditLessonParams = {
  lessonData: ILessons;
  cancel: () => void;
};

type LessonInputType = {
  lessonProgrammingLang: string;
  level: Level;
  lessonName: string;
  homework: string;
  lessonVideoLink: string;
};

async function editLesson(data: ILessons) {
  try {
    const req = await customFetch.put(`lessons/${data._id}`, data);
    toast.success("Muvaffaqiyatli tahrirlandi");
    return req.data;
  } catch (error) {
    toast.error("Failed to edit register-student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function EditLesson({lessonData, cancel}: EditLessonParams) {
  const {control, reset, handleSubmit} = useForm<LessonInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editLesson,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["lessons"]});
      cancel();
      reset();
    },
  });

  const onSubmit = (data: LessonInputType) => {
    const isEmpty = Object.values(lessonData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else if (
      !/https:\/\/www\.youtube\.com\/embed\/([a-zA-Z0-9_-]{11})\?si=([a-zA-Z0-9_-]+)/.test(
        data.lessonVideoLink
      )
    ) {
      toast.error("Iltimos Youtube link joylang");
    } else {
      mutateAsync({
        _id: lessonData._id,
        id: lessonData.id,
        lessonName: data.lessonName,
        languageName: data.lessonProgrammingLang,
        videoLink: data.lessonVideoLink,
        level: data.level,
        homework: data.homework,
      });
    }
  };

  return (
    <Modal
      title="Vazifani tahrirlash"
      centered
      open={true}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => {
        cancel();
        reset();
      }}
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
              key={lessonData?.languageName}
              defaultValue={lessonData?.languageName}
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
              key={lessonData?.level}
              defaultValue={lessonData?.level}
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
              key={lessonData?.lessonName}
              defaultValue={lessonData?.lessonName}
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
              key={lessonData?.homework}
              defaultValue={lessonData?.homework}
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
            key={lessonData?.videoLink}
            defaultValue={lessonData?.videoLink}
            render={({field}) => <Input {...field} size="large" />}
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditLesson;
