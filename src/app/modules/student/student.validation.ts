import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z
      .string()
      .max(20)
      .refine((value) => value === value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(), {
        message: 'First name is not in capitalize format',
      }),
    middleName: z.string().optional(),
    lastName: z.string().max(20)
  });
  
  // Define the Zod schema for Guardian
  const guardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string(),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().optional(),
    motherContactNo: z.string().min(1),
  });
  
  // Define the Zod schema for LocalGuardian
  const localGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1),
  });
  
  // Define the Zod schema for Student
  const studentValidationSchema = z.object({
    id: z.string().min(1),
    name: userNameValidationSchema,
    gender: z.enum(['male', 'female', 'Other']),
    dateOfBirth: z.string(),
    email: z.string().email(),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']).optional(),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImag: z.string().optional(),
    isActive: z.enum(['active', 'blocked']).default('active'),
  });

  export default studentValidationSchema