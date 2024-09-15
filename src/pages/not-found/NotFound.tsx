import { Button, Col, Result, Row } from "antd";
import { Link } from "react-router-dom";

interface IProps {}

const NotFound: React.FC<IProps> = () => {
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col>
        <Result
          status="404"
          title="404 - Not Found"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button type="primary">
              <Link to="/">Back Home</Link>
            </Button>
          }
        />
      </Col>
    </Row>
  );
};

export default NotFound;
