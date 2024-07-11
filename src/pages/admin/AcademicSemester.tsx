import { Card, Col, Row } from "antd";
import { FC } from "react";
import { toast } from "sonner";
import { useGetAllSemestersQuery } from "../../redux/features/academic-semester/academicSemesterApi";

interface IProps {}
type Semester = {
  name: string;
  code: string;
  startMonth: string;
  endMonth: string;
  year: string;
};

const AcademicSemester: FC<IProps> = () => {
  const { data, error, isSuccess } = useGetAllSemestersQuery(undefined);

  console.log(data);
  console.log(error);

  if (isSuccess) {
    console.log(data?.message);
    toast.success(data?.message, {
      id: "semester-success",
      style: { padding: 20 },
      duration: 2000,
      position: "top-right",
    });
  }

  return (
    <div>
      <h1 style={{ marginBottom: "10px" }}>All Semesters</h1>
      <Row>
        {data?.data?.map((semester: Semester) => (
          <Col xs={{ span: 24 }} md={{ span: 5 }}>
            <Card
              title={semester.name}
              bordered={false}
              bodyStyle={{
                display: "flex",
                flexDirection: "column",
                rowGap: "10px",
              }}
            >
              <p>
                <span style={{ fontWeight: "bold" }}>Code: </span>
                {semester.code}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Month: </span>
                {semester.startMonth} - {semester.endMonth}
              </p>
              <p>
                <span style={{ fontWeight: "bold" }}>Year: </span>
                {semester.year}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default AcademicSemester;
