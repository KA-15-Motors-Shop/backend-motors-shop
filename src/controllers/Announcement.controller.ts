import { Request, Response } from 'express';

import { AppDataSource } from '../data-source';
import Announcement from '../models/Announcement';
import AppError from '../errors/AppError';
import { CreateAnnouncementService } from '../services/announcements/announcementCreate.service';
import DeleteAnnouncementService from '../services/announcements/announcementDelete.service';
import { listAnnouncementService } from '../services/announcements/announcementList.service';
import announcementListOneService from '../services/announcements/announcementListOne.service';
import deleteVehicleService from '../services/announcements/announcementDelete.service';
import announcementUpdateService from '../services/announcements/announcementUpdate.service';

export default class AnnouncementController {
  static async store(req: Request, res: Response) {
    const { userId } = req.user;
    const {
      type_of_ad,
      title,
      year,
      km,
      price,
      type_of_vehicle,
      description,
      is_published,
    } = req.body;

    // console.log(req.params);
    const newAnnouncement = await CreateAnnouncementService(
      {
        type_of_ad,
        title,
        year,
        km,
        price,
        type_of_vehicle,
        description,
        is_published,
      },
      userId
    );

    return res.status(201).json(newAnnouncement);
    // return res.status(201).json({ message: 'Anúncio criado', newAnnouncement });
  }

  static async index(req: Request, res: Response) {
    const vehicles = await listAnnouncementService();

    return res.json(vehicles);
  }

  // static async listByUser(req: Request, res: Response) {
  //   try {
  //     const { id } = req.params;

  //     const announcement = await announcementListOneService(id);

  //     return res.status(200).json({ announcement });
  //   } catch (err) {
  //     if (err instanceof AppError) {
  //       handleError(err, res);
  //     }
  //   }
  // }

  static async listByUser(req: Request, res: Response) {
    const { id } = req.params;

    const announcement = await announcementListOneService(id);

    return res.json(announcement);
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    await deleteVehicleService(id);

    return res.status(204).json();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      title,
      type_of_ad,
      year,
      km,
      price,
      description,
      type_of_vehicle,
      is_published,
    } = req.body;

    const vehicleUpdate = await announcementUpdateService(id, {
      title,
      type_of_ad,
      description,
      km,
      price,
      type_of_vehicle,
      year,
      is_published,
    });

    return res.json(vehicleUpdate);
  }
}
