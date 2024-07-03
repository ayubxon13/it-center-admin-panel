import {toggleEditRegistrationFunc} from "@/lib/features/toggle/toggleSlice";
import {RootState} from "@/lib/store";
import {customFetch, formatPhoneNumber} from "@/utils/utils";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {Input, Modal} from "antd";
import {ChangeEvent} from "react";
import {Controller, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "sonner";
async function editRegistrationStudents(data: IRegisterStudents) {
  try {
    const res = await customFetch.put(`register-students/${data._id}`, data);
    toast.success("Muvaffaqiyatli tahrirlandi");
    return res.data;
  } catch (error) {
    toast.error("Failed to edit register-student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

type InputType = {
  fullName: string;
  personalPhone: string;
};

function EditRegistrationStudents({isOpen}: {isOpen: boolean}) {
  const {singleRegisterStudents} = useSelector(
    (state: RootState) => state.registerStudentsSlice
  );
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const {handleSubmit, control, reset} = useForm<InputType>();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editRegistrationStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]});
      dispatch(toggleEditRegistrationFunc());
    },
  });

  const onSubmit = (registerStudentsData: InputType) => {
    const isEmpty = Object.values(registerStudentsData).some(
      (val) => val == null || val == ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else {
      mutateAsync({
        _id: singleRegisterStudents?._id ?? "",
        id: singleRegisterStudents?.id ?? 1,
        fullName: registerStudentsData.fullName,
        personalPhone: "+998 " + registerStudentsData.personalPhone,
        role: singleRegisterStudents?.role ?? "noStudent",
      });
    }
  };

  return (
    <>
      <Modal
        title="Ro'yhatdagini tahrirlash"
        centered
        open={isOpen}
        okText="Tahrirlash"
        cancelText="Bekor qilish"
        onCancel={() => {
          dispatch(toggleEditRegistrationFunc());
          reset();
        }}
        width={700}
        confirmLoading={isPending}
        onOk={() => handleSubmit(onSubmit)()}
      >
        <form
          className="grid grid-cols-2 gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <h5 className="text-lg opacity-70 font-medium">Ism familya:</h5>
            <Controller
              name="fullName"
              control={control}
              key={singleRegisterStudents?.fullName}
              defaultValue={singleRegisterStudents?.fullName}
              render={({field}) => (
                <Input
                  {...field}
                  className="h-10"
                  size="large"
                  defaultValue={singleRegisterStudents?.fullName}
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
            <h5 className="text-lg opacity-70 font-medium">Shaxsiy raqam:</h5>
            <Controller
              name="personalPhone"
              control={control}
              defaultValue={singleRegisterStudents?.personalPhone.slice(5)}
              key={singleRegisterStudents?.personalPhone}
              render={({field}) => (
                <Input
                  {...field}
                  name="phone"
                  addonBefore="+998"
                  size="large"
                  onChange={(e) => {
                    const formattedValue = formatPhoneNumber(e.target.value);
                    field.onChange(formattedValue);
                  }}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  );
}

export default EditRegistrationStudents;
