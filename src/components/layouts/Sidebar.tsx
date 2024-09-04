import { Layout, Menu } from "antd";
import { FC } from "react";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { UserRole } from "../../types";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
const { Sider } = Layout;

interface IProps {}

const Sidebar: FC<IProps> = () => {
  const user = useAppSelector(selectCurrentUser);
  let sidebarItems;

  switch (user?.role) {
    case UserRole.admin:
      sidebarItems = sidebarItemsGenerator(adminPaths, UserRole.admin);
      break;
    case UserRole.faculty:
      sidebarItems = sidebarItemsGenerator(facultyPaths, UserRole.faculty);
      break;
    case UserRole.student:
      sidebarItems = sidebarItemsGenerator(studentPaths, UserRole.student);
      break;
    default:
      break;
  }

  return (
    <Sider
      style={{ position: "sticky", top: 0, left: 0, height: "100vh" }}
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
