import { LoadingOutlined } from "@ant-design/icons";
import { Button, Col, FormProps, Row, Spin } from "antd";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../../components/forms/ph-from";
import PHInput from "../../components/forms/ph-input";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils";

type FieldType = {
  userId?: string;
  password?: string;
  remember?: string;
};

const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [login, { isLoading }] = useLoginMutation();
  const defaultValues = {
    userId: "A-0001",
    password: "admin1234",
  };

  const onSubmit: FormProps<FieldType>["onFinish"] = async (values) => {
    const toastId = toast.loading("Logging in...", {
      style: { padding: 20 },
      duration: 2000,
      position: "top-right",
    });

    try {
      const userInfo = {
        id: values.userId,
        password: values.password,
      };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as unknown as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login successful", {
        id: toastId,
        style: { padding: 20 },
        duration: 2000,
        position: "top-right",
      });

      const from =
        location.state?.from?.pathname === "/"
          ? `/${user.role}/dashboard`
          : location.state?.from?.pathname;

      navigate(from, { replace: true });
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMessage = (err as any)?.data?.message || "An Error Occurred";
      toast.error(errorMessage, {
        id: toastId,
        style: { padding: 20 },
        duration: 2000,
        position: "top-right",
      });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      {isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
      ) : (
        <Col
          xs={{ span: 22 }}
          md={{ span: 4 }}
          style={{
            padding: "15px",
            background: "#f0f2f5",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Login User
          </h3>
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <PHInput type="text" name="userId" label="User Id" />
            <PHInput type="password" name="password" label="Password" />
            <Button htmlType="submit" type="primary" block>
              Login
            </Button>
          </PHForm>
        </Col>
      )}
    </Row>
  );
};

export default Login;
