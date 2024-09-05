import { Card, Descriptions, Image } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin";

interface IProps {}

const StudentDetails: React.FC<IProps> = () => {
  const params = useParams();
  const { data: student, isLoading } = useGetSingleStudentQuery(
    params.studentId
  );

  return (
    <Card
      loading={isLoading}
      title={student?.fullName}
      extra={
        student?.profileImage ? (
          <Image
            width={100}
            height={100}
            src={student?.profileImage}
            style={{ borderRadius: "50%", padding: "10px" }}
          />
        ) : (
          <span
            style={{
              background: "#1677ff",
              color: "white",
              width: "80px",
              height: "80px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              fontWeight: "500",
              margin: "10px 0px",
              padding: "10px",
              fontSize: "32px",
            }}
          >
            {student?.fullName?.split("")[0]}
          </span>
        )
      }
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Student ID">{student?.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {`${student?.name?.firstName} ${student?.name?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{student?.email}</Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {student?.contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Emergency Contact">
          {student?.emergencyContactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {(student?.gender === "male" && "Male") ||
            student?.gender === "female" ||
            (student?.gender === "other" && "Other")}
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">
          {student?.bloodGroup}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {student?.dateOfBirth &&
            new Date(student.dateOfBirth)?.toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address">
          {student?.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address">
          {student?.permanentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Academic Department">
          {student?.academicDepartment?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Admission Semester">
          {`${student?.admissionSemester?.name} ${student?.admissionSemester?.year}`}
        </Descriptions.Item>
        <Descriptions.Item label="Guardian Info">
          <p>
            <strong>Father Name:</strong> {student?.guardian?.fatherName},
            <strong> Occupation:</strong> {student?.guardian?.fatherOccupation},
            <strong> Contact</strong>: {student?.guardian?.fatherContactNo}
          </p>
          <p>
            <strong>Mother Name:</strong> {student?.guardian?.motherName},
            <strong> Occupation:</strong> {student?.guardian?.motherOccupation},
            <strong> Contact</strong>: {student?.guardian?.motherContactNo}
          </p>
        </Descriptions.Item>
        <Descriptions.Item label="Local Guardian Info">
          <p>
            <strong>Name:</strong> {student?.localGuardian?.name},
            <strong> Occupation:</strong> {student?.localGuardian?.occupation},
            <strong> Contact</strong>: {student?.localGuardian?.contactNo}{" "}
            <br />
            <strong> Address</strong>: {student?.localGuardian?.address}
          </p>
        </Descriptions.Item>
        <Descriptions.Item label="Profile Created At">
          {student?.createdAt && new Date(student?.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Profile Updated At">
          {student?.updatedAt && new Date(student?.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default StudentDetails;
