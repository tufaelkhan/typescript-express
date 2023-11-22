import { TStudent } from './student.interface';
import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.joy.validation';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // create validation schema

    const { student: studentData } = req.body;

    // data validation using joy
    // const {error, value} = studentValidationSchema.validate(studentData);
    // const result = await StudentServices.createStudentIntoDB(value);
    // console.log(error, value);

    // data validation using zod
    const zodParseData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParseData);

    // using joi
    // if(error){
    //   res.send(500).json({
    //     success: false,
    //     message: 'something is wrong',
    //     error: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something is wrong',
      err: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something is wrong',
      err: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'students is retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something is wrong',
      err: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'students is deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something is wrong',
      err: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
