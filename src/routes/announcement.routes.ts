import { Router } from "express"
import AnnouncementController from "../controllers/Announcement.controller"

const announcementRouter = Router()

announcementRouter.post("/", AnnouncementController.store)
announcementRouter.get("/", AnnouncementController.index)
announcementRouter.patch("/:id", AnnouncementController.delete)

export default announcementRouter
