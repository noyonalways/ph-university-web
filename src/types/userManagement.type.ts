export type TStudent = {
  _id: string;
  id: string;
  user: User;
  name: Name;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage: string;
  admissionSemester: AdmissionSemester;
  academicDepartment: AcademicDepartment;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

export type TStatus = "in-progress" | "blocked";

export interface User {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: string;
  status: TStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Name {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export interface Guardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
}

export interface LocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
}

export interface AdmissionSemester {
  _id: string;
  name: string;
  code: string;
  year: string;
  startMonth: string;
  endMonth: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AcademicDepartment {
  _id: string;
  name: string;
  academicFaculty: AcademicFaculty;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AcademicFaculty {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
