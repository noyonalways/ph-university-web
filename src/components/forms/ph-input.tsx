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
        render={({ field }) => {
          return (
            <Form.Item label={label} htmlFor={name}>
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
