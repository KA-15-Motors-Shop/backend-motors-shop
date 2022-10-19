import { AppDataSource } from '../../data-source';
import Announcement from '../../models/Announcement';
// import { AppError } from '../../errors/AppError';
import { formatedResponse } from '../../utils/formatedResponse';
import Comment from '../../models/Comment';

export const listAnnouncementService = async () => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const commentsRepository = AppDataSource.getRepository(Comment);

  const comments = await commentsRepository.find({
    relations: ['user', 'announcement'],
  });

  const announcements = await announcementRepository.find({
    relations: ['user', 'comments'],
  });

  const availableAnnouncements = announcements.filter(
    ({ is_published }) => is_published
  );

  const formatedVechiles = availableAnnouncements.map((announcement) =>
    formatedResponse({ announcement, comments })
  );

  return formatedVechiles;
};
