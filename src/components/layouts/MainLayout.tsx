import { Layout, Menu } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";
import { adminPaths } from "../../routes/admin.routes";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";

const { Header, Content, Footer, Sider } = Layout;

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
  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0px",
          }}
        >
          <img
            style={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
            }}
            src="https://i.ibb.co/c64q254/noyon-logo-dark.png"
            alt="logo"
          />
          <span style={{ color: "white", fontWeight: 700, fontSize: "1.1rem" }}>
            PH University
          </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["Dashboard"]}
          items={sidebarItemsGenerator(adminPaths, "admin")}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          PH University ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
