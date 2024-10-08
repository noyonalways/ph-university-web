import { Col, Row, Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin";
import { TAcademicFaculty } from "../../../types";

type TTableData = Pick<TAcademicFaculty, "name">;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
  },
];

interface IProps {}

const AcademicFaculty: React.FC<IProps> = () => {
  const { data: academicFacultiesData, isFetching } =
    useGetAcademicFacultiesQuery(undefined);

  const tableData = academicFacultiesData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

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

export default AcademicFaculty;
