import { AppDataSource } from '../../data-source';
import { User } from '../../models/User';
import { formatedUserResponse } from '../../utils/formatedUserResponse';

export default class UserFilterService {
  async execute(user_id: string) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id } });

    if (typeof user === 'undefined') {
      return 'error';
    }
    if (user === null) {
      return 'error';
    }

    return formatedUserResponse({ user });
  }
}
