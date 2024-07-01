import {customFetch} from "@/utils/utils"
import {useMutation, useQueryClient} from "@tanstack/react-query"
import {Tooltip, Modal} from "antd"
import {ExclamationCircleFilled} from "@ant-design/icons"
import {toast} from "sonner"
import {ReactNode} from "react"

const {confirm} = Modal

type ModalPromiseType = {
  children: ReactNode
  key: string
  url: string
  title: string
}

const ModalPromise = ({children, key, title, url}: ModalPromiseType) => {
  const queryClient = useQueryClient()

  const deleteStudent = async () => {
    const res = await customFetch.delete(url)
    return res.data
  }

  const {mutateAsync} = useMutation({
    mutationFn: deleteStudent,
    mutationKey: [key],
    onSuccess: () => {
      queryClient.invalidateQueries()
    },
    gcTime: 1,
  })

  const showPromiseConfirm = () => {
    confirm({
      title: `Do you want to delete this ${title}?`,
      icon: <ExclamationCircleFilled />,
      content: "If you delete this, it cannot be recovered!",
      onOk() {
        return new Promise<void>((resolve, reject) => {
          mutateAsync()
            .then(() => {
              resolve()
              toast.success(
                `${
                  title[0].toUpperCase() + title.slice(1).toLowerCase()
                } successfully deleted`
              )
            })
            .catch((error: any) => {
              reject(error)
              toast.error(`Error deleting ${title}: ` + error.message)
            })
        })
      },
      onCancel() {},
    })
  }

  return (
    <Tooltip title="Delete">
      <div onClick={() => showPromiseConfirm()}>{children}</div>
    </Tooltip>
  )
}

export default ModalPromise
