import { Layout, Menu } from "antd";
import { FC } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
const { Sider } = Layout;

interface IProps {}

export const userRole = {
  admin: "admin",
  faculty: "faculty",
  student: "student",
};

const Sidebar: FC<IProps> = () => {
  const { user } = useAppSelector(useCurrentUser);

  const role: keyof typeof userRole = user?.role;
  let sidebarItems = null;

  switch (role) {
    case userRole.admin:
      sidebarItems = sidebarItemsGenerator(adminPaths, "admin");
      break;
    case userRole.faculty:
      sidebarItems = sidebarItemsGenerator(facultyPaths, "faculty");
      break;
    case userRole.student:
      sidebarItems = sidebarItemsGenerator(studentPaths, "student");
      break;
    default:
      sidebarItems = sidebarItemsGenerator(adminPaths, "admin");
  }

  return (
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
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
