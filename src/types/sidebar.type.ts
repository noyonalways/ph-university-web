export type TUserPath = {
  name?: string;
  path?: string;
  element?: React.ReactNode;
  children?: TUserPath[];
};

export type TRoute = {
  path: string;
  element: React.ReactNode;
};

export type TUserItem =
  | {
      key?: string;
      label: React.ReactNode;
      children?: TUserItem[];
    }
  | undefined;

export const UserRole = {
  admin: "admin",
  faculty: "faculty",
  student: "student",
};
