import { NextFunction, Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import AppError  from '../errors/AppError';
import { User } from '../models/User';
import Announcement from '../models/Announcement';

const IsOwner = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.user;
  const { id } = req.params;

  const userRepository = AppDataSource.getRepository(User);
  const vehicleRepository = AppDataSource.getRepository(Announcement);

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) throw new AppError('User not found');

  const vehicle = await vehicleRepository.findOne({
    where: { id },
    relations: ['user'],
  });

  if (!vehicle) throw new AppError('Vehicle not found', 404);

  if (vehicle.user.id !== user.id) throw new AppError('Access denied', 401);

  return next();
};

export default IsOwner;
