import { Router } from 'express';
import { Express } from 'express';

import userRouter from './user.routes';
// import addressRouter from './address.routes';
import { sessionRouter } from './sessions.routes';
import announcementRouter from './announcement.routes';
import commentRouter from './comment.routes';
import imageRouter from './image.routes';
import addressRouter from './address.routes';

const routes = Router();

routes.use('/login', sessionRouter);
routes.use('/users', userRouter);
routes.use('/announcements', announcementRouter);
routes.use('/comments', commentRouter);
routes.use('/images', imageRouter);
routes.use('/address', addressRouter)

export default routes;
