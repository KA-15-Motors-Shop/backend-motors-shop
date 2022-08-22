import { NextFunction, Request, Response } from 'express';
import { AppError, handleError } from '../errors/AppError';
import jwt from 'jsonwebtoken';
import { IToken } from '../interfaces';

interface TokenPayload {
  id: number;
  name: string;
  email: string;
  type: string;
  iat: number;
  exp: number;
}

const authTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;
  if (!token) {
    const errorCatched = new AppError(401, 'Missing authorization token');
    return handleError(errorCatched, res);
  }

  token = token.replace('Bearer ', '');

  try {
    const data = jwt.verify(token, process.env.SECRET_KEY as string);
    const { id, name, email, type } = data as TokenPayload;

    req.userToken = email;

    next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
export default authTokenMiddleware;
