import { AppDataSource } from "../../data-source";
import User from "../../models/User";
import bcrypt from "bcrypt";

interface UpdateData {
  id: string;
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: string;
  birth_date: Date;
  description: string;
  account_type: string;
}

export default class UserUpdateService {
  async execute(data: UpdateData) {
    if ( data.id.length < 36 || data.id.length > 36 ) {
      return "invalid id"
    }

    const userRepository = AppDataSource.getRepository(User);

    const user = await userRepository.find({ where: { id: data.id } });

    const date = new Date();

    if (user.length < 1) {
      return "user not found";
    };

    data.name ? (user[0].name = data.name) : user[0].name;
    data.email ? (user[0].email = data.email) : user[0].email;
    data.password ? (user[0].password = await bcrypt.hash(data.password, 10)) : user[0].password;
    data.cpf ? (user[0].cpf = data.cpf) : user[0].cpf;
    data.birth_date ? (user[0].birth_date = data.birth_date) : user[0].birth_date;
    data.phone ? (user[0].phone = data.phone) : user[0].phone;
    data.description ? (user[0].description = data.description) : user[0].description;
    data.account_type ? (user[0].account_type = data.account_type) : user[0].account_type;
    user[0].updated_at = date;

    return userRepository.save(user);
  }
}