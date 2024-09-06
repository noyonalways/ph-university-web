import {
  TAcademicDepartment,
  TAcademicSemester,
} from "./academicManagement.type";

export type TStatus = "in-progress" | "blocked";
export type TUserRoles = "admin" | "faculty" | "student";
export type TGender = "male" | "female" | "other";

export interface User {
  _id: string;
  id: string;
  email: string;
  needsPasswordChange: boolean;
  role: TUserRoles;
  status: TStatus;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IName {
  firstName: string;
  middleName: string;
  lastName: string;
  _id: string;
}

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
  _id: string;
}

export interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
  _id: string;
}

export type TStudent = {
  _id: string;
  id: string;
  user: User;
  name: IName;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian: ILocalGuardian;
  profileImage: string;
  admissionSemester: TAcademicSemester;
  academicDepartment: TAcademicDepartment;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

export type TFaculty = {
  _id: string;
  id: string;
  designation: string;
  name: IName;
  user: User;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  academicDepartment: TAcademicDepartment;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};

export type TAdmin = {
  _id: string;
  id: string;
  user: User;
  designation: string;
  name: IName;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  fullName: string;
};
