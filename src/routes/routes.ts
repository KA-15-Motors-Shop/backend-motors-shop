import { Router } from "express"

import userRouter from "./user.routes"
import addressRouter from "./address.routes"
import announcementRouter from "./announcement.routes"
import commentRouter from "./comment.routes"
import imageRouter from "./image.routes"

const routes = Router()

routes.use("/users", userRouter)
routes.use("/announcements", announcementRouter)
routes.use("/comments", commentRouter)
routes.use("/images", imageRouter)
routes.use("/addresses", addressRouter)

export default routes
