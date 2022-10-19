import { AppDataSource } from '../../data-source';
import { User } from '../../models/User';

export default class UserFilterService {
  async execute(id: string) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id });

    if (typeof user === 'undefined') {
      return 'error';
    }
    if (user === null) {
      return 'error';
    }

    return user;
  }
}
