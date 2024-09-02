import { Table, TableColumnsType, TableProps } from "antd";
import { FC, useState } from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParam } from "../../../types";

type TTableData = Pick<
  TAcademicSemester,
  "name" | "year" | "startMonth" | "endMonth"
>;

const columns: TableColumnsType<TTableData> = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: { target: "full-header" },
    filters: [
      {
        text: "Autumn",
        value: "Autumn",
      },
      {
        text: "Summer",
        value: "Summer",
      },
      {
        text: "Fall",
        value: "Fall",
      },
    ],
  },
  {
    title: "Year",
    dataIndex: "year",
    filters: [
      {
        text: "2024",
        value: "2024",
      },
      {
        text: "2025",
        value: "2025",
      },
      {
        text: "2026",
        value: "2026",
      },
      {
        text: "2027",
        value: "2027",
      },
      {
        text: "2028",
        value: "2028",
      },
    ],
  },
  {
    title: "Start Month",
    dataIndex: "startMonth",
    filters: [
      {
        text: "January",
        value: "January",
      },
      {
        text: "February",
        value: "February",
      },
      {
        text: "March",
        value: "March",
      },
      {
        text: "April",
        value: "April",
      },
      {
        text: "May",
        value: "May",
      },
      {
        text: "June",
        value: "June",
      },
      {
        text: "July",
        value: "July",
      },
      {
        text: "August",
        value: "August",
      },
      {
        text: "September",
        value: "September",
      },
      {
        text: "October",
        value: "October",
      },
      {
        text: "November",
        value: "November",
      },
      {
        text: "December",
        value: "December",
      },
    ],
  },
  {
    title: "End Month",
    dataIndex: "endMonth",
    filters: [
      {
        text: "January",
        value: "January",
      },
      {
        text: "February",
        value: "February",
      },
      {
        text: "March",
        value: "March",
      },
      {
        text: "April",
        value: "April",
      },
      {
        text: "May",
        value: "May",
      },
      {
        text: "June",
        value: "June",
      },
      {
        text: "July",
        value: "July",
      },
      {
        text: "August",
        value: "August",
      },
      {
        text: "September",
        value: "September",
      },
      {
        text: "October",
        value: "October",
      },
      {
        text: "November",
        value: "November",
      },
      {
        text: "December",
        value: "December",
      },
    ],
  },
];

interface IProps {}

const AcademicSemester: FC<IProps> = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      filters.startMonth?.forEach((item) =>
        queryParams.push({ name: "startMonth", value: item })
      );
      filters.endMonth?.forEach((item) =>
        queryParams.push({ name: "endMonth", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: "sorter-icon" }}
    />
  );
};

export default AcademicSemester;
