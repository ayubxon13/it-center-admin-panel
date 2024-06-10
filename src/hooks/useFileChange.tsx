"use client"
import {useState, useCallback, ChangeEvent} from "react"

const useFileChange = () => {
  const [selectImage, setSelectImage] = useState<string | null>(null)

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      event.preventDefault()
      const file: File | undefined = event.target.files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (reader.result) {
            setSelectImage(reader.result as string)
          }
        }
        reader.readAsDataURL(file)
      }
    },
    []
  )

  return {
    selectImage,
    setSelectImage,
    handleFileChange,
  }
}

export default useFileChange
