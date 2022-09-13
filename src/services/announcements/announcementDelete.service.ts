import Announcement from "../../models/Announcement";
import { AppDataSource } from "../../data-source";

interface AnnouncementDataParams {
  id: string;
  announcement_type: string;
  title: string;
  year: string;
  km: number;
  price: number;
  vehicle_type: string;
  description: string;
  is_active: boolean;
}

export default class DeleteAnnouncementService {
  async execute({
    id,
    announcement_type,
    title,
    year,
    km,
    price,
    vehicle_type,
    description,
    is_active,
  }: AnnouncementDataParams): Promise<Announcement> {
    const announcementRepository = AppDataSource.getRepository(Announcement);

    const announcement = await announcementRepository.findOne({
      where: { id },
    });

    if (!announcement) {
      throw new Error("Not found any announcement with this id");
    }

    typeof is_active === "boolean"
      ? (announcement.is_active = is_active)
      : announcement?.is_active;
    announcement_type? (announcement.announcement_type = announcement_type) : (announcement.announcement_type);
    title? (announcement.title = title) : (announcement?.title);
    year? (announcement.year = year) : (announcement?.year);
    km? (announcement.km = km) : (announcement?.km);
    price? (announcement.price = price) : (announcement?.price);
    vehicle_type? (announcement.vehicle_type = vehicle_type) : (announcement?.vehicle_type);
    description? (announcement.description = description) : (announcement?.description);

    return announcementRepository.save(announcement);
  }
}
