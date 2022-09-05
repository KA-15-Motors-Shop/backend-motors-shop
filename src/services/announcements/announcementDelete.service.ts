import Announcement from "../../models/Announcement"
import { AppDataSource } from "../../data-source"

interface AnnouncementDataParams {
  id: string
  is_active: boolean
}

export default class DeleteAnnouncementService {
  async execute({
    id,
    is_active,
  }: AnnouncementDataParams): Promise<Announcement> {
    const announcementRepository = AppDataSource.getRepository(Announcement)

    const announcement = await announcementRepository.findOne({ where: { id } })

    if (!announcement) {
      throw new Error("Not found any announcement with this id")
    }

    typeof is_active === "boolean"? (announcement.is_active = is_active) : announcement?.is_active

    return announcementRepository.save(announcement)
  }
}
