/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleWares/global.errorHandler';
import notFound from './app/middleWares/notFound';
import router from './app/routes';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const testPurpose = (req: Request, res: Response) => {
  res.send('ph university welcome');
};

app.get('/', testPurpose);

app.use(globalErrorHandler)

// not found
app.use(notFound)

export default app;
// console.log(process.cwd());
// C:\typescript\first-project/.env
