import { AppDataSource } from "../../data-source";
import Address  from "../../models/Address";

export default class ListAddressService {
    async execute () {
        const addressRepository = AppDataSource.getRepository(Address);

        const listAddress = await addressRepository.find();

        return listAddress
    }
};