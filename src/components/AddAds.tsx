import {toggleAddAdsFunc} from "@/lib/features/toggle/toggleSlice";
import {customFetch, formatPhoneNumber} from "@/utils/utils";
import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "sonner";

type AdsInputType = {
  adsName: string;
  adsImageURL: string;
};

async function addAds(data: AdsInputType) {
  try {
    await customFetch.post("ads", {
      image: data.adsImageURL,
      title: data.adsName,
    });
    toast.success("Reklama muvaffaqiyatli yaratildi");
  } catch (error) {
    toast.error("Yaratishda xatolikka uchradi");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddAds() {
  const {control, handleSubmit, reset} = useForm<AdsInputType>();

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addAds,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["ads"]});
      dispatch(toggleAddAdsFunc());
    },
  });

  const onSubmit = (adsData: AdsInputType) => {
    const isEmpty = Object.values(adsData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else {
      mutateAsync(adsData).then(() => {
        reset();
      });
    }
  };

  return (
    <Modal
      title="Reklama qo'shish"
      centered
      open={true}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => dispatch(toggleAddAdsFunc())}
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
            render={({field}) => <Input {...field} size="large" />}
          />
        </div>
      </form>
    </Modal>
  );
}

export default AddAds;
