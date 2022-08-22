import { AppDataSource } from "../../data-source";
import User from "../../models/User";

export default class UserListService {
    async execute() {
        const userRepository = AppDataSource.getRepository(User)

        const users = await userRepository.find()

        return users
    }
}