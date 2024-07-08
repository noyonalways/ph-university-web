import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashboard from "../pages/admin/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
    ],
  },
]);

export default router;
