import { Router } from "express"
import AnnouncementController from "../controllers/Announcement.controller"

const announcementRouter = Router()

announcementRouter.post("/", AnnouncementController.store)
announcementRouter.get("/", AnnouncementController.index)

export default announcementRouter
