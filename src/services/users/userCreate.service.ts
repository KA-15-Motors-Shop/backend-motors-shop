import { AppDataSource } from "../../data-source";
import User from "../../models/User";
import { v4 as uuidv4 } from "uuid";
import * as bcrypt from "bcrypt";
import Address from "../../models/Address";

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
}

interface Teste {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  birth_date: string;
  description: string;
  password: string;
  account_type: string;
  created_at: Date;
  updated_at: Date;
  addresses: AddressDataParams;
}

export default class CreateUserService {
  async execute(data: UserDataParams) {
    console.log("data de user:", data);
    const userRepository = AppDataSource.getRepository(User);
    const addressRepository = AppDataSource.getRepository(Address);

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const date = new Date();

    const newAddress: AddressDataParams = {
      id: uuidv4(),
      zipcode: data.zipcode,
      street: data.street,
      detail: data.detail,
      state: data.state,
      city: data.city,
      additional: data.additional,
      created_at: date,
      updated_at: date,
    };
    const adress = addressRepository.create(newAddress);

    await addressRepository.save(adress);

    const newUser = {
      id: uuidv4(),
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      birth_date: data.birth_date,
      description: data.description,
      password: hashedPassword,
      account_type:
        data.account_type === "buyer" ||
        data.account_type === "seller" ||
        data.account_type === "admim"
          ? data.account_type
          : "buyer",
      created_at: date,
      updated_at: date,
      addresses: newAddress,
    };

    const user = userRepository.create(newUser);

    await userRepository.save(user);

    return user;
  }
}
