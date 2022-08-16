import { AppDataSource } from "../../data-source";
import User from "../../models/User";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";

interface UserDataParams {
  name: string
  email: string
  cpf: string
  phone: string
  birth_date: string
  description: string
  password: string,
  account_type: string
}

export default class CreateUserService {
  async execute(data: UserDataParams) {
    const userRepository = AppDataSource.getRepository(User)
    console.log("password:", data.password)

    //const { password } = data
    console.log(data.password)

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const date = "2022-05-01 15:30:01"//String(new Date);
    const teste = String(new Date)
    console.log("teste:", teste)
    console.log("date:", date)

    const newUser = {
        id: uuidv4(),
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phone: data.phone,
        birth_date: data.birth_date,
        description: data.description,
        password: hashedPassword,
        account_type: data.account_type,
        created_at: date,
        updated_at: date
    }
    console.log(newUser)

    const user = userRepository.create(newUser)

    await userRepository.save(user)

    return user
  }
}
