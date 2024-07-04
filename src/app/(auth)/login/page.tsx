"use client";
import {Input} from "antd";
import {FormEvent} from "react";
import {EyeInvisibleOutlined, EyeTwoTone} from "@ant-design/icons";
import {toast} from "sonner";
import Btn from "@/components/antdUI/Btn";
import {useRouter} from "next/navigation";

function Login() {
  const route = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = formData.get("user") as string;
    const password = formData.get("password") as string;
    if (user === "it_center" && password === "2933996") {
      localStorage.setItem("auth", JSON.stringify(true));
      route.push("/");
      toast.success("Hush keldingiz !");
    } else {
      toast.error("Login or password error");
    }
  };
  return (
    <div className="w-full mt-[300px]">
      <div className="mx-auto p-6 w-[500px] shadow-xl">
        <h4 className="text-center font-bold text-3xl">Login</h4>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-2 mt-6">
          <Input name="user" className="h-10" placeholder="Login" />
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
  );
}
export default Login;
