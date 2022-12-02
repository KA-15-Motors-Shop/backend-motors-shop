import { IVehicleCreate } from '../../interfaces/index';
import Announcement from '../../models/Announcement';
import { AppDataSource } from '../../data-source';
import { User } from '../../models/User';
import  AppError from '../../errors/AppError';
import Comment from '../../models/Comment';

// interface Icomments {
//   id: string;
//   text: string;
//   created_at: Date;
//   updated_at: Date;
// }

export const CreateAnnouncementService = async ({
  type_of_ad,
  title,
  year,
  km,
  price,
  description,
  type_of_vehicle,
  is_published = true,
  user_id,
}: IVehicleCreate) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const userRepository = AppDataSource.getRepository(User);
  const commentRepository = AppDataSource.getRepository(Comment);

  const user = await userRepository.findOne({ where: { id: user_id } });
  if (!user) throw new AppError('User not found', 404);

  console.log(user);

  const announcement = new Announcement();
  announcement.type_of_ad = type_of_ad;
  announcement.title = title;
  announcement.year = year;
  announcement.km = km;
  announcement.year = year;
  announcement.price = price;
  announcement.description = description;
  announcement.type_of_vehicle = type_of_vehicle;
  announcement.is_published = is_published;
  announcement.user = user;

  // const Newcomment = new Comment();
  // Newcomment.comment = comment;

  // commentRepository.create(Newcomment);
  // await commentRepository.save(Newcomment);

  // if (user) {
  //   announcement.user_id = user_id;
  // } else {
  //   throw new AppError('Usuário com essa ID não encontrado', 404);
  // }

  announcementRepository.create(announcement);
  await announcementRepository.save(announcement);

  return announcement;
};
