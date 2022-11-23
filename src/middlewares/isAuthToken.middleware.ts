import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError, { handleError } from '../errors/AppError';

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);

  if (!authHeader) {
    const errorCatched = new AppError('Token is missing', 401);
    return handleError(errorCatched, res);
  }

  try {
    const [, token] = authHeader.split(' ');
    // console.log(token);

    const secret = 'SECRET_KEY' as string;
    const decoded = verify(token, secret) as any;

    const { userId } = decoded;

    req.user = {
      userId,
    };

    return next();
  } catch (error) {
    console.log(error);
    const errorCatched = new AppError('Invalid token', 400);
    return handleError(errorCatched, res);
  }
};

export default AuthToken;
