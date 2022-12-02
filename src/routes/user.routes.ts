import { Router } from 'express';

import UserController from '../controllers/user.controller';
import CheckValidUuidMiddleware from '../middlewares/checkValidUuid.middleware';

const userRouter = Router();

userRouter.post('/', UserController.store);
userRouter.get('/', UserController.show);
userRouter.get('/:user_id', CheckValidUuidMiddleware, UserController.index);
userRouter.patch('/:user_id', CheckValidUuidMiddleware, UserController.update);
userRouter.delete('/:user_id', CheckValidUuidMiddleware, UserController.delete);

export default userRouter;
