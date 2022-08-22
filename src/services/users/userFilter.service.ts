import { AppDataSource } from "../../data-source";
import User from "../../models/User";

export default class UserFilterService {
    async execute(id: string) {
        if ( id.length < 36 || id.length > 36 ) {
            return "invalid id"
        }

        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.find({ where: { id: id }})

        if (user.length < 1) {
            return "error"
        }

        return user
    }
}