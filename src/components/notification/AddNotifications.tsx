import {toggleAddNotificationsFunc} from "@/lib/features/toggle/toggleSlice";
import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "sonner";

type NotificationsInputType = {
  title: string;
  comment: string;
  image: string;
};

async function addNotifications(data: NotificationsInputType) {
  try {
    await customFetch.post("notification", {
      title: data.title,
      comment: data.comment,
      image: data.image,
    });
    toast.success("Bildirishnoma muvaffaqiyatli yaratildi");
  } catch (error) {
    toast.error("Yaratishda xatolikka uchradi");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddNotifications() {
  const {control, handleSubmit, reset} = useForm<NotificationsInputType>();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["notifications"]});
      dispatch(toggleAddNotificationsFunc());
    },
  });

  const onSubmit = (notData: NotificationsInputType) => {
    const isEmpty = Object.values(notData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else if (!/\.(jpg|jpeg|png|svg|webp)$/i.test(notData.image)) {
      return toast.error(
        "Invalid image format. Please provide a URL ending with .jpg, .jpeg, .png, .svg, or .webp"
      );
    } else {
      mutateAsync(notData).then(() => {
        reset();
      });
    }
  };
  return (
    <Modal
      title="Bildirishnoma qo'shish"
      centered
      open={true}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => dispatch(toggleAddNotificationsFunc())}
      confirmLoading={isPending}
      onOk={() => handleSubmit(onSubmit)()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-lg opacity-70 font-medium">
              Bildirishnoma nomi:
            </h5>
            <Controller
              name="title"
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
            <h5 className="text-lg opacity-70 font-medium">
              Bildirishnoma rasm linki:
            </h5>
            <Controller
              name="image"
              control={control}
              render={({field}) => <Input {...field} size="large" />}
            />
          </div>
        </div>
        <div className="w-full mb-8">
          <h5 className="text-lg opacity-70 font-medium mt-3">
            Bildirishnoma commenti
          </h5>
          <Controller
            name="comment"
            control={control}
            render={({field}) => (
              <TextArea
                {...field}
                className="w-full"
                size="large"
                showCount
                maxLength={100}
                placeholder="Hajmini o'zgartirishingiz mumkin"
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddNotifications;
