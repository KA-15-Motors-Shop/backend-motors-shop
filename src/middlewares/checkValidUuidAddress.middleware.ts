import { Request, Response, NextFunction } from "express";
import AppError from "../errors/AppError";

const CheckValidUuidAddressMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if ( typeof id == 'undefined') {
        throw new AppError("invalid id", 422)
    }

   if ( id.length < 36 || id.length > 36 ) {
    throw new AppError("invalid id", 422)
    };

    next();
};

export default CheckValidUuidAddressMiddleware