import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

const AuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)

  if (!authHeader) throw new AppError('ivalid token', 401);
  
  if (!authHeader.includes('Token')) {
    throw new AppError('there is error in token', 401)
  }
  try {
    const [, token] = authHeader.split(' ');
 
    if (token == 'undefined') {
      throw new AppError('Token is missing', 401);
    };
    
    const secret = 'SECRET_KEY' as string;
    const decoded = verify(token, secret) as any;
    console.log('decoded', decoded)

    const { userId } = decoded;

    req.user = {
      userId,
    };

    return next();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message
      });
    }
    else {
      return res.status(403).json({
        status: "error",
        message: 'there is error in token'
      });
    };
  };
};

export default AuthToken;
