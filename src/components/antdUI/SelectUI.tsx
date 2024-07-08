import {Select} from "antd";
import {ControllerRenderProps} from "react-hook-form";
type SelectUIType = {
  field: ControllerRenderProps<any, any>;
  onChange: (value: any) => void;
  defaultValue?: string;
  onSearch?: (value: string) => void;
  filterOption?: (
    input: string,
    option?: {
      label: string;
      value: "yes" | "no" | string;
    }
  ) => boolean;
  options: {
    value: "yes" | "no" | string;
    label: string;
  }[];
};

function SelectUI({
  field,
  filterOption,
  defaultValue,
  onChange,
  onSearch,
  options,
}: SelectUIType) {
  return (
    <Select
      {...field}
      defaultValue={defaultValue}
      showSearch
      size="large"
      className="h-10 w-full"
      placeholder=""
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={options}
    />
  );
}
export default SelectUI;
