import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

type CategoriesInputType = {
  image: string;
  language: string;
};

type EditCourseType = {
  category: ICategory;
  cancel: () => void;
};

async function editCategories(data: ICategory) {
  try {
    const req = await customFetch.put(`category/${data._id}`, data);
    toast.success("Muvaffaqiyatli tahrirlandi");
    return req.data;
  } catch (error) {
    toast.error("Failed to edit register-student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function EditCategories({category, cancel}: EditCourseType) {
  const {control, handleSubmit, reset} = useForm<CategoriesInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editCategories,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["category"]});
      cancel();
      reset();
    },
  });

  const onSubmit = (categoryData: CategoriesInputType) => {
    mutateAsync({
      _id: category._id,
      id: category.id,
      image: categoryData.image,
      language: categoryData.language,
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
              defaultValue={category.language}
              key={category.language}
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
              defaultValue={category.image}
              key={category.image}
              render={({field}) => <Input {...field} size="large" />}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default EditCategories;
