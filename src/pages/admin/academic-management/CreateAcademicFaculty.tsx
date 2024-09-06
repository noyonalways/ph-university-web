import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/forms/ph-from";
import PHInput from "../../../components/forms/ph-input";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin";
import { createAcademicFacultySchema } from "../../../schemas";
import { TResponse } from "../../../types";

interface IProps {}

const CreateAcademicFaculty: React.FC<IProps> = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...", {
      position: "top-right",
      style: { padding: 20 },
    });

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addAcademicFaculty(data)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error?.data?.message, {
          position: "top-right",
          style: { padding: 20 },
          id: toastId,
        });
      } else {
        toast.success(res?.data?.message, {
          position: "top-right",
          style: { padding: 20 },
          id: toastId,
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        position: "top-right",
        style: { padding: 20 },
        id: toastId,
      });
    }
  };

  return (
    <Row align="middle" justify="center">
      <Col span={24} md={{ span: 6 }}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicFacultySchema)}
        >
          <PHInput label="Name" name="name" type="text" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicFaculty;
