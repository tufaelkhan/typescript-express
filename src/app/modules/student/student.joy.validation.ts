import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
        .max(20)
        .trim()
        .required()
        .regex(/^[A-Za-z]+$/, { name: 'alpha' })
        .message('First name must be alphabetic characters only'),

    middleName: Joi.string().trim(),

    lastName: Joi.string()
        .trim()
        .required()
        .regex(/^[A-Za-z]+$/, { name: 'alpha' })
        .message('Last name must be alphabetic characters only'),
});

// Define the Joi schema for Guardian
const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().trim().required(),
    fatherOccupation: Joi.string().trim(),
    fatherContactNo: Joi.string().trim().required(),

    motherName: Joi.string().trim().required(),
    motherOccupation: Joi.string().trim(),
    motherContactNo: Joi.string().trim().required(),
});

// Define the Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
    name: Joi.string().trim().required(),
    occupation: Joi.string().trim().required(),
    contactNo: Joi.string().trim().required(),
    address: Joi.string().trim().required(),
});

// Define the Joi schema for BloodGroup
const bloodGroupValidationSchema = Joi.string().valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');

// Define the Joi schema for Student
const studentValidationSchema = Joi.object({
    id: Joi.string().trim().required(),
    name: userNameValidationSchema.required(),
    gender: Joi.string().valid('male', 'female', 'Other').trim().required(),
    dateOfBirth: Joi.string().trim(),
    email: Joi.string().email().trim().required(),
    contactNo: Joi.string().trim().required(),
    emergencyContactNo: Joi.string().trim().required(),
    bloodGroup: bloodGroupValidationSchema,
    presentAddress: Joi.string().trim().required(),
    permanentAddress: Joi.string().trim().required(),
    guardian: guardianValidationSchema.required(),
    localGuardian: localGuardianValidationSchema.required(),
    profileImag: Joi.string().trim(),
    isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema
