import { Router } from "express"
import AddressCreateController from "../controllers/adress.controller"

const addressRouter = Router()

addressRouter.post("/:id", AddressCreateController.store)

export default addressRouter
