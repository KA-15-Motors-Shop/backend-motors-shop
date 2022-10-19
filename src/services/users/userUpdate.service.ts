import { AppDataSource } from '../../data-source';
import { User } from '../../models/User';
import bcrypt from 'bcrypt';

interface UpdateData {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birth_date: string;
  description: string;
  account_type: string;
}

export default class UserUpdateService {
  async execute(data: UpdateData) {
    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.findOneBy({ id: data.id });

    const date = new Date();

    if (user === null) {
      return 'user not found';
    }

    data.name ? (user.name = data.name) : user?.name;
    data.email ? (user.email = data.email) : user?.email;
    data.password
      ? (user.password = await bcrypt.hash(data.password, 10))
      : user?.password;
    data.cpf ? (user.cpf = data.cpf) : user?.cpf;
    data.birth_date ? (user.birth_date = data.birth_date) : user?.birth_date;
    data.phone ? (user.phone = data.phone) : user?.phone;
    data.description
      ? (user.description = data.description)
      : user?.description;
    data.account_type
      ? (user.account_type = data.account_type)
      : user?.account_type;
    user.updated_at = date;

    return userRepository.save(user);
  }
}
