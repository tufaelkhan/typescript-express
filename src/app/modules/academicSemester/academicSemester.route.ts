
import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
// import validateRequest from "../../middleWares/validateRequest";
// import { AcademicSemesterValidations } from "./academicSemester.validation";


const router = express.Router()

router.post('/create-academic-semester', 
 AcademicSemesterControllers.createAcademicSemester)

export const AcademicSemesterRoute = router;
