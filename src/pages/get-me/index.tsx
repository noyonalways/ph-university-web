import { Card, Descriptions, Image } from "antd";
import { useGetMeQuery } from "../../redux/features/auth/authApi";
import { TAdmin } from "../../types";

interface IProps {}

const GetMe: React.FC<IProps> = () => {
  const { data: currentUser, isLoading } = useGetMeQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  if (currentUser.user.role === "admin") {
    currentUser as TAdmin;
  }

  return (
    <Card
      loading={isLoading}
      title={currentUser?.fullName}
      extra={
        currentUser?.profileImage ? (
          <Image
            loading="lazy"
            width={100}
            height={100}
            src={currentUser?.profileImage}
            style={{ borderRadius: "50%", padding: "10px", objectFit: "cover" }}
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
            {currentUser?.fullName?.split("")[0]}
          </span>
        )
      }
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Student ID">
          {currentUser?.id}
        </Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {`${currentUser?.name?.firstName} ${currentUser?.name?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          {currentUser?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Status">
          {(currentUser?.user?.status === "in-progress" && "Active") ||
            (currentUser?.user?.status === "blocked" && "Blocked")}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          {(currentUser?.user?.role === "student" && "Student") ||
            (currentUser?.user?.role === "faculty" && "Faculty") ||
            (currentUser?.user?.role === "admin" && "Admin")}
        </Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {currentUser?.contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Emergency Contact">
          {currentUser?.emergencyContactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {(currentUser?.gender === "male" && "Male") ||
            currentUser?.gender === "female" ||
            (currentUser?.gender === "other" && "Other")}
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">
          {currentUser?.bloodGroup}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {currentUser?.dateOfBirth &&
            new Date(currentUser.dateOfBirth)?.toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address">
          {currentUser?.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address">
          {currentUser?.permanentAddress}
        </Descriptions.Item>

        {currentUser?.academicDepartment && (
          <Descriptions.Item label="Academic Department">
            {currentUser?.academicDepartment?.name}
          </Descriptions.Item>
        )}

        {currentUser?.admissionSemester && (
          <Descriptions.Item label="Admission Semester">
            {`${currentUser?.admissionSemester?.name} ${currentUser?.admissionSemester?.year}`}
          </Descriptions.Item>
        )}

        {currentUser?.guardian && (
          <Descriptions.Item label="Guardian Info">
            <p>
              <strong>Father Name:</strong> {currentUser?.guardian?.fatherName},
              <strong> Occupation:</strong>{" "}
              {currentUser?.guardian?.fatherOccupation},
              <strong> Contact</strong>:{" "}
              {currentUser?.guardian?.fatherContactNo}
            </p>
            <p>
              <strong>Mother Name:</strong> {currentUser?.guardian?.motherName},
              <strong> Occupation:</strong>{" "}
              {currentUser?.guardian?.motherOccupation},
              <strong> Contact</strong>:{" "}
              {currentUser?.guardian?.motherContactNo}
            </p>
          </Descriptions.Item>
        )}

        {currentUser?.localGuardian && (
          <Descriptions.Item label="Local Guardian Info">
            <p>
              <strong>Name:</strong> {currentUser?.localGuardian?.name},
              <strong> Occupation:</strong>{" "}
              {currentUser?.localGuardian?.occupation},<strong> Contact</strong>
              : {currentUser?.localGuardian?.contactNo} <br />
              <strong> Address</strong>: {currentUser?.localGuardian?.address}
            </p>
          </Descriptions.Item>
        )}

        <Descriptions.Item label="Profile Created At">
          {currentUser?.createdAt &&
            new Date(currentUser?.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Profile Updated At">
          {currentUser?.updatedAt &&
            new Date(currentUser?.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default GetMe;
