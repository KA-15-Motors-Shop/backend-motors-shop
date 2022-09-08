import { Request, Response, NextFunction } from "express";
import { nextTick } from "process";

const CheckValidUuidMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

   if ( id.length < 36 || id.length > 36 ) {
        res.statusCode = 422
        return res.json({ error: "invalid id" });
    };

    next();
};

export default CheckValidUuidMiddleware