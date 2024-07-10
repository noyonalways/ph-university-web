import { FC } from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/academic-semester/academicSemesterApi";

interface IProps {}

const AcademicSemester: FC<IProps> = () => {
  const { data, error } = useGetAllSemestersQuery(undefined);

  console.log(data);
  console.log(error);

  return <h1>This is Academic Semester</h1>;
};

export default AcademicSemester;
