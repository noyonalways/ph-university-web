import { z } from "zod";

export const createStudentSchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
  name: z.object({
    firstName: z
      .string({
        required_error: "First Name is required",
      })
      .min(1, { message: "First Name must be at least 1 characters" }),
    middleName: z.string().optional(),
    lastName: z.string({
      required_error: "Last Name is required",
    }),
  }),
  gender: z.string({
    required_error: "Please select gender",
  }),
  dateOfBirth: z
    .object({ $d: z.date() }, { required_error: "Date of birth is required" })
    .transform((value) => {
      return new Date(value.$d).toISOString();
    }),
  email: z.string({
    required_error: "Email is required",
  }),
  contactNo: z.string({
    required_error: "Contact No is required",
  }),
  emergencyContactNo: z.string({
    required_error: "Emergency Contact No is required",
  }),
  bloodGroup: z.string({
    required_error: "Please select blood group",
  }),
  presentAddress: z.string({
    required_error: "Present Address is required",
  }),
  permanentAddress: z.string({
    required_error: "Permanent Address is required",
  }),
  image: z.any(),
  guardian: z.object({
    fatherName: z.string({
      required_error: "Father Name is required",
    }),
    fatherOccupation: z.string({
      required_error: "Father Occupation is required",
    }),
    fatherContactNo: z.string({
      required_error: "Father Contact No is required",
    }),
    motherName: z.string({
      required_error: "Mother Name is required",
    }),
    motherOccupation: z.string({
      required_error: "Mother Occupation is required",
    }),
    motherContactNo: z.string({
      required_error: "Mother Contact No is required",
    }),
  }),
  localGuardian: z.object({
    name: z.string({
      required_error: "Local Guardian Name is required",
    }),
    occupation: z.string({
      required_error: "Local Guardian Occupation is required",
    }),
    contactNo: z.string({
      required_error: "Local Guardian Contact No is required",
    }),
    address: z.string({
      required_error: "Local Guardian Address is required",
    }),
  }),
  admissionSemester: z.string({
    required_error: "Please select an admission semester",
  }),
  academicDepartment: z.string({
    required_error: "Please select an academic department",
  }),
});

export const createFacultySchema = z.object({
  password: z
    .string({
      invalid_type_error: "Password must be string",
    })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
  name: z.object({
    firstName: z
      .string({
        required_error: "First Name is required",
      })
      .min(1, { message: "First Name must be at least 1 characters" }),
    middleName: z.string().optional(),
    lastName: z.string({
      required_error: "Last Name is required",
    }),
  }),
  gender: z.string({
    required_error: "Please select gender",
  }),
  dateOfBirth: z
    .object({ $d: z.date() }, { required_error: "Date of birth is required" })
    .transform((value) => {
      return new Date(value.$d).toISOString();
    }),
  email: z.string({
    required_error: "Email is required",
  }),
  contactNo: z.string({
    required_error: "Contact No is required",
  }),
  emergencyContactNo: z.string({
    required_error: "Emergency Contact No is required",
  }),
  bloodGroup: z.string({
    required_error: "Please select blood group",
  }),
  presentAddress: z.string({
    required_error: "Present Address is required",
  }),
  permanentAddress: z.string({
    required_error: "Permanent Address is required",
  }),
  image: z.any(),
  designation: z.string({
    required_error: "Designation is required",
  }),
  academicDepartment: z.string({
    required_error: "Please select an academic department",
  }),
});
