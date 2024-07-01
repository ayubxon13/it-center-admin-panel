import {toggleAddCoursesFunc} from "@/lib/features/toggle/toggleSlice";
import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "sonner";

type CourseInputType = {
  image: string;
  levelImage: string;
  language: string;
};

async function addCourses(data: CourseInputType) {
  try {
    await customFetch.post("courses", {
      image: data.image,
      levelImage: data.levelImage,
      language: data.language,
    });
    toast.success("Kurs muvaffaqiyatli yaratildi");
  } catch (error) {
    toast.error("Yaratishda xatolikka uchradi");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddCourse() {
  const {control, handleSubmit, reset} = useForm<CourseInputType>();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addCourses,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["courses"]});
      dispatch(toggleAddCoursesFunc());
    },
  });

  const onSubmit = (courseData: CourseInputType) => {
    const isEmpty = Object.values(courseData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else if (!/\.(jpg|jpeg|png|svg|webp)$/i.test(courseData.image)) {
      return toast.error(
        "Invalid image format. Please provide a URL ending with .jpg, .jpeg, .png, .svg, or .webp"
      );
    } else {
      mutateAsync(courseData).then(() => {
        reset();
      });
    }
  };

  return (
    <Modal
      title="Kurs qo'shish"
      centered
      open={true}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => dispatch(toggleAddCoursesFunc())}
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
            render={({field}) => <Input {...field} size="large" />}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddCourse;
