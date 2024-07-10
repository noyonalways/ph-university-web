import { Button, Form, FormProps, Input, Spin } from "antd";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
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
      const from = `/${user.role}/dashboard`;
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err?.data?.message, {
        id: toastId,
        style: { padding: 20 },
        duration: 2000,
        position: "top-right",
      });
    }
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
