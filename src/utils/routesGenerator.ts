import { TRoute, TUserPath } from "../types";

const routesGenerator = (userPaths: TUserPath[]) => {
  const routes = userPaths.reduce((acc: TRoute[], item) => {
    if (item.name && item.path) {
      acc.push({ path: item.path, element: item.element });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({ path: child.path!, element: child.element });
      });
    }
    return acc;
  }, []);

  return routes;
};

export default routesGenerator;
