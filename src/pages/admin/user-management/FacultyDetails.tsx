import { Card, Descriptions, Image } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleFacultyQuery } from "../../../redux/features/admin";

interface IProps {}

const FacultyDetails: React.FC<IProps> = () => {
  const params = useParams();
  const { data: faculty, isLoading } = useGetSingleFacultyQuery(
    params.facultyId
  );

  console.log(faculty);

  return (
    <Card
      loading={isLoading}
      title={faculty?.fullName}
      extra={
        faculty?.profileImage ? (
          <Image
            width={100}
            height={100}
            src={faculty?.profileImage}
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
            {faculty?.fullName?.split("")[0]}
          </span>
        )
      }
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Faculty ID">{faculty?.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {`${faculty?.name?.firstName} ${faculty?.name?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{faculty?.email}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {(faculty?.user?.status === "in-progress" && "Active") ||
            (faculty?.user?.status === "blocked" && "Blocked")}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          {(faculty?.user?.role === "student" && "Student") ||
            (faculty?.user?.role === "faculty" && "Faculty") ||
            (faculty?.user?.role === "admin" && "Admin")}
        </Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {faculty?.contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Emergency Contact">
          {faculty?.emergencyContactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {(faculty?.gender === "male" && "Male") ||
            faculty?.gender === "female" ||
            (faculty?.gender === "other" && "Other")}
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">
          {faculty?.bloodGroup}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {faculty?.dateOfBirth &&
            new Date(faculty.dateOfBirth)?.toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address">
          {faculty?.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address">
          {faculty?.permanentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Academic Department">
          {faculty?.academicDepartment?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Profile Created At">
          {faculty?.createdAt && new Date(faculty?.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Profile Updated At">
          {faculty?.updatedAt && new Date(faculty?.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default FacultyDetails;
