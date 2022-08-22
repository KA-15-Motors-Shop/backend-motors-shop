import { AppDataSource } from "../../data-source";
import User from "../../models/User";

export default class UserDeleteService {
    async execute(id: string) {
        const userRepository = AppDataSource.getRepository(User);

        if ( id.length < 36 || id.length > 36 ) {
          return "invalid id"
        }

        const user = await userRepository.find({ where: { id: id } });
    
        if ( user.length < 1 ) {
          return "error"
        }
    
        const userDelete = await userRepository.delete({ id: id });
    }
}