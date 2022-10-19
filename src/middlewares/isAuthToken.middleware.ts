import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError('Token is missing', 401);

  try {
    const [, token] = authHeader.split(' ');
    const secret = 'SECRET_KEY' as string;
    const decoded = verify(token, secret) as any;

    const { userId } = decoded;

    req.user = {
      userId,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid token', 400);
  }
};

export default AuthToken;
