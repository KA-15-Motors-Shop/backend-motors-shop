import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const CheckValidUuidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.params;

    if ( typeof user_id == 'undefined') {
        throw new AppError("invalid id", 422)
    }

   if ( user_id.length < 36 || user_id.length > 36 ) {
    throw new AppError("invalid id", 422)
    };

    next();
};

export default CheckValidUuidMiddleware