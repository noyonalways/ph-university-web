import { Form, Select } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
}

const PHSelect: FC<IProps> = ({ label, name, options }) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item
          label={label}
          validateStatus={error ? "error" : "validating"}
          help={error && error.message}
          style={{
            marginBottom: error && "32px",
            width: "100%",
          }}
        >
          <Select {...field} options={options} />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
