import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FC } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHForm from "../../../components/forms/ph-from";
import PHSelect from "../../../components/forms/ph-select";
import { monthOptions, yearOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { createAcademicSemesterSchema } from "../../../schemas/academicManagement.schema";

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
      const res = await addAcademicSemester(semesterDate);
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
    <Flex align="center" justify="center">
      <Col span={6}>
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
    </Flex>
  );
};

export default CreateAcademicSemester;
