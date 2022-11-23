import { NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';
import { validationId } from '../utils/validationId';

export const ValidationId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, user_id, announcement_id } = req.params;

  if (id && !validationId(id)) throw new AppError('This id is not valid', 422);

  if (user_id && !validationId(user_id))
    throw new AppError('This user id is not valid', 422);

  if (announcement_id && !validationId(announcement_id))
    throw new AppError('This vehicle id is not valid', 401);

  return next();
};
