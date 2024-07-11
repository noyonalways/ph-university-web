import { Input } from "antd";
import { Controller } from "react-hook-form";

interface PHInputProps {
  type: string;
  name: string;
  label: string;
}

const PHInput: React.FC<PHInputProps> = ({ type, name, label }) => {
  return (
    <div style={{ paddingBottom: "10px" }}>
      <label style={{ display: "block", marginBottom: "5px" }} htmlFor={name}>
        {label}
      </label>
      <Controller
        name={name}
        render={({ field }) => {
          if (type === "password") {
            return <Input.Password {...field} />;
          }
          return <Input {...field} />;
        }}
      />
    </div>
  );
};

export default PHInput;
