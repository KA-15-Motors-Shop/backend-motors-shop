import { AppDataSource } from '../../data-source';
import { User } from '../../models/User';
import { formatedUserResponse } from '../../utils/formatedUserResponse';

export default class UserListService {
  async execute() {
    const userRepository = AppDataSource.getRepository(User);

    const listUsers = await userRepository.find();

    return listUsers.map((user) => formatedUserResponse({ user }));
  }
}
