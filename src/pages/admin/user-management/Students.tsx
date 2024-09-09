import { ExclamationCircleFilled } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Modal,
  Pagination,
  Row,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useChangeUserStatusMutation,
  useGetStudentsQuery,
} from "../../../redux/features/admin";
import { TQueryParam, TResponse, TStudent, TUserRoles } from "../../../types";

const { confirm } = Modal;

type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo" | "profileImage"
>;

interface IProps {}

const Students: React.FC<IProps> = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentsData, isFetching } = useGetStudentsQuery([
    { name: "page", value: page },
    ...params,
  ]);

  const [changeUserStatus] = useChangeUserStatusMutation();

  const showDeleteConfirm = (user: {
    key: string;
    userId: string;
    id: string;
    email: string;
    needsPasswordChange: boolean;
    role: TUserRoles;
    status: "Blocked" | "Active";
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }) => {
    confirm({
      title:
        user?.status === "Blocked"
          ? "Do you want to unblock this user?"
          : "Do you want to block this user?",
      icon: <ExclamationCircleFilled />,
      content:
        user?.status === "Blocked"
          ? "This user will be unblocked."
          : "This user will be blocked.",
      okText: "Yes",
      okType: "danger",
      closable: true,
      cancelText: "No",
      async onOk() {
        const toastId = toast.loading("Updating...", {
          position: "top-right",
          style: { padding: 20 },
        });

        const status = user?.status === "Blocked" ? "in-progress" : "blocked";
        try {
          const res = (await changeUserStatus({
            userId: user?.userId,
            data: { status },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          })) as TResponse<any>;

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
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Profile Image",
      key: "item",
      render: (item) => {
        return (
          <>
            {item.profileImage ? (
              <Avatar size="large" src={item?.profileImage} />
            ) : (
              <Avatar size="large" style={{ backgroundColor: "#1677ff" }}>
                {item.fullName[0]}
              </Avatar>
            )}
          </>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Roll No",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      key: "contactNo",
      dataIndex: "contactNo",
    },
    {
      title: "Department",
      key: "academicDepartment",
      dataIndex: "academicDepartment",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Space>
            <Link to={`/admin/students/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>Update</Button>
            <Button onClick={() => showDeleteConfirm(item)}>
              {item?.status === "Blocked" ? "Unblock" : "Block"}
            </Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const metaData = studentsData?.meta;

  const tableData = studentsData?.data?.map(
    ({
      _id,
      fullName,
      id,
      email,
      profileImage,
      academicDepartment: { name },
      user: { status, _id: userId },
      contactNo,
    }) => ({
      key: _id,
      fullName,
      email,
      id,
      contactNo,
      profileImage,
      academicDepartment: name,
      status:
        (status === "in-progress" && "Active") ||
        (status === "blocked" && "Blocked"),
      userId,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    _filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      // filters.status?.forEach((item) =>
      //   queryParams.push({ name: "user.status", value: item })
      // );

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
      <Row justify="end">
        <Col>
          <Pagination
            style={{
              marginRight: "auto",
              display: "inline-flex",
              marginTop: "10px",
            }}
            onChange={(value) => setPage(value)}
            pageSize={metaData?.limit}
            total={metaData?.total}
          />
        </Col>
      </Row>
    </>
  );
};

export default Students;
