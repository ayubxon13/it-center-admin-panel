"use client";
import {Input, Modal} from "antd";
import {useDispatch} from "react-redux";
import {toggleRegistrationFunc} from "@/lib/features/toggle/toggleSlice";
import {Controller, useForm} from "react-hook-form";
import {ChangeEvent} from "react";
import {customFetch, formatPhoneNumber} from "@/utils/utils";
import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";

async function addRegistrationStudent(data: IRegisterStudents) {
  try {
    await customFetch.post("register-students", {
      fullName: data.fullName,
      personalPhone: "+998 " + data.personalPhone,
      role: "noStudent",
    });
    toast.success("Student created successfully");
  } catch (error) {
    toast.error("Failed to create student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddRegistrationStudent({isOpen}: {isOpen: boolean}) {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm<IRegisterStudents>();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addRegistrationStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]});
      dispatch(toggleRegistrationFunc());
    },
  });

  const onSubmit = (data: IRegisterStudents) => {
    const isEmpty = Object.values(data).some((val) => val == null || val == "");
    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else {
      mutateAsync(data).then(() => {
        reset();
      });
    }
  };

  return (
    <>
      <Modal
        title="Ro'yhatga olish"
        centered
        open={isOpen}
        okText="Qo'shish"
        cancelText="Bekor qilish"
        onCancel={() => dispatch(toggleRegistrationFunc())}
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
              render={({field}) => (
                <Input
                  className="h-10"
                  size="large"
                  {...field}
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

export default AddRegistrationStudent;
