import { Router } from "express"

import UserController from "../controllers/user.controller"

const userRouter = Router()

userRouter.post("/", UserController.store)
userRouter.post("/login", UserController.login)
userRouter.get("/", UserController.show)
userRouter.get("/:id", UserController.index)
userRouter.patch("/:id", UserController.update)
userRouter.delete("/:id", UserController.delete)

export default userRouter