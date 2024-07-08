import { Layout, Menu, MenuProps } from "antd";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: "Dashboard",
  },
  {
    key: "2",
    label: "User Management",
    children: [
      {
        key: "11",
        label: "Admin",
      },
      {
        key: "22",
        label: "Faculty",
      },
      {
        key: "33",
        label: "Student",
      },
    ],
  },
];

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
          <span style={{ color: "white", fontWeight: 700 }}>PH University</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
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
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
