"use client"
import {UserOutlined} from "@ant-design/icons"
import {DatePicker, Select, SelectProps, Space} from "antd"
import Input from "antd/es/input/Input"
import {MapPinIcon} from "@heroicons/react/24/outline"
export function FilterStudent() {
  const options: SelectProps["options"] = [
    {
      label: "China",
      value: "china",
      emoji: "🇨🇳",
      desc: "China (中国)",
    },
    {
      label: "USA",
      value: "usa",
      emoji: "🇺🇸",
      desc: "USA (美国)",
    },
    {
      label: "Japan",
      value: "japan",
      emoji: "🇯🇵",
      desc: "Japan (日本)",
    },
    {
      label: "Korea",
      value: "korea",
      emoji: "🇰🇷",
      desc: "Korea (韩国)",
    },
  ]
  return (
    <div className="flex items-center gap-x-4">
      <h5 className="text-xl font-medium">Filter:</h5>
      <Input
        className="w-72"
        size="large"
        placeholder="Fullname"
        prefix={<UserOutlined />}
      />
      <DatePicker size="large" />
      <Input
        className="w-72"
        size="large"
        placeholder="Address"
        prefix={<MapPinIcon width={24} height={24} />}
      />
      <Select
        size="large"
        mode="multiple"
        className="w-52 max-w-full"
        placeholder="select one country"
        defaultValue={["china"]}
        options={options}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.data.label}>
              {option.data.emoji}
            </span>
            {option.data.desc}
          </Space>
        )}
      />
    </div>
  )
}
