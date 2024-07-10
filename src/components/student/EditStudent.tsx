"use client";
import {DatePicker, Input, InputNumber, Select, Space} from "antd";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {Controller, useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
  customFetch,
  filterOptionSelect,
  formatPhoneNumber,
  neighborhood,
  onChangeSelect,
  onSearchSelect,
} from "@/utils/utils";
import {toast} from "sonner";
import {useDispatch, useSelector} from "react-redux";
import {toggleEditStudentFunc} from "@/lib/features/toggle/toggleSlice";
import dayjs from "dayjs";
import {RootState} from "@/lib/store";
import {ChangeEvent, useEffect} from "react";
import useFileChange from "@/hooks/useFileChange";
import Btn from "@/components/antdUI/Btn";
import SelectUI from "@/components/antdUI/SelectUI";
import PhoneInput from "@/components/antdUI/PhoneInput";
import useGetCategories from "@/hooks/useGetCategories";

type StudentsInput = {
  fullName: string;
  birthday: any;
  address: string;
  group: string;
  personalPhone: string;
  homePhone: string;
  certificate: any;
  graduated: any;
  userPercentage: number;
  userPhoto: string | null;
  quizLevel: number;
  videoLevel: number;
};

async function editStudent(data: IStudents) {
  try {
    const res = await customFetch.put(`students/${data._id}`, data);
    toast.success("Student edited successfully");
    return res.data;
  } catch (error) {
    toast.error("Failed to edit student");
    throw error;
  } finally {
    toast.dismiss();
  }
}

