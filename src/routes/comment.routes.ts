import { Router } from 'express';
import CommentController from '../controllers/comments.controller';
import AuthToken from '../middlewares/isAuthToken.middleware';
import { ValidationId } from '../middlewares/validationId.middleware';

const commentsRouter = Router();

commentsRouter.post(
  '/:announcement_id',
  ValidationId,
  AuthToken,
  CommentController.store
);
// announcementRouter.get('/', AnnouncementController.index);
// announcementRouter.patch('/:id', AnnouncementController.delete);

export default commentsRouter;
