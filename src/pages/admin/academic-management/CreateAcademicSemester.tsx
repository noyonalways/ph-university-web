import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Row } from "antd";
import { FC } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/forms/ph-from";
import PHSelect from "../../../components/forms/ph-select";
import { monthOptions, yearOptions } from "../../../constants";
import { semesterOptions } from "../../../constants/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin";
import { createAcademicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

interface IProps {}

const CreateAcademicSemester: FC<IProps> = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...", {
      position: "top-right",
      style: { padding: 20 },
    });

    const name = semesterOptions[Number(data.name) - 1]?.label;

    const semesterDate = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addAcademicSemester(semesterDate)) as TResponse<any>;
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
          resolver={zodResolver(createAcademicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicSemester;