function EditStudent({isOpen}: {isOpen: boolean}) {
  const {groups, isPendingCategories} = useGetCategories();
  const {handleFileChange, selectImage, setSelectImage} = useFileChange();
  const dispatch = useDispatch();

  const queryClient = useQueryClient();
  const {control, handleSubmit, reset} = useForm<StudentsInput>();
  const {singleStudentData} = useSelector(
    (store: RootState) => store.studentSlice
  );

  useEffect(() => {
    if (singleStudentData?.userPhoto) {
      setSelectImage(singleStudentData.userPhoto);
    } else {
      setSelectImage(null)
    }
  }, [singleStudentData, isOpen]);

  const {mutateAsync, isPending} = useMutation({
    mutationFn: editStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["students"]});
      dispatch(toggleEditStudentFunc());
    },
  });

  useEffect(() => {
    if (isOpen && singleStudentData) {
      reset({
        address: singleStudentData.address,
        birthday: dayjs(singleStudentData?.birthday),
        certificate: singleStudentData.certificate,
        fullName: singleStudentData.fullName,
        graduated: singleStudentData.graduated,
        group: singleStudentData.group,
        homePhone: singleStudentData.homePhone.slice(5),
        personalPhone: singleStudentData.personalPhone.slice(5), // Use slice(5) here        quizLevel: 0,
        userPercentage: singleStudentData.userPercentage,
        userPhoto: singleStudentData.userPhoto,
        videoLevel: singleStudentData.videoLevel,
      });
    }
  }, [singleStudentData, isOpen, reset]);

  const onSubmit = (studentsFormData: StudentsInput) => {
    mutateAsync({
      _id: singleStudentData?._id ?? "",
      id: singleStudentData?.id ?? 1,
      fullName: studentsFormData.fullName,
      birthday: dayjs(studentsFormData?.birthday).format("MMM D, YYYY"),
      address: studentsFormData.address,
      group: studentsFormData.group,
      personalPhone: "+998 " + studentsFormData.personalPhone,
      homePhone: "+998 " + studentsFormData.homePhone,
      certificate: studentsFormData.certificate,
      graduated: studentsFormData.graduated,
      userPercentage: studentsFormData.userPercentage,
      userPhoto: selectImage,
      quizLevel: 0,
      videoLevel: 0,
    }).then(() => reset());
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40 transition-all duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white z-50 w-full mx-[17%] p-6 rounded-lg shadow-lg">
        <div className="flex justify-between">
          <p className="mb-5">Edit student</p>
          <button
            onClick={() => {
              dispatch(toggleEditStudentFunc());
              reset();
            }}
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
                    onChange={handleFileChange}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            )}
            <Btn
              disabled={selectImage ? false : true}
              click={() => setSelectImage(null)}
              danger
              size="middle"
            >
              RASMNI O&apos;CHIRISH
            </Btn>
          </div>
          <div className="grid mt-5 grid-cols-2 gap-3 h-min w-full ml-5">
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Fullname:</h5>
              <Controller
                control={control}
                name="fullName"
                key={singleStudentData?.fullName}
                defaultValue={singleStudentData?.fullName}
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
              <h5 className="text-lg opacity-70 font-medium">Birthday:</h5>
              <Controller
                name="birthday"
                control={control}
                key={singleStudentData?.birthday}
                render={({field}) => (
                  <DatePicker
                    defaultValue={dayjs(singleStudentData?.birthday)}
                    placeholder=""
                    className="w-full h-10"
                    {...field}
                    size="large"
                  />
                )}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Address:</h5>
              <Controller
                name="address"
                control={control}
                key={singleStudentData?.address}
                render={({field}) => (
                  <SelectUI
                    field={field}
                    defaultValue={singleStudentData?.address}
                    {...field}
                    options={neighborhood}
                    filterOption={filterOptionSelect}
                    onSearch={onSearchSelect}
                    onChange={(value) => {
                      field.onChange(value);
                      onChangeSelect(value);
                    }}
                  />
                )}
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Group:</h5>
              <Controller
                name="group"
                control={control}
                key={singleStudentData?.group}
                defaultValue={singleStudentData?.group}
                render={({field}) => (
                  <Select
                    {...field}
                    loading={isPendingCategories}
                    disabled={isPendingCategories}
                    size="large"
                    className="h-10 w-full"
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
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Shaxsiy raqam:</h5>
              <Controller
                key={singleStudentData?.personalPhone.slice(5)}
                name="personalPhone"
                control={control}
                render={({field}) => (
                  <Input
                    {...field}
                    defaultValue={singleStudentData?.personalPhone.slice(5)}
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
            <div className="w-full">
              <PhoneInput
                defaultValue={singleStudentData?.homePhone.slice(5)}
                control={control}
                controlName="homePhone"
                label="Uy"
              />
            </div>
            <div className="w-full">
              <h5 className="text-lg opacity-70 font-medium">Sertifikat:</h5>
              <Controller
                name="certificate"
                key={
                  singleStudentData?.certificate
                    ? "Berilgan ✅"
                    : "Berilmagan ❌"
                }
                control={control}
                render={({field}) => (
                  <Select
                    className="w-full"
                    size="large"
                    defaultValue={
                      singleStudentData?.certificate
                        ? "Berilgan ✅"
                        : "Berilmagan ❌"
                    }
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
                key={
                  singleStudentData?.graduated ? "Bitirgan ✅" : "Bitirmagan ❌"
                }
                render={({field}) => (
                  <Select
                    className="w-full"
                    size="large"
                    defaultValue={
                      singleStudentData?.graduated
                        ? "Bitirgan ✅"
                        : "Bitirmagan ❌"
                    }
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

            <div className="flex gap-3">
              <div>
                <h5 className="text-lg w-full opacity-70 font-medium">
                  O&apos;zlashtirishi:
                </h5>
                <Controller
                  name="userPercentage"
                  control={control}
                  key={singleStudentData?.userPercentage}
                  defaultValue={singleStudentData?.userPercentage}
                  render={({field}) => (
                    <InputNumber
                      {...field}
                      size="large"
                      className="w-full"
                      min={0}
                      max={100}
                    />
                  )}
                />
              </div>

              <div className="w-full items-end flex">
                <Btn htmlType="submit" icon="edit" loading={isPending}>
                  TAHRIRLASH
                </Btn>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default EditStudent;
