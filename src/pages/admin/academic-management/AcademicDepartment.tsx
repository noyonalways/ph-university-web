import { Col, Row, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicDepartmentsQuery } from "../../../redux/features/admin";
import { TAcademicDepartment } from "../../../types";

type TTableData = Pick<TAcademicDepartment, "name">;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
  },
  {
    title: "Academic Faculty",
    dataIndex: "academicFaculty",
  },
];

interface IProps {}

const AcademicDepartment: React.FC<IProps> = () => {
  const { data: academicDepartmentData, isFetching } =
    useGetAcademicDepartmentsQuery(undefined);

  const tableData = academicDepartmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log("params", filters, extra);
  };

  return (
    <Row justify="center" align="middle">
      <Col span={24} md={{ span: 12 }}>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={tableData}
          onChange={onChange}
          showSorterTooltip={{ target: "sorter-icon" }}
        />
      </Col>
    </Row>
  );
};

export default AcademicDepartment;
