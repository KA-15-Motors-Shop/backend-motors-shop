import { Request, Response } from "express"

import { AppDataSource } from "../data-source"
import Announcement from "../models/Announcement"

import CreateAnnouncementService from "../services/announcements/announcementCreate.service"
import DeleteAnnouncementService from "../services/announcements/announcementDelete.service"

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
      is_active
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
      is_active
    })

    return response.status(201).json(announcement)
  }

  static async index(request: Request, response: Response) {
    const announcementRepository = AppDataSource.getRepository(Announcement)

    const announcements = await announcementRepository.find()

    return response.json(announcements)
  }

  static async delete(request: Request, response: Response) {
    const { id } = request.params
    const { is_active } = request.body

    const deleteService = new DeleteAnnouncementService()

    const announcement = await deleteService.execute({
      is_active,
      id: id,
    })

    return response.json(announcement)
  }
}
