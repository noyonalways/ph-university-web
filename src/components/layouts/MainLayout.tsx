import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, MenuProps } from "antd";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";
import { useGetMeQuery } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import Sidebar from "./Sidebar";

const { Header, Content } = Layout;

/* const items: MenuProps["items"] = [
  {
    key: "Dashboard",
    label: "Dashboard",
  },
  {
    key: "User Management",
    label: "User Management",
    children: [
      {
        key: "Create Admin",
        label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
      },
      {
        key: "Create Faculty",
        label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
      },
      {
        key: "Create Student",
        label: <NavLink to="/admin/create-student">Create Student</NavLink>,
      },
    ],
  },
]; */

interface IProps {}

const MainLayout: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const { data: currentUser } = useGetMeQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
  });

  const items: MenuProps["items"] = [
    {
      label: <Link to={`/me`}>My Profile</Link>,
      key: "1",
      icon: <UserOutlined />,
    },
    {
      label: (
        <Button onClick={handleLogout} type="primary" danger>
          Logout
        </Button>
      ),
      key: "2",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout>
      <Sidebar />
      <Layout>
        <Header
          style={{
            padding: "0px 10px",
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button shape="circle" size="large" style={{ marginLeft: "auto" }}>
              <Avatar src={currentUser?.profileImage} size="large" />
            </Button>
          </Dropdown>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              height: "auto",
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
