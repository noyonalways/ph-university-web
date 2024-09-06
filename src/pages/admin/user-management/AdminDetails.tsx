import { Card, Descriptions, Image } from "antd";
import { useParams } from "react-router-dom";
import { useGetSingleAdminQuery } from "../../../redux/features/admin";

interface IProps {}

const AdminDetails: React.FC<IProps> = () => {
  const params = useParams();
  const { data: admin, isLoading } = useGetSingleAdminQuery(params.adminId);

  return (
    <Card
      loading={isLoading}
      title={admin?.fullName}
      extra={
        admin?.profileImage ? (
          <Image
            loading="lazy"
            width={100}
            height={100}
            src={admin?.profileImage}
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
            {admin?.fullName?.split("")[0]}
          </span>
        )
      }
    >
      <Descriptions bordered column={2}>
        <Descriptions.Item label="Admin ID">{admin?.id}</Descriptions.Item>
        <Descriptions.Item label="Full Name">
          {`${admin?.name?.firstName} ${admin?.name?.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Email">{admin?.email}</Descriptions.Item>
        <Descriptions.Item label="Status">
          {(admin?.user?.status === "in-progress" && "Active") ||
            (admin?.user?.status === "blocked" && "Blocked")}
        </Descriptions.Item>
        <Descriptions.Item label="Role">
          {(admin?.user?.role === "student" && "Student") ||
            (admin?.user?.role === "faculty" && "Faculty") ||
            (admin?.user?.role === "admin" && "Admin")}
        </Descriptions.Item>
        <Descriptions.Item label="Designation">
          {admin?.designation}
        </Descriptions.Item>
        <Descriptions.Item label="Contact Number">
          {admin?.contactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Emergency Contact">
          {admin?.emergencyContactNo}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {(admin?.gender === "male" && "Male") ||
            admin?.gender === "female" ||
            (admin?.gender === "other" && "Other")}
        </Descriptions.Item>
        <Descriptions.Item label="Blood Group">
          {admin?.bloodGroup}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {admin?.dateOfBirth &&
            new Date(admin.dateOfBirth)?.toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Present Address">
          {admin?.presentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Permanent Address">
          {admin?.permanentAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Profile Created At">
          {admin?.createdAt && new Date(admin?.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Profile Updated At">
          {admin?.updatedAt && new Date(admin?.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default AdminDetails;
