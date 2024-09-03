import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface PHInputProps {
  type: string;
  name: string;
  label: string;
}

const PHInput: React.FC<PHInputProps> = ({ type, name, label }) => {
  return (
    <>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <Form.Item
              label={label}
              htmlFor={name}
              validateStatus={error ? "error" : "validating"}
              help={error && error.message}
              style={{
                marginBottom: error && "32px",
              }}
            >
              {type === "password" ? (
                <Input.Password {...field} id={name} />
              ) : (
                <Input {...field} type={type} id={name} />
              )}
            </Form.Item>
          );
        }}
      />
    </>
  );
};

export default PHInput;
