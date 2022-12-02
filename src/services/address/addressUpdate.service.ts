import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import AppError from "../../errors/AppError";
import Address from "../../models/Address";

interface IAddressData {
    id: string;
    zipcode: string;
    street: string;
    state: string;
    number: string;
    city: string;
    additional: string;
}

export default class AddressUpdateService {
    async execute (data: IAddressData) {
        const addressRepository = AppDataSource.getRepository(Address);

        const address = await addressRepository.findOneBy({ id: data.id });
        console.log(address)
        if (address == null) {
            throw new AppError("Address not found.", 404);
        };

        const date = new Date();

        data.zipcode? (address.zipcode = data.zipcode) : address.zipcode;
        data.state? (address.state = data.state) : address.state;
        data.city? (address.city = data.city) : address.city;
        data.street? (address.street = data.street) : address.street;
        data.number? (address.number = data.number) : address.number;
        data.additional? (address.additional = data.additional) : address.additional;
        address.updated_at = date

        console.log("update:", address)
        return addressRepository.save(address)
    }
}