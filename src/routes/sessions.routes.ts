import { Router } from 'express';
// import { expressYupMiddleware } from 'express-yup-middleware';
import SessionsController from '../controllers/sessions/sessions.controller';
// import { loginSchema } from "../schemas/login.schema";

export const sessionRouter = Router();

sessionRouter.post(
  '',
  // expressYupMiddleware({ schemaValidator: loginSchema }),
  SessionsController.login
);
