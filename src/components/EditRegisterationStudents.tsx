import { toggleRegistrationFunc } from "@/lib/features/toggle/toggleSlice"
import { RootState } from "@/lib/store"
import { formatPhoneNumber } from "@/utils/utils"
import { Input, Modal } from "antd"
import { ChangeEvent } from "react"
import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"

function EditRegistrationStudents({ isOpen }: { isOpen: boolean }) {
    const { singleRegisterStudents } = useSelector((state: RootState) => state.registerStudentsSlice)
    console.log(singleRegisterStudents);

    const dispatch = useDispatch()
    const { control } = useForm()
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
                confirmLoading={false}
            // onOk={() => handleSubmit(onSubmit)()}
            >
                <form
                    className="grid grid-cols-2 gap-3"
                // onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <h5 className="text-lg opacity-70 font-medium">Ism familya:</h5>
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue={singleRegisterStudents?.fullName}
                            render={({ field }) => (
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
                            name="personalPhone"
                            control={control}
                            render={({ field }) => (
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
            </Modal >
        </>
    )
}

export default EditRegistrationStudents