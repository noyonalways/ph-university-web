const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "<AdminDashboard />",
  },
  {
    name: "User Management",

    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: "<CreateAdmin />",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "<CreateFaculty />",
      },
      {
        name: "Create Student",
        path: "create-student",
        element: "<CreateStudent />",
      },
    ],
  },
];

const adminRoutes = adminPaths.reduce((acc, item) => {
  if (item.name && item.path) {
    acc.push({ path: item.path, element: item.element });
  }

  if (item.children) {
    item.children.forEach((child) => {
      acc.push({ path: child.path, element: child.element });
    });
  }
  return acc;
}, []);

const adminItems = adminPaths.reduce((acc, item) => {
  if (item.path && item.name) {
    acc.push({
      key: item.name,
      label: `<NavLink to=${item.path}>${item.name}</NavLink>`,
    });
  }

  if (item.children) {
    acc.push({
      key: item.name,
      label: `${item.name}`,
      children: item.children.map((child) => ({
        key: child.name,
        label: `<NavLink to=${child.path}>${child.path}</NavLink>`,
      })),
    });
  }

  return acc;
}, []);

console.log(JSON.stringify(adminItems));
