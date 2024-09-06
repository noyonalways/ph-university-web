import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PHDatePicker from "../../../components/forms/ph-date-picker";
import PHForm from "../../../components/forms/ph-from";
import PHInput from "../../../components/forms/ph-input";
import PHSelect from "../../../components/forms/ph-select";
import { bloodGroupOptions, gendersOptions } from "../../../constants";
import {
  useCreateFacultyMutation,
  useGetAcademicDepartmentsQuery,
} from "../../../redux/features/admin";
import { createFacultySchema } from "../../../schemas";
import { TResponse } from "../../../types";

//! for development purpose
const facultyDefaultValues = {
  name: {
    firstName: "HM",
    middleName: "",
    lastName: "Nayem",
  },
  gender: "male",
  bloodGroup: "B+",

  email: "hm.nayme@gmail.com",
  contactNo: "123-456-7890",
  emergencyContactNo: "098-765-4321",

  presentAddress: "Dummy Address",
  permanentAddress: "Dummy Address",
};

interface IProps {}

const CreateFaculty: React.FC<IProps> = () => {
  const [addFaculty] = useCreateFacultyMutation();

  // console.log({ isCreatingStudent, resStudentData, error });
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const academicDepartmentOptions =
    departments?.data?.map((department) => ({
      label: department.name,
      value: department._id,
    })) ?? [];

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...", {
      position: "top-right",
      style: { padding: 20 },
    });

    const copyData = { ...data };
    delete copyData.image;
    delete copyData.password;

    const studentData = {
      password: data.password,
      faculty: copyData,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    console.log(Object.fromEntries(formData));

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addFaculty(formData)) as TResponse<any>;
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

    //! this for development purpose just for checking the data
    // console.log(Object.fromEntries(formData));
  };
  return (
    <Row justify="center" align="middle">
      <Col span={24}>
        <PHForm
          onSubmit={onSubmit}
          defaultValues={facultyDefaultValues}
          resolver={zodResolver(createFacultySchema)}
        >
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="First Name" name="name.firstName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Middle Name" name="name.middleName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Last Name" name="name.lastName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect label="Gender" name="gender" options={gendersOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHDatePicker label="Date of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Blood Group"
                name="bloodGroup"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image (Optional)">
                    <Input
                      value={value?.fileName}
                      type="file"
                      onChange={(e) => onChange(e.target.files?.[0])}
                      {...field}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Password (Optional)"
                name="password"
                type="password"
              />
            </Col>
          </Row>

          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Email" name="email" type="email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Contact No" name="contactNo" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Emergency Contact No"
                name="emergencyContactNo"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Present Address"
                name="presentAddress"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Permanent Address"
                name="permanentAddress"
                type="text"
              />
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
                disabled={isDepartmentsLoading}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Designation" name="designation" type="text" />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
