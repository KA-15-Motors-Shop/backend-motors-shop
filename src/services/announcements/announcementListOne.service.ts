import { AppDataSource } from '../../data-source';
import { AppError } from '../../errors/AppError';
import Comment from '../../models/Comment';
import Announcement from '../../models/Announcement';
import { formatedResponse } from '../../utils/formatedResponse';

const announcementListOneService = async (id: string) => {
  const vehicleRepository = AppDataSource.getRepository(Announcement);
  const commentsRepository = AppDataSource.getRepository(Comment);

  const comments = await commentsRepository.find({
    relations: ['user', 'announcement'],
  });

  const announcement = await vehicleRepository.findOne({
    where: { id },
    relations: ['user', 'comments'],
  });

  if (!announcement) throw new AppError('Vehicle not found', 404);

  return formatedResponse({ announcement, comments });
};

export default announcementListOneService;
