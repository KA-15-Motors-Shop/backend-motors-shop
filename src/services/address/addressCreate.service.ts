import { AppDataSource } from "../../data-source";
import Address from "../../models/Address";
import { v4 as uuidv4 } from "uuid";
import User from "../../models/User";

interface AddressDataParams {
  id: string;
  zipcode: string;
  street: string;
  detail: string;
  state: string;
  city: string;
  additional: string;
}

export default class AddressCreateService {
  async execute(data: AddressDataParams) {
    const addressRepository = AppDataSource.getRepository(Address);
    const userRepository = AppDataSource.getRepository(User)

    const date = new Date();

    const newAddress = {
      id: uuidv4(),
      zipcode: data.zipcode,
      street: data.street,
      detail: data.detail,
      state: data.state,
      city: data.city,
      additional: data.additional,
      created_at: date,
      updated_at: date,
      usersId: data.id
    };

    
    const address = await addressRepository.create(newAddress);
  
    await addressRepository.save(address);

    return address;
  }
}
