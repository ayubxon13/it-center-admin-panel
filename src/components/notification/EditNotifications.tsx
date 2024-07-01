import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import TextArea from "antd/es/input/TextArea";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

type NotificationsInputType = {
  title: string;
  comment: string;
  image: string;
};

type EditNotType = {
  notificationData: TNotification;
  cancel: () => void;
};

async function editNotifications(data: TNotification) {
  try {
    const req = await customFetch.put(`notification/${data._id}`, data);
    toast.success("Muvaffaqiyatli tahrirlandi");
    return req.data;
  } catch (error) {
    toast.error("Failed to edit register-student");
    throw error;
  } finally {
    toast.dismiss();
  }
}
function EditNotifications({notificationData, cancel}: EditNotType) {
  const {control, handleSubmit, reset} = useForm<NotificationsInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editNotifications,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["notifications"]}).then(() => {
        cancel(), reset();
      });
    },
  });

  const onSubmit = (notData: NotificationsInputType) => {
    mutateAsync({
      _id: notificationData._id,
      id: notificationData.id,
      title: notData.title,
      comment: notData.comment,
      image: notData.image,
    });
  };
  return (
    <Modal
      title="Bildirishnomani tahrirlash"
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
            <h5 className="text-lg opacity-70 font-medium">
              Bildirishnoma nomi:
            </h5>
            <Controller
              name="title"
              control={control}
              defaultValue={notificationData.title}
              key={notificationData.title}
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
              defaultValue={notificationData.image}
              key={notificationData.image}
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
            defaultValue={notificationData.comment}
            key={notificationData.comment}
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
export default EditNotifications;
