import { Form, Select } from "antd";
import { FC } from "react";
import { Controller } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
  size?: "large" | "middle" | "small";
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  disabled?: boolean;
}

const PHSelect: FC<IProps> = ({ label, name, size, options, disabled }) => {
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
          <Select
            size={size}
            {...field}
            options={options}
            disabled={disabled}
          />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
