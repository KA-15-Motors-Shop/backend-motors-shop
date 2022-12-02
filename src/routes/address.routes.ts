import { Router } from "express";
import AddressController from "../controllers/adresses.controller";
import CheckValidUuidAddressMiddleware from "../middlewares/checkValidUuidAddress.middleware";

const addressRouter = Router();

addressRouter.get('/', AddressController.show);
addressRouter.patch('/:id', CheckValidUuidAddressMiddleware ,AddressController.update)

export default addressRouter;