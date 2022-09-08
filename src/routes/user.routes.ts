import { Router } from "express"

import UserController from "../controllers/user.controller"
import CheckValidUuidMiddleware from "../middlewares/checkValidUuid.middleware"
import DuplicateEmailMiddleware from "../middlewares/duplicateEmail.middleware"

const userRouter = Router()

userRouter.post("/", DuplicateEmailMiddleware, UserController.store)
userRouter.post("/login", UserController.login)
userRouter.get("/", UserController.show)
userRouter.get("/:id", CheckValidUuidMiddleware ,UserController.index)
userRouter.patch("/:id", CheckValidUuidMiddleware, UserController.update)
userRouter.delete("/:id", CheckValidUuidMiddleware, UserController.delete)

export default userRouter