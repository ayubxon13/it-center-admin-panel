import {PencilSquareIcon, PlusIcon} from "@heroicons/react/24/outline"
import {Button} from "antd"
import {SizeType} from "antd/es/config-provider/SizeContext"
import {ReactNode} from "react"

type BtnType = {
  loading?: boolean
  htmlType?: "reset" | "button" | "submit"
  type?: "link" | "text" | "primary" | "default" | "dashed"
  icon?: "add" | "edit"
  children: ReactNode
  size?: SizeType
  danger?: boolean
  click?: () => void
  disabled?: boolean
}

function Btn({
  children,
  click,
  disabled,
  htmlType,
  icon,
  size,
  loading,
  danger,
  type,
}: BtnType) {
  return (
    <Button
      onClick={click}
      danger={danger}
      disabled={disabled}
      loading={loading}
      htmlType={htmlType ?? "button"}
      type={type ?? "primary"}
      size={size ?? "large"}
      className="flex justify-center items-center"
      icon={
        icon == "edit" ? (
          <PencilSquareIcon width={21} height={21} />
        ) : (
          <PlusIcon width={21} height={21} />
        )
      }
    >
      {children}
    </Button>
  )
}
export default Btn
