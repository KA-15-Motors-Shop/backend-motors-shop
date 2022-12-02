import { AppDataSource } from '../../data-source';
import AppError from '../../errors/AppError';
import { User } from '../../models/User';

export default class UserDeleteService {
  async execute(id: string) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: id });

    if (user === null) {
      throw new AppError('user not found', 400)
    }

    const userDelete = await userRepository.delete({ id: id });
  }
}
