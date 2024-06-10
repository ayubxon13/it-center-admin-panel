import {formatPhoneNumber} from "@/utils/utils"
import {Input} from "antd"
import {Control, Controller} from "react-hook-form"

type PhoneInputType = {
  controlName: keyof TInputs
  label: string
  control: Control<TInputs, any>
  defaultValue?: string
}

function PhoneInput({
  control,
  defaultValue,
  controlName,
  label,
}: PhoneInputType) {
  return (
    <>
      <h5 className="text-lg opacity-70 font-medium">{label} raqam:</h5>
      <Controller
        key={defaultValue}
        name={controlName}
        control={control}
        render={({field}) => (
          <Input
            {...field}
            name="phone"
            defaultValue={defaultValue}
            addonBefore="+998"
            size="large"
            onChange={(e) => {
              const formattedValue = formatPhoneNumber(e.target.value)
              field.onChange(formattedValue)
            }}
          />
        )}
      />
    </>
  )
}
export default PhoneInput
