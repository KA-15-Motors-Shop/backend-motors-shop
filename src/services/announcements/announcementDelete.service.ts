import { AppDataSource } from '../../data-source';
import AppError from '../../errors/AppError';
import Announcement from '../../models/Announcement';

const deleteVehicleService = async (id: string) => {
  const vehicleRepository = AppDataSource.getRepository(Announcement);

  const ad = await vehicleRepository.findOne({ where: { id } });

  if (!ad) throw new AppError('Vehicle not found', 404);

  await vehicleRepository.delete(id);

  return;
};

export default deleteVehicleService;
