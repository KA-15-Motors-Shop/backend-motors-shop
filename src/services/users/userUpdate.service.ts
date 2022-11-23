import { hash } from 'bcrypt';
import { AppDataSource } from '../../data-source';
import AppError from '../../errors/AppError';
import { IUserUpdate } from '../../interfaces/users';
import { User } from '../../models/User';

const updateUserService = async (id: string, data: IUserUpdate) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id } });

  // if (!user) throw new AppError('User not found.', 404);

  const checkEmailExists = await userRepository.findOne({
    where: { email: data.email },
  });

  // if (checkEmailExists && checkEmailExists.id != user.id)
  //   throw new AppError('E-mail already in use.', 401);

  if (data.password) {
    data.password = await hash(data.password, 8);
  }

  const userUpdated = await userRepository.save({
    ...data,
    id,
  });

  const { password, ...updatedUserWithoutPassword } = userUpdated;

  return updatedUserWithoutPassword;
};

export default updateUserService;
