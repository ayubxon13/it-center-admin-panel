"use client";
import {DatePicker, Input, Select, Space} from "antd";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Controller, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
  customFetch,
  filterOptionSelect,
  generateRandomNumber,
  neighborhood,
  onChangeSelect,
  onSearchSelect,
  selectGroup,
} from "@/utils/utils";
import {toast} from "sonner";
import {useDispatch} from "react-redux";
import {toggleAddStudentFunc} from "@/lib/features/toggle/toggleSlice";
import dayjs from "dayjs";
import {ChangeEvent, useRef} from "react";
import useFileChange from "@/hooks/useFileChange";
import SelectUI from "./antdUI/SelectUI";
import PhoneInput from "./antdUI/PhoneInput";
import Btn from "./antdUI/Btn";

async function addStudents(data: IStudents) {
  try {
    const res = await customFetch.post("students", data);
    toast.success("Student created successfully");
    return res.data;
  } catch (error) {
    toast.error("Failed to create student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function AddData({isOpen}: {isOpen: boolean}) {
  const {handleFileChange, selectImage, setSelectImage} = useFileChange();
  const dispatch = useDispatch();
  const fileUpload = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const {control, handleSubmit, reset} = useForm<TInputs>();

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addStudents,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]});
      dispatch(toggleAddStudentFunc());
    },
  });

  const onSubmit = (studentsFormData: TInputs) => {
    const isEmpty = Object.values(studentsFormData).some(
      (val) =>
        val == null || val === "" || fileUpload.current?.files?.length == 0
    );

    if (isEmpty) {
      return toast.error("Please fill out the form");
    } else {
      mutateAsync({
        _id: "",
        id: generateRandomNumber(),
        fullName: studentsFormData.fullName,
        birthday: dayjs(studentsFormData.birthday).format("MMM D, YYYY"),
        address: studentsFormData.address,
        group: studentsFormData?.group?.toString(),
        personalPhone: "+998 " + studentsFormData.personalPhone,
        homePhone: "+998 " + studentsFormData.homePhone,
        certificate: studentsFormData.certificate,
        graduated: studentsFormData.graduated,
        userPercentage: 13,
        userPhoto: selectImage,
        createdAt: new Date(),
        quizLevel: 0,
        videoLevel: 0,
      }).then(() => {
        reset();
        setSelectImage(null);
      });
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white z-50 w-full mx-[17%] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <p className="mb-5">Yangi student qo&apos;shish</p>
          <button
            onClick={() => dispatch(toggleAddStudentFunc())}
            className="bg-slate-100 hover:bg-slate-200 transition-all rounded-full justify-center flex items-center w-8 h-8"
          >
            <XMarkIcon width={25} height={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
          <div className="w-[500px] h-[400px] grid gap-y-2">
            {selectImage ? (
              <img
                src={selectImage}
                alt="Selected File"
                className="h-[370px] rounded-lg w-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-[370px]">
                <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="`0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    ref={fileUpload}
                    onChange={handleFileChange}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            )}
            <Btn
              click={() => setSelectImage(null)}
              disabled={selectImage ? false : true}
              size="middle"
              danger
            >
              RASMNI O&apos;CHIRISH
            </Btn>
          </div>
          <div className="grid mt-5 grid-cols-2 gap-3 h-min w-full ml-5">
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Ism familya:</h5>
              <Controller
                control={control}
                name="fullName"
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
            <div className="w-full">
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
            <div className="w-full">
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
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Guruh:</h5>
              <Controller
                name="group"
                control={control}
                render={({field}) => (
                  <Select
                    {...field}
                    size="large"
                    className="h-10 w-full"
                    options={selectGroup}
                    optionRender={(option) => (
                      <Space>
                        <span role="img" aria-label={option.data.label}>
                          <img
                            src={option.data.emoji}
                            alt=""
                            width={24}
                            height={24}
                          />
                        </span>
                        {option.data.desc}
                      </Space>
                    )}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <PhoneInput
                controlName="personalPhone"
                label="Shaxsiy"
                control={control}
              />
            </div>
            <div className="w-full">
              <PhoneInput
                controlName="homePhone"
                label="Uy"
                control={control}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Sertifikat:</h5>
              <Controller
                name="certificate"
                control={control}
                render={({field}) => (
                  <SelectUI
                    field={field}
                    options={[
                      {
                        value: "yes",
                        label: "Berilgan ✅",
                      },
                      {
                        value: "no",
                        label: "Berilmagan ❌",
                      },
                    ]}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeSelect(value);
                    }}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Bitirgan:</h5>
              <Controller
                name="graduated"
                control={control}
                render={({field}) => (
                  <SelectUI
                    field={field}
                    options={[
                      {
                        value: "yes",
                        label: "Bitirgan ✅",
                      },
                      {
                        value: "no",
                        label: "Bitirmagan ❌",
                      },
                    ]}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeSelect(value);
                    }}
                  />
                )}
              />
            </div>

            <div className="w-full items-end flex">
              <Btn htmlType="submit" loading={isPending}>
                QO&apos;SHISH
              </Btn>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddData;
