import { AppDataSource } from "../../data-source";
import User from "../../models/User";

export default class UserDeleteService {
    async execute(id: string) {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id: id });
    
        if ( user === null ) {
          return "error"
        }
    
        const userDelete = await userRepository.delete({ id: id });
    }
}