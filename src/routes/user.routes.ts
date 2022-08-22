import { Router } from 'express';

import UserController from '../controllers/user.controller';
import verifyTokenAuthenticationMiddleware from '../middlewares/authToken.middleware';

const userRouter = Router();

userRouter.post('/', UserController.store);
userRouter.post('/login', UserController.login);
userRouter.get('/', verifyTokenAuthenticationMiddleware, UserController.show);
userRouter.get(
  '/:id',
  verifyTokenAuthenticationMiddleware,
  UserController.index
);
userRouter.patch(
  '/:id',
  verifyTokenAuthenticationMiddleware,
  UserController.update
);
userRouter.delete(
  '/:id',
  verifyTokenAuthenticationMiddleware,
  UserController.delete
);

export default userRouter;
