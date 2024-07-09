import { NavLink } from "react-router-dom";
import { TUserItem, TUserPath } from "../types";

const sidebarItemsGenerator = (userPaths: TUserPath[], role: string) => {
  const result = userPaths.reduce((acc: TUserItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: `${item.name}`,
        children: item.children.map((child) => ({
          key: child.name,
          label: <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>,
        })),
      });
    }

    return acc;
  }, []);

  return result;
};

export default sidebarItemsGenerator;
