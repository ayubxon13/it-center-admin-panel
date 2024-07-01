"use client";
import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

type CourseInputType = {
  image: string;
  levelImage: string;
  language: string;
};

type EditCourseType = {
  course: ICourses;
  cancel: () => void;
};

async function editCourse(data: ICourses) {
  try {
    const req = await customFetch.put(`courses/${data._id}`, data);
    toast.success("Muvaffaqiyatli tahrirlandi");
    return req.data;
  } catch (error) {
    toast.error("Failed to edit register-student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function EditCourse({course, cancel}: EditCourseType) {
  const {control, handleSubmit, reset} = useForm<CourseInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editCourse,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["courses"]});
      cancel();
      reset();
    },
  });

  const onSubmit = (courseData: CourseInputType) => {
    mutateAsync({
      _id: course._id,
      id: course.id,
      language: courseData.language,
      image: courseData.image,
      levelImage: courseData.levelImage,
    });
  };

  return (
    <Modal
      title="Kursni tahrirlash"
      centered
      open={true}
      okText="Tahrirlash"
      width={700}
      cancelText="Bekor qilish"
      onCancel={cancel}
      confirmLoading={isPending}
      onOk={() => handleSubmit(onSubmit)()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-lg opacity-70 font-medium">Kurs nomi:</h5>
            <Controller
              name="language"
              control={control}
              defaultValue={course.language}
              key={course.language}
              render={({field}) => (
                <Input
                  {...field}
                  className="h-10"
                  size="large"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const capitalizedValue =
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1);
                    field.onChange({
                      ...e,
                      target: {
                        ...e.target,
                        value: capitalizedValue,
                      },
                    });
                  }}
                />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Kurs rasm linki:</h5>
            <Controller
              name="image"
              control={control}
              defaultValue={course.image}
              key={course.image}
              render={({field}) => <Input {...field} size="large" />}
            />
          </div>
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">
            Kurs qo&apos;shimcha rasm linki:
          </h5>
          <Controller
            name="levelImage"
            control={control}
            defaultValue={course.levelImage}
            key={course.levelImage}
            render={({field}) => <Input {...field} size="large" />}
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditCourse;
