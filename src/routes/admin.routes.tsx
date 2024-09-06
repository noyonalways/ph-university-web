import {
  AcademicDepartment,
  AcademicFaculty,
  AcademicSemester,
  CreateAcademicDepartment,
  CreateAcademicFaculty,
  CreateAcademicSemester,
} from "../pages/admin/academic-management";
import AdminDashboard from "../pages/admin/AdminDashboard";
import {
  AdminDetails,
  Admins,
  CreateAdmin,
  CreateFaculty,
  CreateStudent,
  Faculties,
  FacultyDetails,
  StudentDetails,
  Students,
} from "../pages/admin/user-management";

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Students",
        path: "students",
        element: <Students />,
      },
      {
        path: "students/:studentId",
        element: <StudentDetails />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Faculties",
        path: "faculties",
        element: <Faculties />,
      },
      {
        path: "faculties/:facultyId",
        element: <FacultyDetails />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Admins",
        path: "admins",
        element: <Admins />,
      },
      {
        path: "admins/:adminId",
        element: <AdminDetails />,
      },
    ],
  },
];
