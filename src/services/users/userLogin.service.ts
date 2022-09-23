import { AppDataSource } from "../../data-source";
import User from "../../models/User";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

interface EmailAndPassword {
    email: string;
    password: string;
}

export default class UserLoginService {
    async execute(data: EmailAndPassword) {

    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    if (data.email == undefined) {
      return "email is missing"
    }

    const account = users.find((user) => user.email === data.email);

    if (data.password == undefined) {
      return "password"
    }
    if (!account || !bcrypt.compareSync(data.password, account.password)) {
      return "email or password"
    }

    const token = jwt.sign({ email: data.email, id: account?.id }, "SECRET_KEY", {
      expiresIn: "24h",
    });

    return { id: account?.id, token: token }
    }
}