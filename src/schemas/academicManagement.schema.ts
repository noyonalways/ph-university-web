import { z } from "zod";

export const createAcademicSemesterSchema = z.object({
  name: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Year" }),
  startMonth: z.string({ required_error: "Please select a Start Month" }),
  endMonth: z.string({ required_error: "Please select a End Month" }),
});

export const createAcademicFacultySchema = z.object({
  name: z.string({ required_error: "Please enter a Name" }),
});

export const createAcademicDepartmentSchema = z.object({
  name: z.string({ required_error: "Please enter a Name" }),
  academicFaculty: z.string({ required_error: "Please select a Faculty" }),
});
