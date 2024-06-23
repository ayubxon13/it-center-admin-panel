import {customFetch} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";

type EditAdsType = {
  ad: IAds;
  cancel: () => void;
};

type AdsInputType = {
  adsName: string;
  adsImageURL: string;
};

async function editAds(data: IAds) {
  try {
    const req = await customFetch.put(`ads/${data._id}`, data);
    toast.success("Muvaffaqiyatli tahrirlandi");
    return req.data;
  } catch (error) {
    toast.error("Failed to edit register-student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function EditAds({ad, cancel}: EditAdsType) {
  const {control, handleSubmit, reset} = useForm<AdsInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editAds,
    onSuccess() {
      queryClient.invalidateQueries({queryKey: ["ads"]});
      cancel();
    },
  });

  const onSubmit = (adData: AdsInputType) => {
    mutateAsync({
      _id: ad._id,
      id: ad.id,
      image: adData.adsImageURL,
      title: adData.adsName,
    });
  };

  return (
    <Modal
      title="Reklamani tahrirlash"
      centered
      open={true}
      okText="Tahrirlash"
      width={700}
      cancelText="Bekor qilish"
      onCancel={cancel}
      confirmLoading={isPending}
      onOk={() => handleSubmit(onSubmit)()}
    >
      <form
        className="grid grid-cols-2 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <h5 className="text-lg opacity-70 font-medium">Reklama nomi:</h5>
          <Controller
            name="adsName"
            control={control}
            defaultValue={ad.title}
            key={ad.title}
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
            Reklama rasm linki:
          </h5>
          <Controller
            name="adsImageURL"
            control={control}
            defaultValue={ad.image}
            key={ad.image}
            render={({field}) => <Input {...field} size="large" />}
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditAds;
