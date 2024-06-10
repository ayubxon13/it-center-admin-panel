"use client"
import {Input} from "antd"
import {useRouter} from "next/navigation"
import {FormEvent} from "react"
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons"
import {toast} from "sonner"
import Btn from "@/components/antdUI/Btn"

function Login() {
  const router = useRouter()
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const login = formData.get("login")
    const password = formData.get("password")
    if (login == "it_center" && password == "2933996") {
      localStorage.setItem("auth", JSON.stringify(true))
      router.push("/")
      return null
    } else {
      toast.error("Login or password error")
    }
  }
  return (
    <div className="w-full mt-[300px]">
      <div className="mx-auto p-6 w-[500px] shadow-xl">
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-2 mt-6">
          <Input name="login" className="h-10" placeholder="Login" />
          <Input.Password
            name="password"
            placeholder="Parol"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Btn htmlType="submit">Login</Btn>
        </form>
      </div>
    </div>
  )
}
export default Login
