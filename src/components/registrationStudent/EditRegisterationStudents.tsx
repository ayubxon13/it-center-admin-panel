// EditRegistrationStudents.tsx

import React, {ChangeEvent, useEffect} from "react";
import {Input, Modal} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {Controller, useForm} from "react-hook-form";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {RootState} from "@/lib/store";
import {toggleEditRegistrationFunc} from "@/lib/features/toggle/toggleSlice";
import {customFetch, formatPhoneNumber} from "@/utils/utils";

interface InputType {
  fullName: string;
  personalPhone: string;
}

async function editRegistrationStudents(data: InputType & {_id: string}) {
  try {
    const res = await customFetch.put(`register-students/${data._id}`, {
      fullName: data.fullName,
      personalPhone: `+998 ${data.personalPhone}`,
      role: "noStudent",
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

const EditRegistrationStudents = ({isOpen}: {isOpen: boolean}) => {
  const {singleRegisterStudents} = useSelector(
    (state: RootState) => state.registerStudentsSlice
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {handleSubmit, control, reset} = useForm<InputType>();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editRegistrationStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]});
      dispatch(toggleEditRegistrationFunc());
    },
  });

  useEffect(() => {
    if (isOpen && singleRegisterStudents) {
      reset({
        fullName: singleRegisterStudents.fullName,
        personalPhone: singleRegisterStudents.personalPhone.slice(5), // assuming personalPhone is stored with country code
      });
    }
  }, [isOpen, singleRegisterStudents, reset]);

  const onSubmit = (registerStudentsData: InputType) => {
    const isEmpty = Object.values(registerStudentsData).some(
      (val) => val == null || val === ""
    );
    if (isEmpty) {
      return toast.error("Please fill out the form");
    }

    mutateAsync({
      _id: singleRegisterStudents?._id ?? "",
      fullName: registerStudentsData.fullName,
      personalPhone: registerStudentsData.personalPhone,
    }).then(() => {
      reset(); // Reset form after successful submission
    });
  };

  return (
    <Modal
      title="Ro'yhatdagini tahrirlash"
      centered
      open={isOpen}
      okText="Tahrirlash"
      cancelText="Bekor qilish"
      onCancel={() => {
        dispatch(toggleEditRegistrationFunc());
        reset(); // Reset form on cancel
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
            defaultValue={singleRegisterStudents?.fullName ?? ""}
            render={({field}) => (
              <Input
                {...field}
                className="h-10"
                size="large"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
          <h5 className="text-lg opacity-70 font-medium">Shaxsiy raqam:</h5>
          <Controller
            name="personalPhone"
            control={control}
            defaultValue={singleRegisterStudents?.personalPhone.slice(5) ?? ""}
            render={({field}) => (
              <Input
                {...field}
                name="phone"
                addonBefore="+998"
                size="large"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
};

export default EditRegistrationStudents;
