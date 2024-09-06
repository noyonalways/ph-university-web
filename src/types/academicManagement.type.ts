export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemesterNames = "Autumn" | "Summer" | "Fall";
export type TAcademicSemesterCodes = "01" | "02" | "03";

export type TAcademicSemester = {
  _id: string;
  name: TAcademicSemesterNames;
  code: TAcademicSemesterCodes;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

// academic faculty
export type TAcademicFaculty = {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// academic department
export type TAcademicDepartment = {
  _id: string;
  name: string;
  academicFaculty: TAcademicFaculty;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
