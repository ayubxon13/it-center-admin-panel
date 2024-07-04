"use client";
import {ClipboardDocumentListIcon, PlusIcon} from "@heroicons/react/24/outline";
import {Button} from "antd";
import {useRouter} from "next/navigation";
import {ReactNode, useEffect} from "react";

type THeader = {
  text: string;
  buttonOne?: {
    text: string;
    icon: ReactNode;
  };
  buttonTwo?: {
    text?: string;
    click: () => void;
  };
  buttonThree?: {
    text: string;
    click: () => void;
  };
};

function Header({text, buttonTwo, buttonThree}: THeader) {
  const route = useRouter();
  useEffect(() => {
    const admin = localStorage.getItem("auth");
    if (!admin) {
      route.push("/login");
    }
  }, [route]);

  return (
    <div className="w-full mt-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold">{text}</h1>
        <div className="flex items-center gap-x-3">
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
  );
}
export default Header;
