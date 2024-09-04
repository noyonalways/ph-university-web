import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row, Spin } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/forms/ph-from";
import PHInput from "../../../components/forms/ph-input";
import PHSelect from "../../../components/forms/ph-select";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin";
import { createAcademicDepartmentSchema } from "../../../schemas";
import { TResponse } from "../../../types";

interface IProps {}

const CreateAcademicDepartment: React.FC<IProps> = () => {
  const { data: academicFacultiesData, isFetching } =
    useGetAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const academicFacultyOptions =
    academicFacultiesData?.data?.map((faculty) => ({
      label: faculty.name,
      value: faculty._id,
    })) ?? [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...", {
      position: "top-right",
      style: { padding: 20 },
    });

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addAcademicDepartment(data)) as TResponse<any>;
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
    <Row justify="center" align="middle">
      <Col span={24} md={{ span: 6 }}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(createAcademicDepartmentSchema)}
        >
          <PHInput name="name" label="Name" type="text" />
          {isFetching ? (
            <Spin style={{ display: "block" }} />
          ) : (
            <PHSelect
              label="Academic Faculty"
              name="academicFaculty"
              options={academicFacultyOptions}
            />
          )}
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicDepartment;
