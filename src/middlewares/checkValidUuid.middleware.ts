import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';

const CheckValidUuidMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.params;
  console.log(req.params);

  if (user_id.length < 36 || user_id.length > 36) {
    res.statusCode = 422;
    return res.json({ error: 'invalid id' });
  }

  next();
};

export default CheckValidUuidMiddleware;
