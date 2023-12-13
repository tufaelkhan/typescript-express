import { UserService } from "./user.service";
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';


const createStudent = catchAsync(async(
  req,
   res) => {
      // create validation schema
      const { password, student: studentData } = req.body;
    //   const zodParseData = studentValidationSchema.parse(studentData);
      const result = await UserService.createStudentIntoDB(password, studentData);
      // res.status(200).json({
      //   success: true,
      //   message: 'student is created successfully',
      //   data: result,
      // });
      
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'user created successfully',
        data: result
      })
  });


export const UserControllers = {
  createStudent
}
  