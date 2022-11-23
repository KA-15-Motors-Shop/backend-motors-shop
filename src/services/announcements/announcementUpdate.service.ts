import { AppDataSource } from '../../data-source';
import AppError from '../../errors/AppError';
import { VehicleUpdateProps } from '../../interfaces/announcements/index';
import Announcement from '../../models/Announcement';

const announcementUpdateService = async (
  id: string,
  data: VehicleUpdateProps
) => {
  const vehicleRepository = AppDataSource.getRepository(Announcement);

  const ad = await vehicleRepository.findOne({ where: { id } });

  if (!ad) throw new AppError('Vehicle not found', 404);

  await vehicleRepository.save({
    ...data,
    id,
  });

  return { message: 'Updated ad' };
};

export default announcementUpdateService;
