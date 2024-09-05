import { useParams } from "react-router-dom";

interface IProps {}

const StudentDetails: React.FC<IProps> = () => {
  const params = useParams();

  console.log(params);

  return <h1>This is StudentDetails</h1>;
};

export default StudentDetails;
