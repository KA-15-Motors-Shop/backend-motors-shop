import { AppDataSource } from "../../data-source";
import { User } from "../../models/User";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import Address from "../../models/Address";
import AppError from "../../errors/AppError";

interface UserDataParams {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth_date: string;
  description: string;
  password: string;
  account_type: string;
  zipcode: string;
  street: string;
  detail: string;
  state: string;
  city: string;
  additional: string;
  number: string;
}

interface AddressDataParams {
  id: string;
  zipcode: string;
  street: string;
  detail: string;
  state: string;
  city: string;
  additional: string;
  created_at: Date;
  updated_at: Date;
  number: string;
}

export default class CreateUserService {
  async execute(data: UserDataParams) {
    console.log("data de user:", data);
    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);
    
    const emailAlreadyExists = await userRepository.findOneBy({ email: data.email });
    
    if (emailAlreadyExists) {
      throw new AppError("Email already exists", 422);
    }

    const phoneAlreadyExists = await userRepository.findOneBy({
      phone: data.phone,
    });

    if (phoneAlreadyExists) {
      throw new AppError("This phone has already been registered", 422);
    }

    const cpfAlreadyExists = await userRepository.findOneBy({ cpf: data.cpf });

    if (cpfAlreadyExists) {
      throw new AppError("This cpf has already been registered", 422);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const date = new Date();

    const newAddress: AddressDataParams = {
      id: uuidv4(),
      zipcode: data.zipcode,
      street: data.street,
      detail: data.detail,
      state: data.state,
      city: data.city,
      number: data.number,
      additional: data.additional,
      created_at: date,
      updated_at: date,
    };
    const adress = addressRepository.create(newAddress);

    await addressRepository.save(adress);

    const newUser = new User();
    id: uuidv4(), (newUser.name = data.name);
    (newUser.email = data.email),
      (newUser.cpf = data.cpf),
      (newUser.phone = data.phone),
      (newUser.birth_date = data.birth_date),
      (newUser.description = data.description),
      (newUser.password = hashedPassword),
      (newUser.account_type = data.account_type),
      (newUser.address = adress),
      userRepository.create(newUser);

    await userRepository.save(newUser);

    return newUser;
  }
}
