import { Router } from 'express';
import AnnouncementController from '../controllers/Announcement.controller';
import CheckValidUuidMiddleware from '../middlewares/checkValidUuid.middleware';
import AuthToken from '../middlewares/isAuthToken.middleware';
import IsOwner from '../middlewares/isOwnerOfVehicle.middleware';
import { ValidationId } from '../middlewares/validationId.middleware';

const announcementRouter = Router();

announcementRouter.post(
  '',
  // CheckValidUuidMiddleware,
  AuthToken,
  AnnouncementController.store
);
announcementRouter.get('', AnnouncementController.index);
announcementRouter.get(
  '/:id',
  // CheckValidUuidMiddleware,
  ValidationId,
  AnnouncementController.listByUser
);
announcementRouter.patch('/:id', AnnouncementController.update);
announcementRouter.delete(
  '/:id',
  CheckValidUuidMiddleware,
  AuthToken,
  IsOwner,
  AnnouncementController.delete
);

export default announcementRouter;
