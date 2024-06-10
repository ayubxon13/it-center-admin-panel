"use client"
import {
  toggleAddStudentFunc,
  toggleFilterFunc,
} from "@/lib/features/toggle/toggleSlice"
import {RootState} from "@/lib/store"
import {ClipboardDocumentListIcon, PlusIcon} from "@heroicons/react/24/outline"
import {Button} from "antd"
import {ReactNode} from "react"
import {useDispatch, useSelector} from "react-redux"

type THeader = {
  text: string
  buttonOne?: {
    text: string
    icon: ReactNode
  }
  buttonTwo?: {
    text: string
    click: () => void
  }
  buttonThree?: {
    text: string
    click: () => void
  }
}

function Header({text, buttonOne, buttonTwo, buttonThree}: THeader) {
  const dispatch = useDispatch()
  const {toggleFilterValue} = useSelector(
    (store: RootState) => store.toggleSlice
  )
  return (
    <div className="w-full mt-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">{text}</h1>
        <div className="flex gap-x-3">
          {buttonOne && (
            <Button
              onClick={() => dispatch(toggleFilterFunc())}
              type={toggleFilterValue ? "default" : "primary"}
              size="large"
              danger={toggleFilterValue}
              className="flex items-center"
              icon={toggleFilterValue || buttonOne.icon}
            >
              {toggleFilterValue ? "CANCEL" : buttonOne.text}
            </Button>
          )}
          {buttonTwo && (
            <Button
              type={"primary"}
              size="large"
              onClick={() => buttonTwo.click()}
              className="flex items-center"
              icon={<PlusIcon width={21} height={21} />}
            >
              {buttonTwo?.text}
            </Button>
          )}
          {buttonThree && (
            <Button
              type={"primary"}
              size="large"
              onClick={() => buttonThree.click()}
              className="flex items-center"
              icon={<ClipboardDocumentListIcon width={21} height={21} />}
            >
              {buttonThree?.text}
            </Button>
          )}
        </div>
      </div>
      <hr className="border-black border-opacity-25 mt-4" />
    </div>
  )
}
export default Header
