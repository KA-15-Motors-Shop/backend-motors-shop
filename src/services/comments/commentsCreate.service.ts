import { Icomments, IVehicleCreate } from '../../interfaces/index';
import Announcement from '../../models/Announcement';
import { AppDataSource } from '../../data-source';
import { User } from '../../models/User';
import AppError from '../../errors/AppError';
import Comment from '../../models/Comment';
import { formatedCommentResponse } from '../../utils/formatedCommentResponse';
import { CreateComment } from '../../interfaces/comments/index';

export const CreateCommentService = async (
  data: CreateComment,
  owner: string,
  announcement_id: string
) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const userRepository = AppDataSource.getRepository(User);
  const commentRepository = AppDataSource.getRepository(Comment);

  const user = await userRepository.findOne({ where: { id: owner } });

  if (!user) throw new AppError('User not found', 404);

  const anno = await announcementRepository.findOne({
    where: { id: announcement_id },
  });

  if (!anno) throw new AppError('Vehicle not found', 404);

  const comment = new Comment();
  comment.text = data.text;
  comment.user = user;
  comment.announcement = anno;

  commentRepository.create(comment);
  await commentRepository.save(comment);

  return formatedCommentResponse({ comment });
};
