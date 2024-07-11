import {toggleAddArchiveStudentsFunc} from "@/lib/features/toggle/toggleSlice";
import {
  customFetch,
  filterOptionSelect,
  formatPhoneNumber,
  neighborhood,
  onChangeSelect,
  onSearchSelect,
} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DatePicker, Input, Modal, Select, Space} from "antd";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {toast} from "sonner";
import SelectUI from "../antdUI/SelectUI";
import useGetCategories from "@/hooks/useGetCategories";
import dayjs from "dayjs";

type ArchiveInputType = {
  fullName: string;
  birthday: string;
  address: string;
  group: string;
  personalPhone: string;
};

async function addArchiveStudent(data: ArchiveInputType) {
  try {
    await customFetch.post("archive-students", {
      fullName: data.fullName,
      birthday: dayjs(data.birthday).format("MMM D, YYYY"),
      address: data.address,
      group: data.group,
      personalPhone: `+998 ${data.personalPhone}`,
    });
  } catch (error) {
    toast.error("Yaratishda xatolikka uchradi");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddArchiveStudent({isOpen}: {isOpen: boolean}) {
  const {groups, isPendingCategories} = useGetCategories();

  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm<ArchiveInputType>();

  const queryClient = useQueryClient();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addArchiveStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]});
    },
  });

  const onSubmit = (archiveStudentData: ArchiveInputType) => {
    const isEmpty = Object.values(archiveStudentData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else {
      mutateAsync(archiveStudentData).then(() => {
        reset();
        dispatch(toggleAddArchiveStudentsFunc());
      });
    }
  };

  return (
    <Modal
      title="O'quvchini arxivlash"
      centered
      open={isOpen}
      okText="Qo'shish"
      width={700}
      cancelText="Bekor qilish"
      onCancel={() => dispatch(toggleAddArchiveStudentsFunc())}
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
              render={({field}) => (
                <DatePicker
                  {...field}
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
            <h5 className="text-lg opacity-70 font-medium">Guruhi:</h5>
            <Controller
              name="group"
              control={control}
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

export default AddArchiveStudent;
