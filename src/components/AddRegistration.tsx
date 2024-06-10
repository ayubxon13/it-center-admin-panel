"use client"
import {Input, Modal} from "antd"
import {useDispatch} from "react-redux"
import {toggleRegistrationFunc} from "@/lib/features/toggle/toggleSlice"
import {Controller, useForm} from "react-hook-form"
import {ChangeEvent} from "react"
import {customFetch, formatPhoneNumber} from "@/utils/utils"
import {toast} from "sonner"
import {useMutation, useQueryClient} from "@tanstack/react-query"

type RegisterInputType = {
  fullName: string
  number: string
}

async function addRegistration(data: RegisterInputType) {
  try {
    const res = await customFetch.post("students", data)
    toast.success("Student created successfully")
  } catch (error) {
    toast.error("Failed to create student")
    throw error
  } finally {
    toast.dismiss()
  }
}

function AddRegistration({isOpen}: {isOpen: boolean}) {
  const queryClient = useQueryClient()

  const dispatch = useDispatch()
  const {control, handleSubmit} = useForm<RegisterInputType>()

  const {mutateAsync, isPending} = useMutation({
    mutationFn: addRegistration,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["registration"]})
      dispatch(toggleRegistrationFunc())
    },
  })

  const onSubmit = (data: RegisterInputType) => {
    const isEmpty = Object.values(data).some((val) => val == null || val == "")
    if (isEmpty) {
      return toast.error("Please fill out the form")
    } else {
      mutateAsync(data)
    }
  }

  return (
    <>
      <Modal
        title="Ro'yhatga olish"
        centered
        open={isOpen}
        okText="Qo'shish"
        cancelText="Bekor qilish"
        onOk={() => handleSubmit(onSubmit)()}
        onCancel={() => dispatch(toggleRegistrationFunc())}
        width={700}
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
                      e.target.value.slice(1)
                    field.onChange({
                      ...e,
                      target: {
                        ...e.target,
                        value: capitalizedValue,
                      },
                    })
                  }}
                />
              )}
            />
          </div>
          <div>
            <h5 className="text-lg opacity-70 font-medium">Shaxsiy raqam:</h5>
            <Controller
              name="number"
              control={control}
              render={({field}) => (
                <Input
                  {...field}
                  name="phone"
                  addonBefore="+998"
                  size="large"
                  onChange={(e) => {
                    const formattedValue = formatPhoneNumber(e.target.value)
                    field.onChange(formattedValue)
                  }}
                />
              )}
            />
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddRegistration
