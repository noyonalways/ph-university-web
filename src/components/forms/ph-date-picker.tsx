import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
  size?: "large" | "middle" | "small";
}

const PHDatePicker: React.FC<IProps> = ({ label, name, size }) => {
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
          <DatePicker style={{ width: "100%" }} {...field} size={size} />
        </Form.Item>
      )}
    />
  );
};

export default PHDatePicker;
