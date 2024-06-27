import {UserOutlined} from "@ant-design/icons";
import Input from "antd/es/input/Input";
export function FilterStudent() {
  return (
    <div className="flex items-center gap-x-4">
      <h5 className="text-xl font-medium">FILTER:</h5>
      <Input
        className="w-72"
        size="large"
        placeholder="Fullname"
        prefix={<UserOutlined />}
      />
    </div>
  );
}
