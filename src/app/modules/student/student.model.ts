import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  TUserName,
  StudentModel,
} from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    maxlength: [20, 'First name can not be more then 20 character'],
    trim: true,
    required: [true, 'first name is required'],
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(); //Tufael
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'last name is required'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'father name is required'],
    trim: true,
  },
  fatherOccupation: { type: String, trim: true },
  fatherContactNo: {
    type: String,
    required: [true, 'father contact number is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'mother name is required'],
    trim: true,
  },
  motherOccupation: { type: String, trim: true },
  motherContactNo: {
    type: String,
    required: [true, 'mother contact number is required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'local guardian name is required'],
    trim: true,
  },
  occupation: { type: String, required: true, trim: true },
  contactNo: {
    type: String,
    required: [true, 'local guardian contact number is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'local address is required'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: [true, "user id must given"],
    unique: true,
    ref: 'User'
  },
  name: {
    type: userNameSchema,
    trim: true,
    required: [true, 'Student name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'Other'],
      message: '{VALUE} is not valid',
    },
    trim: true,
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: Date, trim: true },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  contactNo: {
    type: String,
    trim: true,
    required: [true, 'Contact number is required'],
  },
  emergencyContactNo: {
    type: String,
    trim: true,
    required: [true, 'Emergency contact number is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message: 'Select one blood group',
    },
  },
  presentAddress: {
    type: String,
    trim: true,
    required: [true, 'Present address is required'],
  },
  permanentAddress: {
    type: String,
    trim: true,
    required: [true, 'Permanent address is required'],
  },
  guardian: {
    type: guardianSchema,
    trim: true,
    required: [true, 'Guardian information is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    trim: true,
    required: [true, 'Local guardian information is required'],
  },
  profileImag: { type: String, trim: true },
  admissionSemester: { type: Schema.Types.ObjectId,
  ref: 'AcademicSemester'
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  toJSON: {
    virtuals: true
  }
});

// virtual
studentSchema.virtual('fullName').get(function(){
  return (
    `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`
  )
})


// pre save middleware or hook
// will work on create() save()

// query middleware implement
studentSchema.pre('find', async function (next) {
  this.find({isDeleted: {$ne: true}})
  next()
})


studentSchema.pre('aggregate', async function (next) {
  // this.find({isDeleted: {$ne: true}})
  this.pipeline().unshift({$match: {isDeleted: {$ne: true}}})
  next()
})


// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({id})
  return existingUser;
}


// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };



// model
export const Student = model<TStudent, StudentModel>(
  'Student',
  studentSchema,
);
