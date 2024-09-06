import {
  Avatar,
  Button,
  Col,
  Pagination,
  Row,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetFacultiesQuery } from "../../../redux/features/admin";
import { TQueryParam, TStudent } from "../../../types";

type TTableData = Pick<
  TStudent,
  "fullName" | "id" | "email" | "contactNo" | "profileImage"
>;

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
    title: "ID No",
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
          <Link to={`/admin/faculties/${item?.key}`}>
            <Button>Details</Button>
          </Link>
          <Button>Update</Button>
          <Button>Block</Button>
        </Space>
      );
    },
    width: "1%",
  },
];

interface IProps {}

const Faculties: React.FC<IProps> = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);

  const { data: studentsData, isFetching } = useGetFacultiesQuery([
    { name: "page", value: page },
    ...params,
  ]);

  const metaData = studentsData?.meta;

  const tableData = studentsData?.data?.map(
    ({
      _id,
      fullName,
      id,
      email,
      profileImage,
      academicDepartment: { name },
      user: { status },
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

export default Faculties;
