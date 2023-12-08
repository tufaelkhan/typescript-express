import { Request, Response, NextFunction } from 'express';
import { UserService } from "./user.service";

const createStudent = async (req: Request, res: Response, next:NextFunction) => {
    try {
      // create validation schema
      const { password, student: studentData } = req.body;
    //   const zodParseData = studentValidationSchema.parse(studentData);
      const result = await UserService.createStudentIntoDB(password, studentData);
      res.status(200).json({
        success: true,
        message: 'student is created successfully',
        data: result,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error) {
      next(error)
    }
  };


export const UserControllers = {
  createStudent
}
  