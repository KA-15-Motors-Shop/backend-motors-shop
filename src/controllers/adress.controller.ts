import AddressCreateService from "../services/address/addressCreate.service";
import { Request, Response } from "express";

export default class AddressCreateController {
  static async store(req: Request, res: Response) {
    console.log(req.body)
    const { zipcode, street, detail, state, city, additional } = req.body;
    const { id } = req.params;

    const createAddressService = new AddressCreateService();

    const address = await createAddressService.execute({
        id, zipcode, street, detail, state, city, additional
    })

    return res.status(201).json(address);
  }
}
