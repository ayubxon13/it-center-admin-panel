import {toggleEditArchiveStudentsFunc} from "@/lib/features/toggle/toggleSlice";
import {DatePicker, Input, Modal, Select, Space} from "antd";
import {Controller, useForm} from "react-hook-form";
import SelectUI from "../antdUI/SelectUI";
import {
  customFetch,
  filterOptionSelect,
  formatPhoneNumber,
  neighborhood,
  onChangeSelect,
  onSearchSelect,
} from "@/utils/utils";
import useGetCategories from "@/hooks/useGetCategories";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import dayjs from "dayjs";

type ArchiveInputType = {
  fullName: string;
  birthday: any;
  address: string;
  group: string;
  personalPhone: string;
};

async function editArchiveStudents(data: ArchiveInputType & {_id: string}) {
  try {
    const res = await customFetch.put(`archive-students/${data._id}`, {
      fullName: data.fullName,
      birthday: data.birthday,
      address: data.address,
      group: data.group,
      personalPhone: `+998 ${data.personalPhone}`,
    });
    toast.success("Muvaffaqiyatli tahrirlandi");
    return res.data;
  } catch (error) {
    toast.error("Failed to edit register-student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function EditArchiveStudent({isOpen}: {isOpen: boolean}) {
  const {groups, isPendingCategories} = useGetCategories();
  const {singleData} = useSelector((state: RootState) => state.archiveStudents);
  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm<ArchiveInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editArchiveStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]});
      dispatch(toggleEditArchiveStudentsFunc());
    },
  });

  useEffect(() => {
    if (isOpen && singleData) {
      reset({
        fullName: singleData.fullName,
        birthday: dayjs(singleData?.birthday),
        address: singleData.address,
        group: singleData.group,
        personalPhone: singleData.personalPhone.slice(5), // assuming personalPhone is stored with country code
      });
    }
  }, [isOpen, singleData, reset]);

  const onSubmit = (data: ArchiveInputType) => {
    const isEmpty = Object.values(data).some(
      (val) => val == null || val === ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    }
    mutateAsync({
      _id: singleData?._id ?? "",
      fullName: data.fullName,
      birthday: dayjs(singleData?.birthday).format("MMM D, YYYY"),
      address: data.address,
      group: data.group,
      personalPhone: data.personalPhone,
    }).then(() => {
      reset(); // Reset form after successful submission
    });
  };

  return (
    <Modal
      title="O'quvchini arxivlash"
      centered
      open={isOpen}
      okText="Tahrirlash"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => dispatch(toggleEditArchiveStudentsFunc())}
      confirmLoading={isPending}
      onOk={() => handleSubmit(onSubmit)()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h5 className="text-lg opacity-70 font-medium">Ism familya:</h5>
            <Controller
              name="fullName"
              control={control}
              defaultValue={singleData?.fullName}
              render={({field}) => (
                <Input
                  className="h-10"
                  size="large"
                  {...field}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const capitalizedValue =
                      e.target.value.charAt(0).toUpperCase() +
                      e.target.value.slice(1);
                    field.onChange(capitalizedValue);
                  }}
                />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">
              Tug&apos;ilgan sana:
            </h5>
            <Controller
              name="birthday"
              control={control}
              key={singleData?.birthday}
              render={({field}) => (
                <DatePicker
                  {...field}
                  defaultValue={dayjs(singleData?.birthday)}
                  placeholder=""
                  className="w-full h-10"
                  size="large"
                />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Manzil:</h5>
            <Controller
              name="address"
              control={control}
              defaultValue={singleData?.address}
              render={({field}) => (
                <SelectUI
                  field={field}
                  filterOption={filterOptionSelect}
                  onChange={(value) => {
                    field.onChange(value);
                    onChangeSelect(value);
                  }}
                  onSearch={onSearchSelect}
                  options={neighborhood}
                />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Uyga vazifa:</h5>
            <Controller
              name="group"
              control={control}
              defaultValue={singleData?.group}
              render={({field}) => (
                <Select
                  {...field}
                  size="large"
                  className="h-10 w-full"
                  loading={isPendingCategories}
                  disabled={isPendingCategories}
                  options={groups?.map((group) => ({
                    value: group.language,
                    label: group.language,
                    emoji: group.image,
                  }))}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.language}>
                        <img
                          src={option.data.emoji}
                          alt=""
                          width={24}
                          height={24}
                        />
                      </span>
                      {option.value}
                    </Space>
                  )}
                />
              )}
            />
          </div>
        </div>
        <div>
          <h5 className="text-lg opacity-70 font-medium">Shaxsiy raqam:</h5>
          <Controller
            name="personalPhone"
            control={control}
            defaultValue={singleData?.personalPhone.slice(5) ?? ""}
            render={({field}) => (
              <Input
                {...field}
                name="phone"
                addonBefore="+998"
                size="large"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const formattedValue = formatPhoneNumber(e.target.value);
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
}

export default EditArchiveStudent;
