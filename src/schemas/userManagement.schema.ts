import { z } from "zod";

export const createStudentSchema = z.object({
  password: z.string(),
  student: z.object({
    name: z.object({
      firstName: z.string(),
      middleName: z.string(),
      lastName: z.string(),
    }),
    gender: z.string(),
    dateOfBirth: z.string(),
    email: z.string(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: z.object({
      fatherName: z.string(),
      fatherOccupation: z.string(),
      fatherContactNo: z.string(),
      motherName: z.string(),
      motherOccupation: z.string(),
      motherContactNo: z.string(),
    }),
    localGuardian: z.object({
      name: z.string(),
      occupation: z.string(),
      contactNo: z.string(),
      address: z.string(),
    }),
    admissionSemester: z.string(),
    academicDepartment: z.string(),
  }),
});
