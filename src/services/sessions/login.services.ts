import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppDataSource } from '../../data-source';
import AppError from '../../errors/AppError';
import { User } from '../../models/User';
import { LoginProps } from '../../interfaces/sessions/';

export const loginService = async (data: LoginProps) => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { email: data.email } });

  if (!user) throw new AppError('Invalid credentials', 400);

  const passwordMatch = await compare(data.password, user.password);

  if (!passwordMatch) throw new AppError('Invalid credentials', 400);

  const token = sign({ userId: user.id }, 'SECRET_KEY', {
    expiresIn: '3d',
  });

  return { userId: user.id, token };
};
