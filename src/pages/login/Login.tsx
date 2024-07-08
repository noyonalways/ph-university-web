import { Button, Form, FormProps, Input, Spin } from "antd";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { verifyToken } from "../../utils";

type FieldType = {
  userId?: string;
  password?: string;
  remember?: string;
};

const Login: FC = () => {
  const [login, { isLoading, error, isError }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (isError) {
    console.log("error", error);
  }

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Submit:", values);

    const userInfo = {
      id: values.userId,
      password: values.password,
    };

    const res = await login(userInfo).unwrap();

    const user = verifyToken(res.data.accessToken);

    dispatch(setUser({ user: user, token: res.data.accessToken }));
    navigate(from, { replace: true });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (error) => {
    console.log(error);
  };

  return (
    <div
      style={{
        display: "flex",

        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {isLoading ? (
        <Spin />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{
            maxWidth: 600,
            backgroundColor: "#f1f1f1",
            padding: 20,
            borderRadius: 10,
          }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="User Id"
            name="userId"
            rules={[{ required: true, message: "Please input your user id!" }]}
          >
            <Input value={"A-0001"} />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          {/* <Form.Item<FieldType>
      name="remember"
      valuePropName="checked"
      wrapperCol={{ offset: 8, span: 16 }}
    >
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Login;
