import { Request, Response } from "express"
import CreateAnnouncementService from "../../services/announcements/announcementCreate.service"

export default class AnnouncementController {
  static async store(request: Request, response: Response) {
    const {
      announcement_type,
      title,
      year,
      km,
      price,
      vehicle_type,
      description,
    } = request.body

    const createAnnouncement = new CreateAnnouncementService()

    const announcement = await createAnnouncement.execute({
      announcement_type,
      title,
      year,
      km,
      price,
      vehicle_type,
      description,
    })

    return response.status(201).json(announcement)
  }
}
