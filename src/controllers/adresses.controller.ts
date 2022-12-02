import { Request, Response } from "express"
import { request } from "http";
import ListAddressService from "../services/address/addressList.service"
import AddressUpdateService from "../services/address/addressUpdate.service";

export default class AddressController {
    static async show (req: Request, res: Response) {
        const listAddressService = new ListAddressService()

        const addresses = await listAddressService.execute();

        return res.status(200).json(addresses)
    }

    static async update (req: Request, res: Response) {
        const { id } = req.params;
        const { zipcode, street, number, state, city, additional } = req.body;

        const addressUpdateService = new AddressUpdateService();

        const address = await addressUpdateService.execute({ id, zipcode, street, number, state, city, additional })

        return res.status(200).json(address)
    }

}