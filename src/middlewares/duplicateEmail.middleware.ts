import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import User from "../models/User";

const DuplicateEmailMiddleware = async (req: Request, res: Response, next: NextFunction) =>  {
        const { email } = req.body;

        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ email });

        if (user) {
            res.statusCode = 422
            return res.json({ error: "Email already exists"});
        };

        next()
    
}

export default DuplicateEmailMiddleware;