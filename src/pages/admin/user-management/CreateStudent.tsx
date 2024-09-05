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
  useCreateStudentMutation,
  useGetAcademicDepartmentsQuery,
  useGetAcademicSemestersQuery,
} from "../../../redux/features/admin";
import { createStudentSchema } from "../../../schemas/userManagement.schema";
import { TResponse } from "../../../types";

//! for development purpose
const studentDefaultValues = {
  name: {
    firstName: "Noyon",
    lastName: "Rahman",
  },
  gender: "male",

  bloodGroup: "A+",

  email: "noyonrahman2003@gmail.com",
  contactNo: "+8801712345678",
  emergencyContactNo: "0987654321",
  presentAddress: "123 Main St, Anytown, USA",
  permanentAddress: "456 Elm St, Anytown, USA",

  guardian: {
    fatherName: "James Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "1234567890",
    motherName: "Jane Doe",
    motherOccupation: "Doctor",
    motherContactNo: "0987654321",
  },

  localGuardian: {
    name: "Robert Smith",
    occupation: "Teacher",
    contactNo: "1122334455",
    address: "789 Oak St, Anytown, USA",
  },
};

interface IProps {}

const CreateStudent: React.FC<IProps> = () => {
  const [addStudent] = useCreateStudentMutation();

  // console.log({ isCreatingStudent, resStudentData, error });

  const { data: semesters, isLoading: isSemestersLoading } =
    useGetAcademicSemestersQuery(undefined);
  const { data: departments, isLoading: isDepartmentsLoading } =
    useGetAcademicDepartmentsQuery(undefined);

  const admissionSemesterOptions =
    semesters?.data?.map((semester) => ({
      label: `${semester.name} ${semester.year}`,
      value: semester._id,
    })) ?? [];

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
      password: data.password || "pass1234",
      student: copyData,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(studentData));
    formData.append("file", data.image);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res = (await addStudent(formData)) as TResponse<any>;
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
          resolver={zodResolver(createStudentSchema)}
          defaultValues={studentDefaultValues}
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
                type="text"
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

          <Divider>Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father Name"
                name="guardian.fatherName"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father Occupation"
                name="guardian.fatherOccupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Father Contact No"
                name="guardian.fatherContactNo"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Mother Name"
                name="guardian.motherName"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Mother Occupation"
                name="guardian.motherOccupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Mother Contact No"
                name="guardian.motherContactNo"
                type="text"
              />
            </Col>
          </Row>

          <Divider>Local Guardian Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput label="Name" name="localGuardian.name" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Occupation"
                name="localGuardian.occupation"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Contact No"
                name="localGuardian.contactNo"
                type="text"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHInput
                label="Address"
                name="localGuardian.address"
                type="text"
              />
            </Col>
          </Row>

          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Admission Semester"
                name="admissionSemester"
                options={admissionSemesterOptions}
                disabled={isSemestersLoading}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PHSelect
                label="Academic Department"
                name="academicDepartment"
                options={academicDepartmentOptions}
                disabled={isDepartmentsLoading}
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
