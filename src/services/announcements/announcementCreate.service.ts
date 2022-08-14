import Announcement from "../../models/Announcement"
import { AppDataSource } from "../../data-source"

interface AnnouncementDataParams {
  announcement_type: string
  title: string
  year: string
  km: number
  price: number
  vehicle_type: string
  description: string
}

export default class CreateAnnouncementService {
  async execute(data: AnnouncementDataParams): Promise<Announcement> {
    const announcementRepository = AppDataSource.getRepository(Announcement)

    const announcement = announcementRepository.create(data)

    await announcementRepository.save(announcement)

    return announcement
  }
}
